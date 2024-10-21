import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/service/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";

export const retrieveKeepLoggedIn = async () => {
    const keepLoggedIn = await AsyncStorage.getItem("keepLoggedIn");
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");
    return {
        keepLoggedIn,
        email,
        password,
    };
};

export const loadUserData = () => {
    useEffect(() => {
        const loginSession = async () => {
            const {email, password} = await retrieveKeepLoggedIn();
            if (email && password) {
                try {
                    const response = await signInWithEmailAndPassword(auth, email, password);
                } catch (error) {
                    console.log("Auto-login failed:", error);
                }
            }
        };
        loginSession();
    }, []);
};
