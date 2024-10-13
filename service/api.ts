import {auth, fs, storage} from "@/service/Firebase";
import {collection, doc, onSnapshot, setDoc} from "@firebase/firestore";
import {UserCredentials} from "@/interface";
import {getDownloadURL, ref} from "@firebase/storage";
import {onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import {validationMessages} from "@/constants/messages";
import {useCallback, useEffect, useState} from "react";
import {calculateDaysLeft} from "@/utils/getDaysLeft";
import {storeKeepLoggedIn} from "@/storage/asyncStorage";

export const SignIn = async ({email, password}: UserCredentials) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        storeKeepLoggedIn({email, password});
        return {user: response.user};
    } catch (error: any) {
        let errorMessage = validationMessages.stillFailed;
        switch (error.code) {
            case "auth/invalid-email":
                errorMessage = validationMessages.invalidEmail;
                break;
            case "auth/invalid-credential":
                errorMessage = validationMessages.invalidCredentials;
                break;
            case "auth/missing-password":
                errorMessage = validationMessages.passwordRequired;
                break;
            case "auth/wrong-password":
                errorMessage = validationMessages.invalidPassword;
                break;
        }
        throw new Error(errorMessage);
    }
};

export const useFetchCourse = () => {
    const [course, setCourse] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const user = auth.currentUser;
    let unsubscribe: any;

    if (user) {
        const courseRef = collection(fs, `course/`);
        unsubscribe = onSnapshot(courseRef, async (snapshot) => {
            const fetchedCourses = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const title = data.title;
                    const imageId = data.banner;
                    const tagCourse = data.tag;
                    let imageUrl = null;
                    if (imageId) {
                        try {
                            const imageRef = ref(storage, `course-banner/${imageId}`);
                            imageUrl = await getDownloadURL(imageRef);
                        } catch (error) {
                            console.log("Error fetching image for", imageId, ":", error);
                        }
                    }

                    return {
                        id: doc.id,
                        title,
                        ...data,
                        imageUrl,
                        tagCourse,
                    };
                })
            );
            setCourse(fetchedCourses);
            setLoading(false);
        });
    }

    return {course, loading};
    return () => {
        if (unsubscribe) unsubscribe();
    };
};

export const useFetchHomework = () => {
    const [homework, setHomework] = useState<any[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        let unsubscribe: any;

        if (user) {
            const homeworkRef = collection(fs, `users/${user.uid}/homework/`);
            unsubscribe = onSnapshot(homeworkRef, (snapshot) => {
                const fetchedHomework = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    daysLeft: calculateDaysLeft(doc.data().time.toDate()),
                }));
                setHomework(fetchedHomework);
            });
        }
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);
    return {homework};
};
export const useFetchQuiz = () => {
    const [quiz, setQuiz] = useState<any[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        let unsubscribe: any;

        if (user) {
            const quizRef = collection(fs, `users/${user.uid}/quiz/`);
            unsubscribe = onSnapshot(quizRef, (snapshot) => {
                const fetchedQuiz = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    daysLeft: calculateDaysLeft(doc.data().time.toDate()),
                }));
                setQuiz(fetchedQuiz);
            });
        }
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);
    return {quiz};
};

export const addRecentCourse = async () => {
    const [titleCourse, setCourse] = useState("");

    const handleAddRecentCourse = useCallback((index: number) => {
        console.log("Add recent course:", index);
    }, []);

    const addRecentCourseCard = async () => {
        const user = auth.currentUser;
        if (user) {
            const randomid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const recentCourseData = {
                id: randomid,
                title: titleCourse,
                time: new Date(),
            };
            try {
                await setDoc(doc(fs, `users/${user.uid}/recentCourse/${randomid}`), recentCourseData);
            } catch (error) {
                console.log("Error adding recent course:", error);
            }
        }
    };
};
