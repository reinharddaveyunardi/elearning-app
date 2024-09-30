import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";

function DashboardScreen({ navigation }: any) {
    return (
        <SafeAreaView style={{ flex: 1, gap: 20 }}>
            <View style={{ marginTop: 60, alignItems: "flex-start" }}>
                <Ionicons name="menu" size={24} left={20} onPress={() => navigation.openDrawer()} />
            </View>
            <ScrollView style={{ left: 20 }}>
                <Text>Dashboard SCREEN</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DashboardScreen;
