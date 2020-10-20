import AsyncStorage from "@react-native-community/async-storage";

const LAST_LISTENED_TRACK='lastListenedTrack';

export const getLastListenedTrack = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(LAST_LISTENED_TRACK);
        console.log('get LAST_LISTENED_TRACK');
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
       console.log('Has no last Listened Track')
    }

};

export const saveLastListenedTrack = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(LAST_LISTENED_TRACK, jsonValue);
    } catch(e) {
        console.log(`can't save last Listened Track`)
    }
    console.log('save LAST_LISTENED_TRACK');
};
