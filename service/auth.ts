import SecureStore from "expo-secure-store";
import {auth} from "@/service/Firebase";
import {onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import {useAuth} from "@/context/authContext";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/interface";
export const loginSession = async () => {
    const {setUser, setInitialRoute} = useAuth();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const user = auth.currentUser;
    if (user) {
        setUser(user);
        setInitialRoute("My");
        navigation.reset({
            index: 0,
            routes: [{name: "My"}],
        });
    } else {
        const email = await SecureStore.getItem("email");
        const password = await SecureStore.getItem("password");
        if (email && password) {
            try {
                const response = await signInWithEmailAndPassword(auth, email, password);
                setUser(response.user);
                setInitialRoute("My");
                navigation.reset({
                    index: 0,
                    routes: [{name: "My"}],
                });
            } catch (error) {
                console.log("Auto login failed:", error);
            }
        }
    }

    // Set up the onAuthStateChanged callback
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUser(user);
            setInitialRoute("My");
            navigation.reset({
                index: 0,
                routes: [{name: "My"}],
            });
        } else {
            setUser(null);
            setInitialRoute("SignIn");
        }
    });

    return unsubscribe;
};
