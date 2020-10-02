import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BottomTabBar = () => {
    return (
        <View style={style.main}>
            <View style={style.left}/>
            <View style={style.center}/>
            <View style={style.extra}/>
            <View style={style.right}/>
        </View>
    );
};
export default BottomTabBar;

const style = StyleSheet.create({
    main: {width: '100%', height: 50, flexDirection: 'row'},
    left: {width: '40%', height: 50, backgroundColor: 'black', borderTopEndRadius: 49,},
    extra:{
        width: '100%', height: 15, backgroundColor: 'black',position: 'absolute',zIndex: 1,top:35,
    },
    center: {
        width: 65,
        height: 28,
        backgroundColor:'#f1f1f1',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        position: 'absolute',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#111',
        left: 153,
        bottom: 8,
        zIndex: 4
    },
    right: {width: '50%', height: 50, backgroundColor: 'black', marginLeft: 45, borderTopStartRadius: 43},
});
