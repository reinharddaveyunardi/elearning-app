import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
import {Icons} from "@/constants/Icons";
import CustomAlert from "@/components/Alert";
import {SignIn} from "@/service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Switch} from "react-native-gesture-handler";
import {colorPalette} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useFonts} from "expo-font";
function LoginScreen({navigation}: any) {
    // Credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Condition
    const [loading, setLoading] = useState(false);
    const [isRemembered, setIsRemembered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const rememberToggle = () => setIsRemembered((previous) => !previous);

    // Other
    const [messageStatus, setMessageStatus] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
        setShowMessage(false);

        try {
            await SignIn({email, password, isRemembered});
            await AsyncStorage.setItem("userData", JSON.stringify({email, password}));
            navigation.reset({
                index: 0,
                routes: [{name: "Logged"}],
            });
        } catch (error: any) {
            setMessageStatus(error.message);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchEmailAndPassword = async () => {
            const storedData = await AsyncStorage.getItem("userData");
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                if (parsedData?.email && parsedData?.password) {
                    setEmail(parsedData?.email);
                    setPassword(parsedData?.password);
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
                                {showPassword ? (
                                    <View>
                                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text>Password</Text>
                                            <TouchableOpacity onPress={() => setShowPassword(false)}>
                                                <Ionicons name="eye-off" size={20} color={colorPalette.primary} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={Style.inputField}>
                                            {Icons.Password}
                                            <TextInput
                                                keyboardType="visible-password"
                                                autoComplete="off"
                                                value={password ? password : ""}
                                                style={Style.inputStyle}
                                                placeholder="Password"
                                                onChangeText={setPassword}
                                            />
                                        </View>
                                    </View>
                                ) : (
                                    <View>
                                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text>Password</Text>
                                            <TouchableOpacity onPress={() => setShowPassword(true)}>
                                                <Ionicons name="eye" size={20} color={colorPalette.primary} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={Style.inputField}>
                                            {Icons.Password}
                                            <TextInput
                                                autoComplete="off"
                                                value={password ? password : ""}
                                                style={Style.inputStyle}
                                                placeholder="Password"
                                                secureTextEntry
                                                onChangeText={setPassword}
                                            />
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View style={Style.forgotPassword}>
                                <Text>Forgot Passoword?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
                                    <Text>Reset Now!</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Style.rememberMe}>
                                <Switch
                                    onValueChange={rememberToggle}
                                    value={isRemembered}
                                    thumbColor={isRemembered ? colorPalette.primary : colorPalette.white}
                                />
                                <Text>Remember Me</Text>
                            </View>
                            <View style={Style.buttonContainer}>
                                <TouchableOpacity style={Style.button} onPress={handleLogin}>
                                    <Text style={{color: colorPalette.white}}>{loading ? "Loading..." : "Login"}</Text>
                                </TouchableOpacity>
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
        width: "90%",
        padding: 20,
        height: 450,
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
