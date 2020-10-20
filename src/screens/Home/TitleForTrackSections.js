import React from "react";
import {Text, View,StyleSheet} from "react-native";

const TitleForTrackSections = ({text}) => (
    <View>
        <Text style={style.titleForTrackSections}>{text}</Text>
    </View>
);
export default TitleForTrackSections;

const style=StyleSheet.create({
    titleForTrackSections: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 12,
        paddingTop: 20
    },
});
