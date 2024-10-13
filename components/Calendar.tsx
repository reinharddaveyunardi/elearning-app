import React, {useState} from "react";
import {View, Text} from "react-native";

const CalendarComponent = () => {
    const [markedDates, setMarkedDates] = useState({
        "2023-03-16": {selected: true, selectedColor: "#00ff00"},
        "2023-03-20": {selected: true, selectedColor: "#ff0000"},
    });

    return (
        <View>
            <Text>Calendar</Text>
        </View>
    );
};

export default CalendarComponent;
