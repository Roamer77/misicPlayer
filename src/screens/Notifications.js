import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Animated,Button,Dimensions,Easing} from 'react-native';
import {CAMERA, CAMERA_ROLL, usePermissions} from 'expo-permissions';
import Svg, {Circle} from "react-native-svg";
import CircleTrackProgress from "../components/CircleTrackProgress";


const Notifications = ({animStyle}) => {
    const progress=new Animated.Value(0);
        const {width}=Dimensions.get('window');

    const startTimer=()=>{
        Animated.timing(progress,{
            toValue:1,
            duration:1000,
            easing:Easing.linear(),
            useNativeDriver:true,
        }).start();
    };


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title={'Start'} onPress={()=>startTimer()}/>
            <CircleTrackProgress progress={progress} width={70} />
        </View>
    );
};
export default Notifications;

const styles = StyleSheet.create({
    header: {
        width: "100%",

        height: 200,
        zIndex: 12,
        backgroundColor: "#F51E38",

    },
});
