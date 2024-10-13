import DashboardScreen from "@/app/screens/dashboard/DashboardScreen";
import {colorPalette} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CourseMenuScreen from "@/app/screens/course/CourseMenuScreen";

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {backgroundColor: colorPalette.primary},
                drawerActiveBackgroundColor: colorPalette.secondary,
                drawerActiveTintColor: colorPalette.white,
                drawerInactiveTintColor: colorPalette.white,
            }}
            initialRouteName="Dashboard"
        >
            <Drawer.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    headerTitle: "Dashboard",
                    drawerIcon: () => <Ionicons name="home" color={"#ffff"} />,
                }}
            />
            <Drawer.Screen
                name="My Course"
                component={CourseMenuScreen}
                options={{
                    headerShown: false,
                    drawerIcon: () => <Ionicons name="book" color={"#ffff"} />,
                }}
            />
            {/* <Drawer.Screen
                name="Notification"
                component={CourseMenuScreen}
                options={{
                    headerShown: false,
                    drawerIcon: () => <Ionicons name="notifications" color={"#ffff"} />,
                }}
            /> */}
        </Drawer.Navigator>
    );
}
