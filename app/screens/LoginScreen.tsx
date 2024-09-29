import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, useColorScheme } from "react-native";
import { Icons } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";

function LoginScreen({ navigation }: any) {
    const [emailCheck, setEmailCheck] = useState("");
    const [messageStatus, setMessageStatus] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const colorScheme = useColorScheme();
    const themeTextStyles = colorScheme === "light" ? Colors.light : Colors.dark;
    const themeContainerStyles = colorScheme === "light" ? Colors.light : Colors.dark;

    useEffect(() => {
        if ((emailCheck.length >= 20 && !emailCheck.includes("@student.citraberkat.sch.id")) || emailCheck.includes("@student.citrakasih.sch.id")) {
            setMessageStatus("Please enter a valid email address");
            setShowMessage(true);
        } else {
            setMessageStatus("");
            setShowMessage(false);
        }
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("@/assets/images/stair-banner.jpg")}
                height={100}
                width={100}
                style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
                resizeMode="cover"
            >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={Style.boxContainer}>
                            <View style={Style.iconContainer}>
                                <Image source={require("@/assets/images/icon.png")} style={{ width: 80, height: 80 }} />
                            </View>
                            <View style={Style.formContainer}>
                                <View>
                                    <Text>Email</Text>
                                    <View style={Style.inputField}>
                                        {Icons.Email}
                                        <TextInput autoComplete="off" style={Style.inputStyle} placeholder="Email" keyboardType="email-address" onChangeText={setEmailCheck} />
                                    </View>
                                </View>
                                <View>
                                    <Text>Password</Text>
                                    <View style={Style.inputField}>
                                        {Icons.Password}
                                        <TextInput autoComplete="off" style={Style.inputStyle} placeholder="Password" secureTextEntry onChangeText={setEmailCheck} />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={Style.forgotPassword}>
                                    <Text>Forgot Password?</Text>
                                    <View>
                                        <TouchableOpacity>
                                            <Text>Reset!</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{ color: "red", display: showMessage ? "flex" : "none" }}>{messageStatus}</Text>
                            </View>
                            <View style={Style.buttonContainer}>
                                <TouchableOpacity style={Style.button} onPress={() => navigation.navigate("My")}>
                                    <Text>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <View style={Style.logoContainer}>
                    <Image source={require("@/assets/images/SCK_SCB_logo.png")} style={Style.logo} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default LoginScreen;

const Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    boxContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        width: "95%",
        padding: 20,
        height: 350,
        borderRadius: 10,
        zIndex: 2,
        gap: 10,
    },
    iconContainer: {
        alignItems: "center",
    },
    iconBox: {
        width: 80,
        height: 80,
    },
    formContainer: {
        justifyContent: "center",
        gap: 16,
    },
    inputBox: {
        flex: 1,
    },
    inputField: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    inputStyle: {
        borderWidth: 1,
        padding: 5,
        width: "87%",
        borderRadius: 5,
    },
    forgotPassword: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        backgroundColor: "#0d7d5e",
        alignItems: "center",
        padding: 10,
        height: 40,
        fontWeight: "bold",
        borderRadius: 5,
    },
    logoContainer: {
        width: "100%",
        resizeMode: "contain",
        backgroundColor: "white",
        height: 110,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        resizeMode: "contain",
        height: 150,
        width: "100%",
    },
});
