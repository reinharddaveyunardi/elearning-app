import LoginScreen from "@/app/screens/auth/LoginScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();
const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
