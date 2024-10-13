import {addRecentCourse} from "@/service/api";
import {Ionicons} from "@expo/vector-icons";
import {useEffect} from "react";
import {
    View,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

function CourseScreen({route, navigation}: any) {
    const {banner, title} = route.params;

    useEffect(() => {
        addRecentCourse();
    }, []);
    return (
        <View>
            <View style={{width: "100%"}}>
                <View style={Style.Header}>
                    <View>
                        <Image
                            source={require("@/assets/images/adaptive-icon.png")}
                            style={Style.logo}
                        />
                    </View>
                    <View style={Style.headerRight}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Profile")}
                        >
                            <Ionicons name="person" size={24} left={20} />
                        </TouchableOpacity>
                        <Ionicons
                            name="menu"
                            size={24}
                            left={20}
                            onPress={() => navigation.openDrawer()}
                        />
                    </View>
                </View>
            </View>
            <ScrollView style={{padding: 20}}>
                <Image
                    source={banner}
                    style={{
                        width: "100%",
                        height: 110,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "black",
                    }}
                />
                <Text>submenu 1 - {title}</Text>
            </ScrollView>
        </View>
    );
}

export default CourseScreen;

const Style = StyleSheet.create({
    Header: {
        top: 20,
        padding: 32,
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
        borderWidth: 1,
        width: 52,
    },
    gap: {
        marginVertical: 10,
    },
});
