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

const Stack = createStackNavigator<RootStackParamList>();
const loggedStack = createStackNavigator<RootStackParamList>();
function Inside() {
    return (
        <loggedStack.Navigator>
            <loggedStack.Screen name="My" component={MenuDrawer} options={{headerShown: false}} />
            <loggedStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="CourseMenu" component={CourseMenuScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="Course" component={CourseScreen} options={{headerShown: false}} />
            <loggedStack.Screen name="Drawer" component={MenuDrawer} options={{headerShown: false}} key="Drawer" />
            <loggedStack.Screen name="EditProfile" component={EditProfileBottomSheet} options={{headerShown: false}} />
        </loggedStack.Navigator>
    );
}

export default function Index() {
    return (
        <AuthProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName={"SignIn"}>
                    <Stack.Screen name="SignIn" component={AuthNavigator} options={{headerShown: false}} />
                    <Stack.Screen name="Logged" component={Inside} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
