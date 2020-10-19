import {Audio} from 'expo-av';
import * as MediaLibrary from "expo-media-library";
import placeHolder1 from '../assets/plaseholders/1.jpeg';
import placeHolder2 from '../assets/plaseholders/2.jpg';
import placeHolder3 from '../assets/plaseholders/3.png';
import placeHolder4 from '../assets/plaseholders/4.jpg';
import placeHolder5 from '../assets/plaseholders/5.png';
import placeHolder6 from '../assets/plaseholders/6.jpg';
let soundObject;

const getRandomPlaceHolder=()=>{
    const data=[placeHolder1,placeHolder2,placeHolder3,placeHolder4,placeHolder5,placeHolder6];
    const max=data.length-1;
    const min=0;
    let res=Math.floor(Math.random() * (max - min + 1)) + min;
    return  data[res];
};

export const initPlayer = async () => {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        });
        soundObject = new Audio.Sound();
    } catch (e) {
        console.log(e)
    }
};

export const setPlaybackStatusUpdate=(callback)=>{
    if(soundObject)
        soundObject.setOnPlaybackStatusUpdate(callback);
};
export const stopPlaying = async () => {
    await soundObject.stopAsync();
};
export const pauseTrack = async ()=>{
    await soundObject.pauseAsync();
};
export const playTrack=async ()=>{
    await soundObject.playAsync();
};
export const startPlaying = async (trackURI) => {
    if(soundObject.isPlaying){
        console.log('stop playing');
       await soundObject.stopAsync();
    }
        await soundObject.unloadAsync();
        await soundObject.loadAsync({uri: trackURI});
        await soundObject.playAsync();
};

export const mute = async (isMuted) => {
    try {
        if (soundObject)
            await soundObject.setIsMutedAsync(isMuted);
    } catch (e) {
        console.log(e);
    }
};

export const getCurrentTrackDuration = async () => {
    try {
        if (soundObject) {
            let {durationMillis} = await soundObject.getStatusAsync();
            return durationMillis;
        }
        return null;
    } catch (e) {
        console.log(e);
    }
};
export const setTrackPositionInMillis=async( position)=>{
    await soundObject.setPositionAsync(position);
};

export const getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    return  normalRepresentationOfTime(totalSeconds);
};
export const normalRepresentationOfTime=(totalSeconds)=>{
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
        const string = number.toString();
        if (number < 10) {
            return "0" + string;
        }
        return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
};

export const getListOfAudiosFromFileSystem = async () => {
    const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
    });
    let res=[];
    media.assets.forEach((item)=>{
        res.push({
            songName: item.filename,
            songAuthor:'',
            uri:item.uri,
            duration:normalRepresentationOfTime(item.duration),
            id:item.id,
            image:getRandomPlaceHolder(),
        });
    });
    return  res;
};
