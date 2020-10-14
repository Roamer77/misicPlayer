import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated,Pressable} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SvgIcon from "../SvgIcons/SvgIcon";
import {tackItemIcons} from '../SvgIcons/listOfIconsPathes';
import {Extrapolate} from "react-native-reanimated";
import {songNameRepresentation} from "../../api/textTransformations";

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

const TrackItem = ({id,onDeletePress,onItemPress,songName,songAuthor,index,songDuration,image}) => {

    const iconSize = 20;
    const onAddPress = () => console.log('onAdd press');
    const onDownloadPress = () => console.log('onDownload press');

    const animatedValue=new Animated.Value(0);
    const animatedWidth=new Animated.Value(200);

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
    const changeSongNaveWidth=()=>{
        Animated.timing(animatedWidth,{
            toValue:100,
            duration:200,
            useNativeDriver:false,
        }).start();
    };
    const changeBackSongNaveWidth=()=>{
        Animated.timing(animatedWidth,{
            toValue:200,
            duration:200,
            useNativeDriver:false,
        }).start();
    };
    return (
        <Swipeable onSwipeableRightWillOpen={()=>{changeTransitinX(); changeSongNaveWidth() }}
                   onSwipeableWillClose={()=>{changeBackTransitinX(); changeBackSongNaveWidth() }}
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
            <Pressable onPress={onItemPress} style={[style.container,{paddingTop:index!==0? 12:0} ]}>

                <Animated.View style={{flex: 0.9,flexDirection:'row',alignItems:'center', transform: [{ translateX: animatedValue }] }}>
                    <Image source={image} style={style.image}/>
                    <Animated.View style={{flexDirection:'column',paddingLeft:12,width:animatedWidth}}>
                        <Text style={{fontWeight: 'bold'}}>{songNameRepresentation(songName,25)}</Text>
                    </Animated.View>
                </Animated.View>
                <View style={{flex: 0.2}}>
                    <Text>{songDuration}</Text>
                </View>
            </Pressable>
        </Swipeable>
    );
};
export default TrackItem;

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    image:{
        width: 45, height: 45,
        borderRadius: 6,
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
