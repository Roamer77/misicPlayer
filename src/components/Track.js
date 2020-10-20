import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import Slider from '@react-native-community/slider';

import {getMMSSFromMillis,setTrackPositionInMillis} from "../api/playerApi";

const Track=({currentTime='00.00',endTime,duration='00.00',progress})=>{

    const slidingComplete=(value)=>setTrackPositionInMillis(value);


    return(
        <View style={styles.container}>
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
    container:{
        flexDirection:'row',
        width:'90%',
        marginLeft:35,
        marginTop:20,
        marginRight:35
    },
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
