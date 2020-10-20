import {Animated} from "react-native";
import React from "react";

const BackGround = () =>
    (
        <Animated.View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#F51E38',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
        }}/>
    );

export default BackGround;
