import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Home from "./screens/Home";
import NavTop from "@/components/NavTop";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import Profile from "./screens/profile/[id]";
import Course from "./screens/[course]";
import { onAuthStateChanged, User } from "@firebase/auth";
import { FB_AUTH } from "@/FirebaseConfig";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const InsideStack = createStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="Menu" component={MenuDrawer} options={{ headerShown: false }} />
            <InsideStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <InsideStack.Screen name="Course" component={Course} options={{ headerShown: false }} />
        </InsideStack.Navigator>
    );
}

function MenuDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                header: ({ navigation }) => <NavTop navigation={navigation} />,
                drawerActiveTintColor: "#56876D",
                gestureHandlerProps: {
                    enabled: false,
                },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: () => <Ionicons name="home" color={"#ffff"} />,
                    drawerStyle: {
                        backgroundColor: "#0D7C5D",
                    },
                    drawerActiveBackgroundColor: "#1A3A6B",
                    drawerActiveTintColor: "#fff",
                }}
            />
        </Drawer.Navigator>
    );
}

export default function Index() {
    const [user, setUser] = useState<User | null>(null);
    const [initialRoute, setInitialRoute] = useState("LoginScreen");

    useEffect(() => {
        const userSession = onAuthStateChanged(FB_AUTH, (user) => {
            if (user) {
                setUser(user);
                setInitialRoute("Inside");
            } else {
                setUser(null);
                setInitialRoute("LoginScreen");
            }
        });
        return () => userSession();
    }, []);
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={initialRoute}>
                {user ? (
                    <Stack.Screen name="Inside" options={{ headerShown: false }} component={InsideLayout} />
                ) : (
                    // <>
                    //     <Stack.Screen name="GetStarted" options={{ headerShown: false }} component={GetStartedScreen} />
                    //     <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    //     <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
                    // </>
                    <View>
                        <Text>User Not True</Text>
                    </View>
                )}

                <Stack.Screen name="Menu" component={MenuDrawer} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
