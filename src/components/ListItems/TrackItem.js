import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated,Pressable} from 'react-native';
import LottiView from 'lottie-react-native';
import {Ionicons} from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SvgIcon from "../SvgIcons/SvgIcon";
import {tackItemIcons} from '../SvgIcons/listOfIconsPathes';
import {Extrapolate} from "react-native-reanimated";


const RenderLeftAction = ({progress, dragX, onAddPress, onDownloadPress, onDeletePress,iconSize,onDragChange}) => {

    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    return (
        <Animated.View style={[style.renderLeftContainer, {transform: [{scale}]}]}>
            <Pressable onPress={onAddPress} style={[style.leftActionIcon, {backgroundColor: '#3E2AD1'}]}>
                <Ionicons name="ios-add-circle-outline" size={iconSize + 5} color="#fff"/>
            </Pressable>
            <Pressable onPress={onDownloadPress} style={[style.leftActionIcon, {backgroundColor: '#0DBB66'}]}>
                <SvgIcon d={tackItemIcons.downloader.path} fillOpacity={1} fill={'#fff'} width={iconSize}
                         height={iconSize}
                         opacity={1}/>
            </Pressable>
            <Pressable onPress={onDeletePress} style={[style.leftActionIcon, {backgroundColor: '#F8282F', paddingLeft: 4, marginRight: 10}]}>
                <SvgIcon d={tackItemIcons.basket.path} fillOpacity={1} fill={'#fff'} width={iconSize}
                         height={iconSize}
                         opacity={1}/>
            </Pressable>
        </Animated.View>
    );
};


const TrackItem = ({id,onDeletePress,songName,songAuthor}) => {
    const iconSize = 20;
    const onAddPress = () => console.log('onAdd press');
    const onDownloadPress = () => console.log('onDownload press');

    const animatedValue=new Animated.Value(0);

    const changeTransitinX=()=>{
        Animated.timing(animatedValue,{
            toValue:140,
            duration:200,
            useNativeDriver:true,
        }).start();
    };
    const changeBackTransitinX=()=>{
        Animated.timing(animatedValue,{
            toValue:0,
            duration:200,
            useNativeDriver:true,
        }).start();
    };
    return (
        <Swipeable onSwipeableRightWillOpen={()=>changeTransitinX()}
                   onSwipeableWillClose={()=>changeBackTransitinX()}
                   renderRightActions={(progress, dragX) =>{
            return (
                <RenderLeftAction iconSize={iconSize}
                                  progress={progress}
                                  dragX={dragX}
                                  onAddPress={onAddPress}
                                  onDeletePress={()=>onDeletePress(id)}
                                  onDownloadPress={onDownloadPress}/>
            );
        } }>
            <View style={[style.container, {marginTop: 20}, ]}>

                <Animated.View style={{flex: 0.9,flexDirection:'row', transform: [{ translateX: animatedValue }] }}>
                    <Image source={require('../../assets/music_placeholder.png')} style={{width: 60, height: 60}}/>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontWeight: 'bold'}}>{songName}</Text>
                        <Text>{songAuthor}</Text>
                    </View>
                </Animated.View>
                <View style={{flex: 0.2}}>
                    <Text>3:13</Text>
                </View>
            </View>
        </Swipeable>
    );
};
export default TrackItem;

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 14,
    },
    leftActionIcon: {
        width: 37,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 21,
        marginLeft: 7,
    },
    renderLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});
