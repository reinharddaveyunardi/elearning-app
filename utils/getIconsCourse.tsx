import {useAuth} from "@/context/authContext";
import React from "react";
import {Text, View} from "react-native";
import {Icons} from "@/constants/Icons";

const getIcon = (title: string) => {
    switch (title) {
        case "Biology":
            return Icons.Biology;
        case "Arts":
            return Icons.Art;
        case "Chemistry":
            return Icons.Chemistry;
        case "Physics":
            return Icons.Physics;
        case "Sociology":
            return Icons.Sociology;
        case "Civic Education":
            return Icons.Civic;
        case "History":
            return Icons.History;
        case "English":
            return Icons.English;
        case "Bahasa":
            return Icons.Bahasa;
        case "IT":
            return Icons.IT;
        case "Geography":
            return Icons.Geography;
        case "Mathematics":
            return Icons.Mathematics;
        case "Sundanesse":
            return Icons.Sundanesse;
        case "Physical Education":
            return Icons.PoE;
        case "Economics":
            return Icons.Economics;
        default:
            return null;
    }
};
const getIconsCourse = () => {
    const {course} = useAuth();

    return (
        <View>
            {course.map((item: any) => {
                return (
                    <View key={item.id}>
                        <Text>{getIcon(item.title)}</Text>
                    </View>
                );
            })}
        </View>
    );
};

export default getIconsCourse;
