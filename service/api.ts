import {auth, fs} from "@/service/Firebase";
import {collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc} from "@firebase/firestore";
import {UserCredentials} from "@/interface";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {validationMessages} from "@/constants/messages";
import {useCallback, useEffect, useState} from "react";
import {calculateDaysLeft} from "@/utils/getDaysLeft";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {t} from "i18next";
import {useTranslation} from "react-i18next";

export const SignIn = async ({email, password, isRemembered}: UserCredentials) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        AsyncStorage.setItem("keepLoggedIn", String(isRemembered));
        AsyncStorage.setItem("userData", JSON.stringify({email, password}));
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

export const useFetchHomework = () => {
    const {t} = useTranslation();
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
                    daysLeft: calculateDaysLeft(doc.data().time.toDate(), t),
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
    const {t} = useTranslation();
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
                    daysLeft: calculateDaysLeft(doc.data().time.toDate(), t),
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

export const useFetchCourseContent = (id: number) => {
    const [courseContent, setCourseContent] = useState<any>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [announcement, setAnnouncement] = useState<any[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        const fetchCourseContent = async () => {
            const contentRef = doc(fs, `course/${id}`);
            const contentDoc = await getDoc(contentRef);
            if (contentDoc.exists()) {
                setCourseContent(contentDoc.data());
                const assignmentsRef = collection(fs, `course/${id}/assign`);
                const assignQuery = query(assignmentsRef, orderBy("dueDate"));
                const assignSnapshot = await getDocs(assignQuery);
                const assignData = assignSnapshot.docs.map((doc) => doc.data());
                setAssignments(assignData);
                const announcementRef = collection(fs, `course/${id}/announ`);
                const announcementSnapshot = await getDocs(announcementRef);
                const announcementData = announcementSnapshot.docs.map((doc) => doc.data());
                setAnnouncement(announcementData);
            } else {
                console.log("There's no content for this course");
            }
        };
        fetchCourseContent();
    }, []);
};

export const useRecentCourse = async () => {
    const fetchRecentCourses = async () => {
        const user = auth.currentUser;
        let unsubscribe = null;
        if (user) {
            const courseRef = collection(fs, `users/${user.uid}/recent-course/`);
            const queryall = query(courseRef, limit(5));
            const data = await new Promise((resolve) => {
                unsubscribe = onSnapshot(queryall, async (snapshot) => {
                    const fetchedCourses = await Promise.all(
                        snapshot.docs.map(async (doc) => {
                            const data = doc.data();
                            const title = data.title;
                            const imageUrl = data.imageUrl;
                            const time = data.time;
                            const tagCourse = data.tag;
                            return {
                                id: doc.id,
                                title,
                                time,
                                ...data,
                                imageUrl,
                                tagCourse,
                            };
                        })
                    );
                    const uniqueCourses = [...new Map(fetchedCourses.map((course) => [course.id, course])).values()];
                    const sortedCourses = uniqueCourses.sort((a, b) => b.time - a.time);
                    resolve(sortedCourses);
                });
            });
            return data;
        }
    };

    return await fetchRecentCourses();
};
