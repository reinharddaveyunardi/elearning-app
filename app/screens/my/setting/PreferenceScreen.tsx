import {colorPalette} from "@/constants/Colors";
import i18n from "@/localization/i18n";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Switch, Alert} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

const PreferenceScreen = ({navigation}: any) => {
    const {t} = useTranslation();
    const [theme, setTheme] = React.useState(false);
    const [saveCred, setSaveCred] = React.useState(false);

    const themeToggle = () => setTheme((prev) => !prev);
    const saveCredToggle = () => setSaveCred((prev) => !prev);

    const themeHelp = () => Alert.alert(t("preferences.help.theme.title"), t("preferences.help.theme.description"));
    const saveCredHelp = () => Alert.alert(t("preferences.help.saveCredentials.title"), t("preferences.help.saveCredentials.description"));
    const saveChanges = async () => {
        try {
            await AsyncStorage.setItem("theme", String(theme));
            console.log("Theme changed to", theme ? "dark" : "light");

            await AsyncStorage.setItem("saveCred", String(saveCred));
            console.log("SaveCred changed to", saveCred ? "true" : "false");

            navigation.navigate("My");
        } catch (error) {
            console.error("Error saving preferences to AsyncStorage", error);
        }
    };
    useEffect(() => {
        const retrieveData = async () => {
            try {
                const getTheme = await AsyncStorage.getItem("theme");
                if (getTheme !== null) {
                    setTheme(getTheme === "true");
                }

                const getSaveCred = await AsyncStorage.getItem("saveCred");
                if (getSaveCred !== null) {
                    setSaveCred(getSaveCred === "true");
                }
            } catch (error) {
                console.error("Error retrieving preferences from AsyncStorage", error);
            }
        };

        retrieveData();
    }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={Style.TopBar}>
                <View style={Style.Header}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="arrow-back" size={16} />
                                <Text>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={{paddingHorizontal: 20}}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Text>{t("preferences.theme")}</Text>
                            <TouchableOpacity onPress={themeHelp}>
                                <Ionicons name="help-circle-outline" size={16} />
                            </TouchableOpacity>
                        </View>
                        <Switch onValueChange={themeToggle} value={theme} thumbColor={theme ? colorPalette.primary : colorPalette.white} />
                    </View>
                </View>
                <View style={{paddingHorizontal: 20}}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Text>{t("preferences.saveCredentials")}</Text>
                            <TouchableOpacity onPress={saveCredHelp}>
                                <Ionicons name="help-circle-outline" size={16} />
                            </TouchableOpacity>
                        </View>
                        <Switch onValueChange={saveCredToggle} value={saveCred} thumbColor={saveCred ? colorPalette.primary : colorPalette.white} />
                    </View>
                </View>
            </ScrollView>
            <View style={{alignItems: "center", justifyContent: "center", padding: 20}}>
                <TouchableOpacity onPress={saveChanges} style={Style.button}>
                    <Text>{t("buttonsTitle.save")}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PreferenceScreen;

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
        backgroundColor: "#0d7d5e",
        alignItems: "center",
        padding: 10,
        height: 40,
        width: "100%",
        fontWeight: "bold",
        borderRadius: 5,
    },
});
