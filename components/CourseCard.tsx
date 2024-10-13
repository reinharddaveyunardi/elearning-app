import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";

const CourseCard = ({...props}: any) => {
    return (
        <TouchableOpacity key={props}>
            <View>
                <Image source={{uri: props.imageUrl}} />
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CourseCard;
