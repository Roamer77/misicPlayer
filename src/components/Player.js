import React, {useState, useEffect,useRef} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {View, StyleSheet, Image, Text, TouchableOpacity, Pressable,Animated,ImageBackground} from 'react-native';
import RoundImage from "./RoundImage";
import PlayerActionButton from "./PlayerActionButton";
import navigation from '../navogation/RootNavigation';
import Track from "./Track";
import SvgIcon from "./SvgIcons/SvgIcon";
import {playerIcons} from "./SvgIcons/listOfIconsPathes";
import {useNavigation} from '@react-navigation/native';
import {Extrapolate} from "react-native-reanimated";
import {StatusBar} from "expo-status-bar";
import {useSelector} from "react-redux";
import {songNameRepresentation} from "../api/textTransformations";
import {getMMSSFromMillis} from "../api/playerApi";

const Player = () => {
    const toolBarIcons1 = ['download', 'reload1', 'sound'];
    const toolBarIcons = [playerIcons.Downloader, playerIcons.louder];
    const iconColor = '#a9a9a9';
    const waveAnimRef=useRef(null);
    const [isPlayBtnPressed, setIsPlayBtnPressed] = useState(false);
    const nav=useNavigation();
    const animatedValue=new Animated.Value(0);
    const currentTrack=useSelector(state=>state.currentTrack);
    const [trackProgress,setTrackProgress]=useState(0);
    const [soundProgress,setSoundProgress]=useState(0);
    const selectedTrackCurrentTime=useSelector(state=>state.selectedTrackCurrentTime);
    useEffect(()=>{

        let listener=nav.addListener('focus',()=>{

            Animated.timing(animatedValue,{
                toValue:1,
                duration:200,
                useNativeDriver:true,
            }).start();
        });
      return ()=>{
          return listener;
      };
    },[nav]);

    useEffect(()=>{
        if(selectedTrackCurrentTime){
            setTrackProgress(selectedTrackCurrentTime);
            //setSoundProgress((1/selectedTrackCurrentTime)*1000);
            console.log(selectedTrackCurrentTime/1000);
        }

    },[selectedTrackCurrentTime]);

    const scale=animatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[0,1],
        extrapolate:Extrapolate.CLAMP,
    });

    return (
        <Animated.View style={[styles.container,{  transform:[{scaleY:scale},{scaleX:scale}] }]}>

            <View style={styles.imagePart}>
                <Pressable onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
                    <AntDesign name="arrowleft" size={30} color="#111"/>
                </Pressable>
                <ImageBackground source={currentTrack.image} style={styles.backgroundImage}/>
            </View>
            <View style={styles.playerUI}>
                <View style={{alignItems: 'center', paddingTop: 40}}>
                    <RoundImage imageSource={currentTrack.image}/>
                </View>
                <View style={styles.songTitleContainer}>
                    <View style={{}}>
                        <Text style={styles.songName}>{songNameRepresentation( currentTrack.songName,15)}</Text>
                        <Text style={styles.authorName}>{currentTrack.songAuthor}</Text>
                    </View>
                </View>
                <View style={styles.toolBar}>
                    <TouchableOpacity onPress={() => console.log('ios-options')}>
                        <SvgIcon opacity={1} height={25} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons.Options.path}/>
                    </TouchableOpacity>
                    {toolBarIcons.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => console.log(index)}>
                            <SvgIcon opacity={1} height={25} width={50} fill={iconColor}
                                     fillOpacity={1} d={item.path}/>
                        </TouchableOpacity>
                    ))}
                    <AntDesign name={'reload1'} size={24} color={iconColor}/>
                </View>
                <Track currentTime={getMMSSFromMillis(trackProgress)} duration={currentTrack.duration} progress={soundProgress}/>
                <View style={styles.playerActionButtons}>
                    <TouchableOpacity onPress={() => console.log('priv')}>
                        <SvgIcon opacity={1} height={28} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons["2"].path}/>
                    </TouchableOpacity>
                    <PlayerActionButton onPlayPress={() =>setIsPlayBtnPressed(!isPlayBtnPressed)}
                                        isPressed={isPlayBtnPressed}/>
                    <TouchableOpacity onPress={() => console.log('next')}>
                        <SvgIcon opacity={1} height={28} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons["1"].path}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};
export default Player;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    waves:{
        position:'absolute',
        top:77,
        width:'100%',
    },
    buttonBack: {
        width: 50,
        height: 50,
        zIndex: 10,
        position: 'absolute',
        top: 20, left: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    songTitleContainer: {
        alignItems: 'center', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-around'
    },
    songName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    authorName: {
        fontSize: 17,
        color: '#a9a9a9'
    },
    toolBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 40
    },
    playerActionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    imagePart: {
        flex: 0.3,
    },
    playerUI: {
        flex: 0.7,
        elevation: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

});
