import {colorPalette} from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import BottomSheet, {BottomSheetView, useBottomSheet} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useCallback, useMemo, useState} from "react";
import {View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image, Button} from "react-native";

function logout({navigation}: any) {
    AsyncStorage.setItem("keepLoggedIn", "");

    navigation.navigate("SignIn");
}

const ProfileScreen = ({navigation}: any) => {
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const bottomSheetRef = React.createRef<BottomSheet>();
    const snapPoints = useMemo(() => ["10%", "50%"], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    const handleExpandPress = () => {
        bottomSheetRef.current?.expand();
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={Style.TopBar}>
                <View style={Style.Header}>
                    <View style={Style.headerRight}>
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
                <View>
                    <View>
                        <Image source={require("@/assets/images/user.jpeg")} style={Style.logo} />
                        <View>
                            <Text>Full Name Here</Text>
                            <Text>Email Here</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Button onPress={handleExpandPress} title="Edit Profile" />
                    <View style={Style.container}>
                        <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} snapPoints={snapPoints}>
                            <ProfileContent navigation={navigation} />
                        </BottomSheet>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

function ProfileContent({navigation}: any) {
    return (
        <BottomSheetView style={Style.contentContainer}>
            <Text>Awesome 🎉</Text>
        </BottomSheetView>
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
        justifyContent: "center",
        height: 80,
        position: "static",
    },
    headerRight: {
        top: 10,
        left: 20,
        justifyContent: "center",
        flex: 1,
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
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
});
