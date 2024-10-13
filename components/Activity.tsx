import {colorPalette, Colors} from "@/constants/Colors";
import {useFetchHomework, useFetchQuiz} from "@/service/api";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {ScrollView, View, Text, TouchableOpacity, StyleSheet} from "react-native";

const Activity = (navigation: any) => {
    const [categories, setCategories] = useState(true);
    const {homework} = useFetchHomework();
    const {quiz} = useFetchQuiz();

    return (
        <View>
            <View
                style={{
                    paddingTop: 20,
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    gap: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        width: "80%",
                        borderRadius: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        height: 140,
                    }}
                >
                    <ScrollView
                        alwaysBounceVertical={false}
                        showsVerticalScrollIndicator={false}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        {categories ? (
                            <View style={Styles.Container}>
                                {homework.length > 0 ? (
                                    homework.map((item) => (
                                        <View key={item.id} style={Styles.box}>
                                            <View>
                                                <View style={Styles.due}>
                                                    {item.daysLeft.isOverdue ? (
                                                        <Text style={Styles.Overdue}>{item.daysLeft.statusMessage}</Text>
                                                    ) : (
                                                        <Text style={Styles.daysLeft}>{item.daysLeft.statusMessage}</Text>
                                                    )}
                                                </View>
                                                <Text>{item.title}</Text>
                                                <Text>{item.course}</Text>
                                                <Text>{item.description}</Text>
                                                <Text>
                                                    {item.status ? (
                                                        "Tugas Selesai"
                                                    ) : (
                                                        <TouchableOpacity onPress={() => navigation.navigate(item.course)}>
                                                            <Text>Add Submission</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <View>
                                        <View
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "100%",
                                                width: "100%",
                                                flex: 1,
                                            }}
                                        >
                                            <Text>There is no Homework for you!</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ) : (
                            <View>
                                {quiz.length > 0 ? (
                                    quiz.map((item) => (
                                        <View key={item.id} style={Styles.box}>
                                            <View>
                                                <View style={Styles.due}>
                                                    {item.daysLeft.isOverdue ? (
                                                        <Text style={Styles.Overdue}>{item.daysLeft.statusMessage}</Text>
                                                    ) : (
                                                        <Text style={Styles.daysLeft}>{item.daysLeft.statusMessage}</Text>
                                                    )}
                                                </View>
                                                <Text>{item.title}</Text>
                                                <Text>{item.course}</Text>
                                                <Text>{item.description}</Text>
                                                <Text>
                                                    {item.status ? (
                                                        "Tugas Selesai"
                                                    ) : (
                                                        <TouchableOpacity onPress={() => navigation.navigate(item.course)}>
                                                            <Text>Don't forget to study!</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <View>
                                        <View
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "100%",
                                                width: "100%",
                                                flex: 1,
                                            }}
                                        >
                                            <Text>There is no Quiz for you!</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        )}
                    </ScrollView>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setCategories(!categories)}
                    style={{
                        backgroundColor: "white",
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        <Ionicons name="arrow-down" />
                    </Text>
                    <Text>
                        <Ionicons name="arrow-up" />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.due}>
                <Text style={Styles.Categories}>{categories ? "Homework" : "Quiz"}</Text>
            </View>
        </View>
    );
};

export default Activity;

const Styles = StyleSheet.create({
    Container: {
        height: "100%",
    },
    Categories: {
        backgroundColor: colorPalette.sideBar,
        textAlign: "center",
        color: colorPalette.white,
        fontWeight: "bold",
        width: 80,
        marginTop: 5,
        padding: 5,
        borderRadius: 8,
        marginLeft: 20,
    },
    box: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        height: "100%",
    },
    due: {
        flex: 1,
        maxWidth: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    Overdue: {
        backgroundColor: colorPalette.red,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2.5,
        paddingBottom: 2.5,
        color: colorPalette.white,
        fontWeight: "bold",
        borderRadius: 5,
    },
    daysLeft: {
        backgroundColor: colorPalette.primary,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2.5,
        paddingBottom: 2.5,
        color: colorPalette.white,
        fontWeight: "bold",
        borderRadius: 5,
    },
});
