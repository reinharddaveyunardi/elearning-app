import Activity from "@/components/Activity";
import RecentlyAccessedCourse from "@/components/RecentlyAccessedCourse";
import {usePushNotification} from "@/hooks/usePushNotification";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, StatusBar} from "react-native";
import {retrieveKeepLoggedIn} from "@/storage/asyncStorage";
import {signInWithEmailAndPassword, signOut, User} from "firebase/auth";
import {auth} from "@/service/Firebase";
import {colorPalette} from "@/constants/Colors";

function DashboardScreen({navigation}: any) {
    const user = auth.currentUser;
    // useEffect(() => {
    //     const loadUserData = async () => {
    //         const {email, password} = await retrieveKeepLoggedIn();
    //         if (email && password) {
    //             try {
    //                 const response = await signInWithEmailAndPassword(
    //                     auth,
    //                     email,
    //                     password
    //                 );
    //                 setUser(response.user);
    //             } catch (error) {
    //                 console.log("Auto-login failed:", error);
    //             }
    //         }
    //     };
    //     loadUserData();
    // }, []);
    const {expoPushToken} = usePushNotification();

    console.log(expoPushToken);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem("user");
            navigation.navigate("SignIn");
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor={colorPalette.primary} />
            <View style={Style.TopBar}>
                <View style={Style.Header}>
                    <View>
                        <Image source={require("@/assets/images/adaptive-icon.png")} style={Style.logo} />
                    </View>
                    <View style={Style.headerRight}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Ionicons name="person" size={24} left={20} />
                        </TouchableOpacity>
                        <Ionicons name="menu" size={24} left={20} onPress={() => navigation.openDrawer()} />
                    </View>
                </View>
            </View>
            <ScrollView
                style={{
                    padding: 10,
                    height: "100%",
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={Style.gap}>
                    <Image style={{width: "100%", height: 200, borderRadius: 10}} resizeMode="cover" source={require("@/assets/images/library-banner.png")} />
                </View>
                {user && <Activity />}
                <RecentlyAccessedCourse />
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
const Style = StyleSheet.create({
    TopBar: {
        backgroundColor: colorPalette.white,
        shadowColor: "#171717",
        shadowOffset: {width: -2, height: 7},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        zIndex: 2,
    },
    Header: {
        top: 20,
        padding: 32,
        position: "static",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerRight: {
        display: "flex",
        gap: 20,
        flexDirection: "row",
    },
    logoContainer: {
        backgroundColor: "white",
        height: 110,
    },
    logo: {
        height: 39.7,
        width: 92,
    },
    gap: {
        marginVertical: 10,
    },
});
export default DashboardScreen;
