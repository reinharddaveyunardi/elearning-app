import Activity from "@/components/Activity";
import RecentlyAccessedCourse from "@/components/RecentlyAccessedCourse";
import {usePushNotification} from "@/hooks/usePushNotification";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, StatusBar, Alert, BackHandler, Dimensions} from "react-native";
import {auth} from "@/service/Firebase";
import {colorPalette} from "@/constants/Colors";
import {SignIn} from "@/service/api";
import Carousel from "react-native-reanimated-carousel";
import {thisDeviceWidth} from "@/utils/Utils";
import {useTranslation} from "react-i18next";
import CustomAlert from "@/components/Alert";

const libraryBanner = require("@/assets/images/library-banner.png");
const scienceBanner = require("@/assets/images/science-banner.png");
const labScbBanner = require("@/assets/images/lab-scb-banner.jpg");

const banner = [libraryBanner, scienceBanner, labScbBanner];
function DashboardScreen({navigation: {goBack}, navigation}: any) {
    const {t} = useTranslation();
    const [messageStatus, setMessageStatus] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            const storedData = await AsyncStorage.getItem("userData");
            const keepLoggedIn = await AsyncStorage.getItem("keepLoggedIn");
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                if (parsedData.email && parsedData.password) {
                    SignIn({email: parsedData.email, password: parsedData.password, isRemembered: keepLoggedIn?.toString()});
                    setUserLoaded(true);
                    setMessageStatus(`Welcome back!`);
                    setShowMessage(true);
                }
            }
        };
        if (!userLoaded) {
            setTimeout(() => {
                getUserData();
                console.log("getUserData");
            }, 1000);
        }
        const onBackPress = () => {
            if (navigation.isFocused()) {
                Alert.alert(
                    "Exit Elearning?",
                    "Are you sure want to exit the app?",
                    [
                        {
                            text: "No",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                        },
                        {text: "Yes", onPress: () => BackHandler.exitApp()},
                    ],
                    {cancelable: false}
                );
                return true;
            } else {
                navigation.goBack;
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () => backHandler.remove();
    }, [userLoaded]);
    const user = auth.currentUser;
    const {expoPushToken} = usePushNotification();
    console.log(expoPushToken);
    return (
        <SafeAreaView style={{flex: 1}}>
            {user && <StatusBar backgroundColor={colorPalette.primary} />}
            <CustomAlert message={messageStatus} visible={showMessage} onClose={() => setShowMessage(false)} />
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
                    height: "100%",
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={Style.gap}>
                    <Carousel
                        width={thisDeviceWidth}
                        height={200}
                        loop
                        scrollAnimationDuration={3000}
                        autoPlay={true}
                        data={banner}
                        snapEnabled
                        renderItem={({item}) => (
                            <View style={{alignItems: "center", justifyContent: "center"}}>
                                <Image style={{width: "95%", height: 200, borderRadius: 10, alignItems: "center"}} resizeMode="cover" source={item} />
                            </View>
                        )}
                    />
                </View>
                {user && <Activity />}
                {user && <RecentlyAccessedCourse navigation={navigation} />}
            </ScrollView>
        </SafeAreaView>
    );
}
const Style = StyleSheet.create({
    TopBar: {
        backgroundColor: colorPalette.white,
        shadowColor: "#171717",
        shadowOffset: {width: -2, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        zIndex: 2,
        height: 100,
        justifyContent: "center",
        paddingHorizontal: 32,
    },
    Header: {
        top: 20,
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
