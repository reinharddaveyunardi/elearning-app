import {createStackNavigator} from "@react-navigation/stack";
import {AuthProvider, useAuth} from "@/context/authContext";
import AuthNavigator from "@/navigation/authNavigator";
import MenuDrawer from "@/navigation/appNavigator";
import {RootStackParamList} from "@/interface";
import {NavigationContainer} from "@react-navigation/native";
import ProfileScreen from "./screens/my/ProfileScreen";
import CourseMenuScreen from "./screens/course/CourseMenuScreen";
import CourseScreen from "./screens/course/[name]/CourseScreen";
import EditProfileBottomSheet from "./screens/my/EditProfileBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

const Stack = createStackNavigator<RootStackParamList>();
const loggedStack = createStackNavigator<RootStackParamList>();

function Inside() {
    return (
        <loggedStack.Navigator>
            <loggedStack.Screen name="My" component={MenuDrawer} options={{headerShown: false}} />
            <loggedStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="CourseMenu" component={CourseMenuScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="Course" component={CourseScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="EditProfile" component={EditProfileBottomSheet} options={{headerShown: false}} />
        </loggedStack.Navigator>
    );
}

export default function Index() {
    const [keepLoggedInValue, setKeepLoggedInValue] = useState<String | null>(null);
    useEffect(() => {
        const retrieveKeepLoggedIn = async () => {
            const isRemember = await AsyncStorage.getItem("keepLoggedIn");
            setKeepLoggedInValue(isRemember);
        };

        retrieveKeepLoggedIn();
    }, []);
    return (
        <AuthProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName={"AutoLogin"}>
                    {keepLoggedInValue === "true" ? (
                        <>
                            <Stack.Screen name="AutoLogin" component={Inside} options={{headerShown: false}} key="Drawer" />
                            <Stack.Screen name="SignIn" component={AuthNavigator} options={{headerShown: false}} />
                            <Stack.Screen name="Logged" component={Inside} options={{headerShown: false}} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="LoginScreen" component={AuthNavigator} options={{headerShown: false}} />
                            <Stack.Screen name="Logged" component={Inside} options={{headerShown: false}} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
