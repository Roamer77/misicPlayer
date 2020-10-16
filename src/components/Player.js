import React, {useState, useEffect,useRef} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {View, StyleSheet, Image, Text, TouchableOpacity, Pressable,} from 'react-native';
import RoundImage from "./RoundImage";
import PlayerActionButton from "./PlayerActionButton";
import navigation from '../navogation/RootNavigation';
import Track from "./Track";
import SvgIcon from "./SvgIcons/SvgIcon";
import {playerIcons} from "./SvgIcons/listOfIconsPathes";

import {useDispatch, useSelector} from "react-redux";
import {songNameRepresentation} from "../api/textTransformations";
import {getMMSSFromMillis,pauseTrack,playTrack,startPlaying} from "../api/playerApi";
import {addCurrentTrack} from '../redux/store/traksSlice';

const Player = () => {
    const toolBarIcons = [playerIcons.Downloader, playerIcons.louder];
    const iconColor = '#a9a9a9';
    const [isPlayBtnPressed, setIsPlayBtnPressed] = useState(false);

    const currentTrack=useSelector(state=>state.currentTrack);
    const [trackProgress,setTrackProgress]=useState(0);
    const [soundProgress,setSoundProgress]=useState(0);
    const selectedTrackCurrentTime=useSelector(state=>state.selectedTrackCurrentTime);
    const listOfAllTracks=useSelector(state=>state.allTracks);
    const dispatch=useDispatch();

    const [indexOfCurrentPlayingTrack,setIndexOfCurrentPlayingTrack]=useState(currentTrack.index) ;

    useEffect(()=>{
        !isPlayBtnPressed ? pauseTrack():playTrack();
    },[isPlayBtnPressed]);

    useEffect(()=>{
        if(selectedTrackCurrentTime){
            setTrackProgress(selectedTrackCurrentTime);
            setSoundProgress(selectedTrackCurrentTime*0.000005);
        }

    },[selectedTrackCurrentTime]);

    const previousTrack=()=>{
        if(listOfAllTracks){
            let trackToPlay=listOfAllTracks[indexOfCurrentPlayingTrack-1];
            setIndexOfCurrentPlayingTrack(indexOfCurrentPlayingTrack-1);
            dispatch(addCurrentTrack(trackToPlay));
            startPlaying(trackToPlay.uri);
        }
    };
    const nextTrack=()=>{
        if(listOfAllTracks){
            let trackToPlay=listOfAllTracks[indexOfCurrentPlayingTrack+1];
            setIndexOfCurrentPlayingTrack(indexOfCurrentPlayingTrack+1);
            dispatch(addCurrentTrack(trackToPlay));
            startPlaying(trackToPlay.uri);
        }
    };

    return (
        <View style={[styles.container]}>

            <View style={styles.imagePart}>
                <Pressable onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
                    <AntDesign name="arrowleft" size={30} color="#111"/>
                </Pressable>
                <Image source={currentTrack.image} style={styles.backgroundImage}/>
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
                <Track currentTime={trackProgress} duration={currentTrack.duration} progress={soundProgress}/>
                <View style={styles.playerActionButtons}>
                    <TouchableOpacity onPress={previousTrack}>
                        <SvgIcon opacity={1} height={28} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons["2"].path}/>
                    </TouchableOpacity>
                    <PlayerActionButton onPlayPress={() =>setIsPlayBtnPressed(!isPlayBtnPressed)}
                                        isPressed={isPlayBtnPressed}/>
                    <TouchableOpacity onPress={nextTrack}>
                        <SvgIcon opacity={1} height={28} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons["1"].path}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default Player;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        position: 'absolute',
        width: '100%',
        height:'120%'
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
