import {colorPalette} from "@/constants/Colors";
import {auth, fs} from "@/service/Firebase";
import {Ionicons} from "@expo/vector-icons";
import {collection, doc, getDoc, getDocs, orderBy, query} from "firebase/firestore";
import {useEffect, useState} from "react";
import {View, Image, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";

function CourseScreen({route, navigation}: any) {
    const {banner, title, id} = route.params;

    const [courseContent, setCourseContent] = useState<any>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [announcement, setAnnouncement] = useState<any[]>([]);
    const useFetchCourseContent = () => {
        useEffect(() => {
            const user = auth.currentUser;
            const fetchCourseContent = async () => {
                const contentRef = doc(fs, `course/${id}`);
                const contentDoc = await getDoc(contentRef);
                if (contentDoc.exists()) {
                    setCourseContent(contentDoc.data());
                    const assignmentsRef = collection(fs, `course/${id}/assign`);
                    const assignQuery = query(assignmentsRef, orderBy("dueDate"));
                    const assignSnapshot = await getDocs(assignQuery);
                    const assignData = assignSnapshot.docs.map((doc) => doc.data());
                    setAssignments(assignData);
                    const announcementRef = collection(fs, `course/${id}/announ`);
                    const announcementSnapshot = await getDocs(announcementRef);
                    const announcementData = announcementSnapshot.docs.map((doc) => doc.data());
                    setAnnouncement(announcementData);
                } else {
                    console.log("There's no content for this course");
                }
            };
            fetchCourseContent();
        }, [id]);
    };

    return (
        <View>
            <View style={Style.TopBar}>
                <View style={Style.Header}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("My")}>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="arrow-back" size={16} />
                                <Text>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={{padding: 20}}>
                <Image
                    source={{uri: banner}}
                    style={{
                        width: "100%",
                        height: 110,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "black",
                    }}
                />
                <Text>submenu 1 - {title}</Text>
                <View style={Style.card}>
                    <View>
                        <Text>Course Title</Text>
                        <Text>Course Description</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default CourseScreen;

const Style = StyleSheet.create({
    TopBar: {
        backgroundColor: colorPalette.white,
        shadowColor: "#171717",
        shadowOffset: {width: -2, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        zIndex: 2,
        height: 100,
        justifyContent: "center",
        paddingHorizontal: 32,
    },
    Header: {
        top: 20,
        position: "static",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    card: {
        borderWidth: 1,
    },
});
