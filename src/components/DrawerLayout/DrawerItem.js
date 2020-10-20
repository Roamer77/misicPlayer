import {Pressable, Text, View,StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

const DrawerItem = ({onPress, rippleColor, label, iconName, iconSize = 24}) => (
    <Pressable onPress={onPress} android_ripple={{color: rippleColor}}
               style={style.container}>
        <MaterialCommunityIcons name={iconName} size={iconSize} color="white"/>
        <View style={{paddingLeft: 12}}>
            <Text style={style.label}>{label}</Text>
        </View>
    </Pressable>
);
export default DrawerItem;

const style=StyleSheet.create({
    container:{flexDirection: 'row', alignItems: 'center', paddingTop: 25},
    label:{color: 'white', fontSize: 16}
});
