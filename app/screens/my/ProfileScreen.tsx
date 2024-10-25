import {studentOfTheMonth, science, organization, seeMore} from "@/constants/BadgeInfo";
import {colorPalette} from "@/constants/Colors";
import i18n from "@/localization/i18n";
import {auth} from "@/service/Firebase";
import {Ionicons} from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {signOut} from "firebase/auth";
import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import {View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image, Alert} from "react-native";

const ProfileScreen = ({navigation}: any) => {
    const {t} = useTranslation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            const getSaveCred = await AsyncStorage.getItem("saveCred");
            if (getSaveCred === "true") {
                await AsyncStorage.removeItem("keepLoggedIn");
                navigation.navigate("SignIn");
            } else {
                AsyncStorage.removeItem("userData");
                await AsyncStorage.removeItem("keepLoggedIn");
                navigation.navigate("SignIn");
            }
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    const logOutAlert = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => handleLogout(),
                },
            ],
            {cancelable: false}
        );
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={Style.TopBar}>
                <View style={Style.Header}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("My")}>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="arrow-back" size={16} />
                                <Text>{t("buttonsTitle.back")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={Style.profileCard}>
                    <View style={{flexDirection: "row", gap: 10}}>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <Image style={Style.profileImage} source={require("@/assets/images/user.jpeg")} />
                        </View>
                        <View style={Style.userInfo}>
                            <Text style={{fontSize: 14, fontWeight: "bold"}}>Reinhard Dave Yunardi</Text>
                            <Text style={{fontWeight: "200", fontSize: 13}}>reinhard.yunardi@student.citraberkat</Text>
                            <View style={Style.Devider} />
                            <View style={{flexDirection: "column", justifyContent: "space-between", height: "auto"}}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => studentOfTheMonth()}>
                                        <View style={{alignItems: "center"}}>
                                            <View>
                                                <Ionicons name="medal" color={colorPalette.gold} size={20} />
                                            </View>
                                            <View style={{backgroundColor: colorPalette.gold, paddingHorizontal: 5, borderRadius: 5}}>
                                                <Text style={{color: "white", fontWeight: "bold"}}>#1</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => science()}>
                                        <View style={{alignItems: "center"}}>
                                            <View>
                                                <Ionicons name="cloud-outline" color={colorPalette.primary} size={20} />
                                            </View>
                                            <View style={{backgroundColor: colorPalette.primary, paddingHorizontal: 5, borderRadius: 5}}>
                                                <Text style={{color: "white", fontWeight: "bold"}}>Science</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => organization()}>
                                        <View style={{alignItems: "center"}}>
                                            <View>
                                                <Ionicons name="people" color={colorPalette.secondary} size={20} />
                                            </View>
                                            <View style={{backgroundColor: colorPalette.secondary, paddingHorizontal: 5, borderRadius: 5}}>
                                                <Text style={{color: "white", fontWeight: "bold"}}>Organization</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                                <View>
                                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                                        <Text>{t("profile.badgeHelp")}</Text>
                                        <TouchableOpacity onPress={() => seeMore()}>
                                            <Text>
                                                <Ionicons name="help-circle" size={20} />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={Style.button} onPress={() => bottomSheetRef.current?.snapToIndex(1)} activeOpacity={0.6}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
                            <Ionicons name="lock-closed-outline" size={24} color="black" />
                            <View style={Style.styleBtn}>
                                <Text>{t("profile.security")}</Text>
                                <Ionicons name="chevron-forward" size={16} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.button} onPress={() => navigation.navigate("ChangeLanguage")} activeOpacity={0.6}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
                            <Ionicons name="language-outline" size={24} color="black" />
                            <View style={Style.styleBtn}>
                                <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                    <Text>{t("profile.language")}</Text>
                                    <View style={{height: 20, width: 20}}>
                                        {i18n.language === "en" ? (
                                            <Image
                                                source={require(`@/assets/images/en.png`)}
                                                style={{width: 20, height: 20, borderWidth: 1}}
                                                borderRadius={50}
                                            />
                                        ) : (
                                            <Image
                                                source={require(`@/assets/images/id.png`)}
                                                style={{width: 20, height: 20, borderWidth: 1}}
                                                borderRadius={50}
                                            />
                                        )}
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.button} onPress={() => bottomSheetRef.current?.snapToIndex(1)} activeOpacity={0.6}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
                            <Ionicons name="notifications-outline" size={24} color="black" />
                            <View style={Style.styleBtn}>
                                <Text>{t("profile.notification")}</Text>
                                <Ionicons name="chevron-forward" size={16} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.button} onPress={() => navigation.navigate("Preferences")} activeOpacity={0.6}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
                            <Ionicons name="accessibility-outline" size={24} color="black" />
                            <View style={Style.styleBtn}>
                                <Text>{t("profile.preference")}</Text>
                                <Ionicons name="chevron-forward" size={16} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity style={Style.logOutButton} onPress={() => logOutAlert()}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
                            <Ionicons name="log-out-outline" size={24} color={colorPalette.red} />
                            <Text style={{color: colorPalette.red, fontWeight: "bold"}}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* <BottomSheet ref={bottomSheetRef} enableDynamicSizing={false} snapPoints={["10%", "50%"]} index={0} enablePanDownToClose={true}>
                <BottomSheetScrollView>{data.map(renderItem)}</BottomSheetScrollView>
            </BottomSheet> */}
        </SafeAreaView>
    );
};

export default ProfileScreen;

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
    profileCard: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        marginHorizontal: 20,
        height: "auto",
        borderRadius: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    userInfo: {
        flex: 1,
        height: "90%",
        padding: 10,
    },
    badgeContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
    },
    badge: {
        width: 25,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    Devider: {
        width: "100%",
        backgroundColor: colorPalette.primary,
        height: 2,
        borderRadius: 50,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: colorPalette.white,
    },
    settings: {
        borderWidth: 1,
        height: 100,
        width: "100%",
    },
    button: {
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    styleBtn: {
        borderBottomWidth: 0.4,
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    logOutButton: {
        width: "90%",
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colorPalette.red,
        justifyContent: "center",
    },
});
