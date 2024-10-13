import DashboardScreen from "@/app/screens/dashboard/DashboardScreen";
import ProfileScreen from "@/app/screens/my/ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();
const dashboardNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={DashboardScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default dashboardNavigator;
