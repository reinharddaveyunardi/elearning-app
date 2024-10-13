import {auth} from "@/service/Firebase";
import {useFetchCourse} from "@/service/api";
import {signInWithEmailAndPassword, User} from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationContainer} from "@react-navigation/native";
import React, {createContext, useState, useContext, useEffect} from "react";
interface AuthContextValue {
    initialRoute: string;
    setInitialRoute: (route: string) => void;
    user: any;
    setUser: any;
    course: any[];
    setCourse: any;
}
const AuthContext = createContext<AuthContextValue>({
    initialRoute: "SignIn",
    setInitialRoute: () => {},
    user: null,
    setUser: () => {},
    course: [],
    setCourse: () => {},
});

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [initialRoute, setInitialRoute] = useState("SignIn");
    const {course} = useFetchCourse();

    const contextValue = {
        course,
        setCourse: () => {},
        initialRoute,
        setInitialRoute,
        user,
        setUser,
        loading,
        setLoading,
        errorMessage,
        setErrorMessage,
        showError,
        setShowError,
    };

    useEffect(() => {
        const autoLogin = async () => {
            const email = await AsyncStorage.getItem("email");
            const password = await AsyncStorage.getItem("password");

            if (email && password) {
                try {
                    const response = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    setUser(response.user);
                    setInitialRoute("My");
                } catch (error) {
                    console.log("Auto-login failed:", error);
                }
            } else {
                setUser(null);
                setInitialRoute("SignIn");
            }
        };

        autoLogin();
    }, []);

    return (
        <AuthContext.Provider value={contextValue}>
            <NavigationContainer independent={true}>
                {children}
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext<AuthContextValue>(AuthContext);
