import { Ionicons } from "@expo/vector-icons";
import { View, Image, Text, ScrollView } from "react-native";

function CourseScreen({ route, navigation }: any) {
    const { name, banner } = route.params;

    return (
        <View>
            <View style={{ marginTop: 60, alignItems: "flex-start" }}>
                <Ionicons name="menu" size={24} left={20} onPress={() => navigation.openDrawer()} />
            </View>
            <ScrollView style={{ padding: 20 }}>
                <Image source={banner} style={{ width: "100%", height: 110, borderRadius: 10, borderWidth: 1, borderColor: "black" }} />
                <Text>submenu 1 - {name}</Text>
            </ScrollView>
        </View>
    );
}

export default CourseScreen;
