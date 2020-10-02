import { Audio } from 'expo-av';

let soundObject;

export const initConfig=async ()=>{
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
        soundObject= new Audio.Sound();
        soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

        await soundObject.loadAsync(require('./4048.mp3'),{volume:1});
    } catch (e) {
        console.log(e)
    }
};
export const stopPlaying= async ()=>{
    await soundObject.stopAsync();
};
export  const startPlaying=async ()=>{
    await soundObject.playAsync();
};

export const mute=async(isMuted)=>{
    try{
        if(soundObject)
            await soundObject.setIsMutedAsync(isMuted);
    }catch (e) {
       console.log(e);
    }
};

export const getCurrentTrackDuration=async ()=>{
    try{
        if(soundObject){
            let {durationMillis}= await soundObject.getStatusAsync();
            return getMMSSFromMillis(durationMillis);
        }
        return null;
    }catch (e) {
        console.log(e);
    }
};

const onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
        // Update your UI for the unloaded state
        if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
        }
    } else {
        // Update your UI for the loaded state
       if(playbackStatus.progressUpdateIntervalMillis){

       }
       if(playbackStatus.positionMillis  ){
           console.log('positionMillis ',getMMSSFromMillis(playbackStatus.positionMillis) )
       }
        if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
           // console.log('isPlaying',playbackStatus.isPlaying)
        } else {
            // Update your UI for the paused state
        }

        if (playbackStatus.isBuffering) {
            // Update your UI for the buffering state
        }

        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
        }

    }
};
const getMMSSFromMillis=(millis)=> {
    const totalSeconds = millis / 1000;
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
