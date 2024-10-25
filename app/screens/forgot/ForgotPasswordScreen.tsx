import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
import {Icons} from "@/constants/Icons";
import CustomAlert from "@/components/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {colorPalette} from "@/constants/Colors";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
function ForgotPasswordScreen({navigation}: any) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [messageStatus, setMessageStatus] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const auth = getAuth();
    const handleLogin = async () => {
        setLoading(true);
        setShowMessage(false);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessageStatus("We sent you a link to your email!");
                setShowMessage(true);
                console.log("Password reset email sent!");
                setTimeout(() => {
                    navigation.navigate("SignIn");
                }, 10000);
            })
            .catch((error) => {
                setMessageStatus(error.message);
                setShowMessage(true);
                setLoading(false);
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchEmailAndPassword = async () => {
            const storedData = await AsyncStorage.getItem("userData");
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                if (parsedData?.email) {
                    setEmail(parsedData?.email);
                }
            }
        };
        fetchEmailAndPassword();
    }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
            <CustomAlert message={messageStatus} visible={showMessage} onClose={() => setShowMessage(false)} />
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ImageBackground
                    source={require("@/assets/images/stair-banner.jpg")}
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    resizeMode="cover"
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View style={Style.boxContainer}>
                            <View style={Style.iconContainer}>
                                <Image source={require("@/assets/images/icon.png")} style={{width: 130, height: 130}} />
                            </View>
                            <View style={{display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-around", height: "100%", gap: 20}}>
                                <View style={Style.formContainer}>
                                    <View>
                                        <Text>Email</Text>
                                        <View style={Style.inputField}>
                                            {Icons.Email}
                                            <TextInput
                                                autoComplete="off"
                                                value={email ? email : ""}
                                                style={Style.inputStyle}
                                                placeholder="Email"
                                                keyboardType="email-address"
                                                onChangeText={setEmail}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={Style.buttonContainer}>
                                    <TouchableOpacity style={Style.button} onPress={handleLogin}>
                                        <Text style={{color: colorPalette.white}}>{loading ? "Loading..." : "Reset"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={Style.logoContainer}>
                        <Image source={require("@/assets/images/SCK_SCB_logo.png")} style={Style.logo} />
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default ForgotPasswordScreen;

const Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    boxContainer: {
        backgroundColor: "white",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        padding: 20,
        height: 300,
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
        width: "100%",
        gap: 16,
    },
    inputBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
        paddingLeft: 15,
        width: "90%",
        borderRadius: 5,
    },
    forgotPassword: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    buttonContainer: {
        flex: 1,
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
    rememberMe: {
        display: "flex",
        flexDirection: "row",
        height: 20,
        alignItems: "center",
        gap: 5,
    },
});
