import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Animated,Button,Dimensions,Easing} from 'react-native';
import Svg, {Circle} from "react-native-svg";

const CircleTrackProgress=({style,progress,width,tintColor})=>{

    const AnimatedCircle=Animated.createAnimatedComponent(Circle);
    const size = width;
    const strokeWidth = 12;
    const radius = (size-strokeWidth)/2;
    const circleProgress = radius * 2 * Math.PI;


    const alpha=progress.interpolate({
        inputRange:[0,1],
        outputRange:[Math.PI*2,0],
    });
    const strokeDashoffset=Animated.multiply(alpha,radius);

    return(
        <View style={style}>
            <Svg width={size} height={size}>
                <AnimatedCircle
                    stroke={tintColor}
                    fill={'none'}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    {...{strokeWidth,strokeDashoffset}}
                    strokeDasharray={`${circleProgress} ${circleProgress}`}/>
            </Svg>
        </View>

    );
};

export default CircleTrackProgress;
