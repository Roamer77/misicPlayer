import React,{useState} from 'react';
import { StyleSheet} from 'react-native';

import ReAnimated  from "react-native-reanimated";

const Notifications=({animStyle})=>{
    const scale = ReAnimated.interpolate(animStyle, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = ReAnimated.interpolate(animStyle, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });
    return(
        <ReAnimated.View style={[{justifyContent:'center',alignItems:'center',flex:1,transform:[{scale:scale}] }]}>


        </ReAnimated.View>
    );
};
export default Notifications;

const style=StyleSheet.create({

});
