import {auth, fs} from "@/service/Firebase";
import {collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc} from "@firebase/firestore";
import {UserCredentials} from "@/interface";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {validationMessages} from "@/constants/messages";
import {useCallback, useEffect, useState} from "react";
import {calculateDaysLeft} from "@/utils/getDaysLeft";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
