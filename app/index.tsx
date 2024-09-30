import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import { Ionicons } from "@expo/vector-icons";
import { colorPalette } from "@/constants/Colors";
import CourseScreen from "./screens/course/[name]";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Temporary Data
const CourseData = [
    {
        name: "Art",
        banner: require("@/assets/images/course-art-banner.png"),
    },
    {
        name: "Biology",
        banner: require("@/assets/images/course-biology-banner.png"),
    },
];

// Screen Stack
function MenuDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: { backgroundColor: colorPalette.primary },
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
            <Drawer.Group>
                {CourseData.map((course) => (
                    <Drawer.Screen
                        key={course.name}
                        name={course.name}
                        initialParams={{ name: course.name, banner: course.banner }}
                        component={CourseScreen}
                        options={{
                            headerTitle: course.name,
                            drawerIcon: () => <Ionicons name="book" color={"#ffff"} />,
                        }}
                    />
                ))}
            </Drawer.Group>
        </Drawer.Navigator>
    );
}

function StartStackScreen() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Reset" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function Index() {
    return (
        <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="My" component={MenuDrawer} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
