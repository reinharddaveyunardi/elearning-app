import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ headerTitle: "Dashboard", drawerIcon: () => <Ionicons name="home" color={"#ffff"} /> }} />
        </Drawer.Navigator>
    );
}

export default function Index() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="My" component={MenuDrawer} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
