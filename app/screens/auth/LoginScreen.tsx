import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    useColorScheme,
    ViewStyle,
} from "react-native";
import {Icons} from "@/constants/Icons";
import CustomAlert from "@/components/Alert";
import {SignIn} from "@/service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
function LoginScreen({navigation}: any) {
    const handleLogin = async () => {
        setLoading(true);
        setShowMessage(false);

        try {
            await SignIn({email, password});
            navigation.navigate("Logged");
        } catch (error: any) {
            setMessageStatus(error.message);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    };
    // Credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Condition
    const [loading, setLoading] = useState(false);

    // Other
    const [messageStatus, setMessageStatus] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const fetchEmailAndPassword = async () => {
            const storedEmail = await AsyncStorage.getItem("email");
            const storedPassword = await AsyncStorage.getItem("password");
            if (storedEmail && storedPassword) {
                setEmail(storedEmail);
                setPassword(storedPassword);
            }
        };
        fetchEmailAndPassword();
    }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
            <CustomAlert message={messageStatus} visible={showMessage} onClose={() => setShowMessage(false)} />
            <ImageBackground
                source={require("@/assets/images/stair-banner.jpg")}
                style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                resizeMode="cover"
            >
                <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View style={Style.boxContainer}>
                            <View style={Style.iconContainer}>
                                <Image source={require("@/assets/images/icon.png")} style={{width: 80, height: 80}} />
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
                                <View>
                                    <Text>Password</Text>
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
                            </View>
                            <View style={Style.forgotPassword}>
                                <Text>Forgot Passoword?</Text>
                                <TouchableOpacity>
                                    <Text>Reset Now!</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Style.buttonContainer}>
                                <TouchableOpacity style={Style.button} onPress={handleLogin}>
                                    <Text>{loading ? "Loading..." : "Login"}</Text>
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
        width: "90%",
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
        width: "100%",
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
        paddingLeft: 15,
        width: "87%",
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
});
