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
import i18n from "@/localization/i18n";
import {I18nextProvider} from "react-i18next";
import PreferenceScreen from "./screens/my/setting/PreferenceScreen";
import ChangeLanguageScreen from "./screens/my/setting/ChangeLanguageScreen";

const Stack = createStackNavigator();
const loggedStack = createStackNavigator();

function Inside() {
    return (
        <loggedStack.Navigator>
            <loggedStack.Screen name="My" component={MenuDrawer} options={{headerShown: false}} />
            <loggedStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="CourseMenu" component={CourseMenuScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="Course" component={CourseScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="EditProfile" component={EditProfileBottomSheet} options={{headerShown: false}} />
            <loggedStack.Screen name="Preferences" component={PreferenceScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} options={{headerShown: false}} />
        </loggedStack.Navigator>
    );
}

export default function Index() {
    const [keepLoggedInValue, setKeepLoggedInValue] = useState<String | null>(null);
    useEffect(() => {
        const retrieveKeepLoggedIn = async () => {
            const isRemember = await AsyncStorage.getItem("keepLoggedIn");
            console.log(isRemember);
            setKeepLoggedInValue(isRemember);
        };

        retrieveKeepLoggedIn();
    }, []);
    return (
        <AuthProvider>
            <I18nextProvider i18n={i18n}>
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        {keepLoggedInValue === "true" ? (
                            <>
                                <Stack.Screen name="Logged" component={Inside} options={{headerShown: false}} key="Drawer" />
                                <Stack.Screen name="SignIn" component={AuthNavigator} options={{headerShown: false}} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="SignIn" component={AuthNavigator} options={{headerShown: false}} />
                                <Stack.Screen name="Logged" component={Inside} options={{headerShown: false}} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </I18nextProvider>
        </AuthProvider>
    );
}
