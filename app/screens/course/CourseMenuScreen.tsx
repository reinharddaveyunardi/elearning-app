import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, StatusBar} from "react-native";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {colorPalette} from "@/constants/Colors";
import {getDownloadURL, ref} from "@firebase/storage";
import {auth, fs, storage} from "@/service/Firebase";
import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import {Style} from "@/styles/Style";

export default function CourseMenuScreen({navigation}: any) {
    const [course, setCourse] = useState<any[]>([]);
    const user = auth.currentUser;

    const fetchCourse = () => {
        let unsubscribe = null;
        if (user) {
            const courseRef = collection(fs, `course/`);
            unsubscribe = onSnapshot(courseRef, async (snapshot) => {
                const fetchedCourses = await Promise.all(
                    snapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const id = data.id;
                        const title = data.title;
                        const imageId = data.banner;
                        const tagCourse = data.tag;
                        let imageUrl = null;
                        if (imageId) {
                            try {
                                const imageRef = ref(storage, `course-banner/${imageId}`);
                                imageUrl = await getDownloadURL(imageRef);
                            } catch (error) {
                                console.log("Error fetching image for", imageId, ":", error);
                            }
                        }

                        return {
                            id,
                            title,
                            ...data,
                            imageUrl,
                            tagCourse,
                        };
                    })
                );
                setCourse(fetchedCourses);
            });
        }
    };
    useEffect(() => {
        fetchCourse();
    }, []);

    const addRecentlyAccessedCourse = async (id: number, banner: string, title: string, tag: []) => {
        if (user) {
            const recentCourseData = {
                courseId: id,
                banner,
                title,
                tag,
                time: new Date(),
            };
            try {
                await setDoc(doc(fs, `users/${user.uid}/recent-course/${id}`), recentCourseData);
                console.log("Added to recently course");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleClick = async (id: number, banner: string, title: string, tag: []) => {
        await addRecentlyAccessedCourse(id, banner, title, tag);
        console.log("Course added to recently accessed courses");
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor={colorPalette.primary} />
            <View style={styles.TopBar}>
                <View style={styles.Header}>
                    <View>
                        <Image source={require("@/assets/images/adaptive-icon.png")} style={styles.logo} />
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Ionicons name="person" size={24} left={20} />
                        </TouchableOpacity>
                        <Ionicons name="menu" size={24} left={20} onPress={() => navigation.openDrawer()} />
                    </View>
                </View>
            </View>
            <View style={{padding: 20}}>
                <Text>My Course</Text>
                <View style={Style.Devider} />
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {course.map((item: any, index: number) => (
                    <View key={index} style={{alignItems: "center"}}>
                        <TouchableOpacity onPress={() => handleClick(item.id, item.banner, item.title, item.tag)} activeOpacity={1}>
                            <View style={styles.Card}>
                                {item.imageUrl && (
                                    <View>
                                        <Image
                                            key={index}
                                            source={{
                                                uri: item.imageUrl,
                                            }}
                                            style={styles.Image}
                                        />
                                        <View style={styles.courseInformation}>
                                            <View>
                                                <Text style={styles.courseTitle}>{item.title}</Text>
                                                <View style={styles.tagContainer}>
                                                    {item.tag.map((tag: string, index: number) => (
                                                        <View key={index} style={styles.tag}>
                                                            <Text key={index} style={styles.tagText}>
                                                                #{tag}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        width: 92,
    },
    Card: {
        marginHorizontal: 10,
        width: 300,
        marginVertical: 10,
        height: "auto",
        padding: 0,
        backgroundColor: colorPalette.white,

        shadowColor: "#171717",
        shadowOffset: {width: -2, height: 7},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        zIndex: 2,
    },
    courseInformation: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 50,
        padding: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: colorPalette.white,

        shadowColor: "#171717",
        shadowOffset: {width: 0, height: -7},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
        zIndex: 2,
    },
    courseData: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    courseTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    Image: {
        position: "relative",
        width: "100%",
        height: 180,
        backgroundColor: colorPalette.white,

        top: 0,
    },
    tagContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
    tag: {
        backgroundColor: colorPalette.primary,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    tagText: {
        color: colorPalette.white,
    },
});
