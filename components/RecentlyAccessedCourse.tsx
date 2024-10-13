import {colorPalette} from "@/constants/Colors";
import {auth, fs, storage} from "@/service/Firebase";
import {collection, onSnapshot, limit, query} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {Style} from "@/styles/Style";

const RecentlyAccessedCourse = () => {
    const [recentCourse, setCourse] = useState<any[]>([]);
    const user = auth.currentUser;

    const fetchRecentCourse = async () => {
        let unsubscribe = null;
        if (user) {
            const courseRef = collection(fs, `users/${user.uid}/recent-course/`);
            const queryall = query(courseRef, limit(5));
            unsubscribe = onSnapshot(queryall, async (snapshot) => {
                const fetchedCourses = await Promise.all(
                    snapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const title = data.title;
                        const imageId = data.banner;
                        const time = data.time;
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
                            id: doc.id,
                            title,
                            time,
                            ...data,
                            imageUrl,
                            tagCourse,
                        };
                    })
                );
                const uniqueCourses = [...new Map(fetchedCourses.map((course) => [course.id, course])).values()];
                const sortedCourses = uniqueCourses.sort((a, b) => b.time - a.time);
                setCourse(sortedCourses);
            });
        }
    };
    useEffect(() => {
        fetchRecentCourse();
    }, []);
    return (
        <View style={styles.Container}>
            <View>
                <Text>Recently Accessed Courses</Text>
                <View style={Style.Devider} />
            </View>
            <ScrollView horizontal>
                {recentCourse ? (
                    recentCourse.map((item: any, index: number) => (
                        <View key={index} style={{alignItems: "center", marginHorizontal: 20}}>
                            <TouchableOpacity onPress={() => console.log(item.title, "Clicked")} activeOpacity={1}>
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
                    ))
                ) : (
                    <View>
                        <Text>No Course</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default RecentlyAccessedCourse;

const styles = StyleSheet.create({
    Container: {
        padding: 20,
    },
    Content: {
        flex: 1,
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
