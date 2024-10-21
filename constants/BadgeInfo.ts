import {Alert} from "react-native";

function seeMore() {
    Alert.alert("How to get?", "You can get badges by completing certain tasks!");
}

function studentOfTheMonth() {
    Alert.alert("Student of the month!", "This badge can be obtained if you have the highest points. ");
}
function organization() {
    Alert.alert("Organization!", "This badge can be obtained if you are an active member of the organization. ");
}
function science() {
    Alert.alert(
        "Science!",
        `This badge can be obtained if you already completed the Science homework, "Interactive Content - Global Warming and Climate Change". `
    );
}

export {studentOfTheMonth, organization, science, seeMore};
