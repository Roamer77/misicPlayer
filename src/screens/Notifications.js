import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Animated, Button, Dimensions, Easing, Text, LayoutAnimation} from 'react-native';
import Svg, {Circle, Path} from "react-native-svg";
import {Ionicons} from '@expo/vector-icons';
import Slider from "@react-native-community/slider";



const Notifications = () => {

    const slidingComplete=(value)=>console.log('slidingComplete: ',value);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Slider
                style={{width:'60%'}}
                minimumValue={0}
                maximumValue={3000}
                onSlidingComplete={slidingComplete}
                minimumTrackTintColor={'#ff3543'}
                maximumTrackTintColor={'#ff3543'}
                thumbTintColor={'#ff3543'}
            />

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(254, 254, 254)',
        padding: 8,
    },
});
