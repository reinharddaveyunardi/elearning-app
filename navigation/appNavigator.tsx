import DashboardScreen from "@/app/screens/dashboard/DashboardScreen";
import {colorPalette} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CourseMenuScreen from "@/app/screens/course/CourseMenuScreen";
import {useTranslation} from "react-i18next";

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    const {t} = useTranslation();
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
                name={t("sideBar.dashboard")}
                component={DashboardScreen}
                options={{
                    headerTitle: "Dashboard",
                    drawerIcon: () => <Ionicons name="home" color={"#ffff"} />,
                }}
            />
            <Drawer.Screen
                name={t("sideBar.myCourse")}
                component={CourseMenuScreen}
                options={{
                    headerShown: false,
                    drawerIcon: () => <Ionicons name="book" color={"#ffff"} />,
                }}
            />
        </Drawer.Navigator>
    );
}
