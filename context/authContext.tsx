import {auth} from "@/service/Firebase";
import {signInWithEmailAndPassword, User} from "@firebase/auth";
import {NavigationContainer} from "@react-navigation/native";
import React, {createContext, useState, useContext} from "react";
interface AuthContextValue {
    initialRoute: string;
    setInitialRoute: (route: string) => void;
    user: any;
    setUser: any;
}
const AuthContext = createContext<AuthContextValue>({
    initialRoute: "SignIn",
    setInitialRoute: () => {},
    user: null,
    setUser: () => {},
});

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [initialRoute, setInitialRoute] = useState("SignIn");

    const contextValue = {
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
    return (
        <AuthContext.Provider value={contextValue}>
            <NavigationContainer independent={true}>{children}</NavigationContainer>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext<AuthContextValue>(AuthContext);
