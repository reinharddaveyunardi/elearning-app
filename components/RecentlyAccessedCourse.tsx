import {colorPalette} from "@/constants/Colors";
import React, {useState} from "react";
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import {Style} from "@/styles/Style";
import Carousel, {TAnimationStyle} from "react-native-reanimated-carousel";
import {interpolate} from "react-native-reanimated";
import {useRecentCourse} from "@/service/api";
import {useTranslation} from "react-i18next";

const RecentlyAccessedCourse = ({navigation}: any) => {
    const {t} = useTranslation();
    const width = Dimensions.get("window").width;
    const [recentCourse, setRecentCourse] = useState<any[]>([]);
    const fetchRecentCourses = async () => {
        const data = await useRecentCourse();
        setRecentCourse(data as any[]);
    };
    if (recentCourse.length === 0) {
        fetchRecentCourses();
        console.log("fetching");
    }
    const handleClick = async (id: number, banner: string, title: string, tag: []) => {
        navigation.navigate(`Course`, {id: id, title: title, banner: banner, tag: tag});
    };

    const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
        "worklet";
        const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
        const rotateZ = `${interpolate(value, [-1, 0, 1], [-10, 0, 10])}deg`;
        const translateX = interpolate(value, [-1, 0, 1], [-width, 0, width]);
        return {
            transform: [{rotateZ}, {translateX}],
            zIndex,
        };
    }, []);
    return (
        <View style={{marginVertical: 10}}>
            <View style={{paddingHorizontal: 20}}>
                <Text>{t("recentCourse.title")}</Text>
                <View style={Style.Devider} />
            </View>
            <Carousel
                loop
                style={{
                    height: 240,
                    width: "100%",
                    top: 10,
                }}
                width={width}
                height={width / 2}
                data={recentCourse}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => handleClick(item.id, item.imageUrl, item.title, item.tag)}
                        activeOpacity={1}
                        style={{alignItems: "center", justifyContent: "center", top: 20}}
                    >
                        <View style={styles.Card}>
                            {item.imageUrl && (
                                <View>
                                    <Image
                                        key={item}
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
                )}
                customAnimation={animationStyle}
            />
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
