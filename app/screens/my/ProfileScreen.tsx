import {colorPalette} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image, Button, Alert} from "react-native";

function medal() {
    Alert.alert("Student of the month!", "This badge can be obtained if you have the highest points. ");
}
function science() {
    Alert.alert(
        "Science!",
        `This badge can be obtained if you already completed the Science homework, "Interactive Content - Global Warming and Climate Change". `
    );
}
function org() {
    Alert.alert("Organization!", "This badge can be obtained if you are an active member of the organization. ");
}

const ProfileScreen = ({navigation}: any) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={Style.TopBar}>
                <View style={Style.Header}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("My")}>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="arrow-back" size={16} />
                                <Text>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={Style.profileCard}>
                    <View style={{flexDirection: "row", gap: 10}}>
                        <Image style={Style.profileImage} source={require("@/assets/images/user.jpeg")} />
                        <View style={Style.userInfo}>
                            <Text style={{fontSize: 14, fontWeight: "bold"}}>Full Name Here</Text>
                            <View style={Style.Devider} />
                            <View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => medal()}>
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
                                    <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => org()}>
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
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 180 / 2,
    },
    userInfo: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
    },
    badgeContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "40%",
        marginVertical: 10,
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
});
