import NavTop from "@/components/NavTop";
import { useRef } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View, Text, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const data = [
    {
        id: 1,
        title: "Tugas 1",
        description: "Tugas 1",
        due: "2022-02-22",
        status: "not submitted",
    },
];

function Home() {
    return (
        <GestureHandlerRootView>
            <StatusBar backgroundColor="#0D7C5D" />
            <Text>TEST</Text>
        </GestureHandlerRootView>
    );
}

export default Home;
