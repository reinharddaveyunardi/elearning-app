import {colorPalette} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {useTranslation} from "react-i18next";
import {SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

const ChangeLanguageScreen = ({navigation}: any) => {
    const {t, i18n} = useTranslation();
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={Style.TopBar}>
                <View style={Style.Header}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="arrow-back" size={16} />
                                <Text>{t("buttonsTitle.back")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={{padding: 20}}>
                <View>
                    <Text style={{fontWeight: "600"}}>{t("changeLanguage.title")}</Text>
                </View>
                <TouchableOpacity style={Style.button} onPress={() => handleLanguageChange("en")} activeOpacity={0.6}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
                        <Image source={require(`@/assets/images/en.png`)} style={{width: 20, height: 20, borderWidth: 1}} borderRadius={50} />
                        <View
                            style={[
                                Style.styleBtn,
                                {paddingHorizontal: 10},
                                i18n.language === "en" && {backgroundColor: colorPalette.primary, borderRadius: 10, paddingHorizontal: 10},
                            ]}
                        >
                            <Text style={[i18n.language === "en" && {color: colorPalette.white}]}>English</Text>
                            <Ionicons name="chevron-forward" size={16} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={Style.button} onPress={() => handleLanguageChange("id")} activeOpacity={0.6}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
                        <Image source={require(`@/assets/images/id.png`)} style={{width: 20, height: 20, borderWidth: 1}} borderRadius={50} />
                        <View
                            style={[
                                Style.styleBtn,
                                {paddingHorizontal: 10},
                                i18n.language === "id" && {backgroundColor: colorPalette.primary, borderRadius: 10, paddingHorizontal: 10},
                            ]}
                        >
                            <Text style={[i18n.language === "id" && {color: colorPalette.white}]}>Bahasa Indonesia</Text>
                            <Ionicons name="chevron-forward" size={16} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChangeLanguageScreen;

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
    button: {
        width: "100%",
        height: 50,
        paddingHorizontal: 10,
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
});
