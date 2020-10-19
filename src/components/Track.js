import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Text,Animated} from 'react-native';
import Slider from '@react-native-community/slider';
import {Value} from "react-native-reanimated";
import {getMMSSFromMillis,setTrackPositionInMillis} from "../api/playerApi";

const Track=({currentTime='00.00',endTime,duration='00.00',progress})=>{
    const slidingStart=()=>console.log('sliderStart');
    const slidingComplete=(value)=>setTrackPositionInMillis(value);
    const convertSecondToTime=(value)=>value.toString();

    return(
        <View style={{flexDirection:'row',width:'90%',marginLeft:35,marginTop:20,marginRight:35}}>
            <Text style={[styles.timeText,{paddingRight:20}]}>{getMMSSFromMillis(currentTime)}</Text>
            <Slider
                style={{width:'60%'}}
                minimumValue={0}
                maximumValue={endTime}
                value={progress}
                onSlidingComplete={slidingComplete}
                minimumTrackTintColor={'#ff3543'}
                maximumTrackTintColor={'#ff3543'}
                thumbTintColor={'#ff3543'}
                trackStyle={styles.track}
            />
            <Text style={[styles.timeText,{paddingLeft:20}]}>{duration}</Text>
        </View>
    );
};
export default Track;

const styles=StyleSheet.create({
    timeText:{
        fontSize: 16,
        color:'#a9a9a9',
    },
    track:{
        height: 80,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    }
});
