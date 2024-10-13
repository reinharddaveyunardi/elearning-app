import {signInWithEmailAndPassword, User} from "@firebase/auth";
import {auth} from "@/service/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

export const storeKeepLoggedIn = async ({
    email,
    password,
}: {
    email: string;
    password: any;
}) => {
    AsyncStorage.setItem("keepLoggedIn", JSON.stringify(email, password));
    console.log(email, password);
};

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
                    const response = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                } catch (error) {
                    console.log("Auto-login failed:", error);
                }
            }
        };
        loginSession();
    }, []);
};
