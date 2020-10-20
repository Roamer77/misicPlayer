import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {useSelector} from "react-redux";



const Notifications = () => {

    const slidingComplete=(value)=>console.log('slidingComplete: ',value);
    const currentTrack=useSelector(state=>state.trackReducer.currentTrack);


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>


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
