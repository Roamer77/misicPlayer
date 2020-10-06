import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {Value} from "react-native-reanimated";

const Track=()=>{
    const slidingStart=()=>console.log('sliderStart');
    const slidingComplete=()=>console.log('slidingComplete');
    const convertSecondToTime=(value)=>value.toString();
    return(
        <View style={{flexDirection:'row',width:'90%',marginLeft:35,marginTop:20,marginRight:35}}>
            <Text style={[styles.timeText,{paddingRight:20}]}>02:54</Text>
            <Slider
                style={{width:'60%'}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={'#ff3543'}
                maximumTrackTintColor={'#ff3543'}
                thumbTintColor={'#ff3543'}
                trackStyle={styles.track}
            />
            <Text style={[styles.timeText,{paddingLeft:20}]}>03:29</Text>
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
