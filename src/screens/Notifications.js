import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Button,Text} from 'react-native';
import {CAMERA, CAMERA_ROLL, usePermissions} from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import {initConfig, startPlaying} from "../api/playerApi";
import * as DocumentPicker from 'expo-document-picker';
import {useDispatch,useSelector} from "react-redux";
import {addCurrentTrack} from "../redux/store/traksSlice";
import * as Notification from 'expo-notifications';

const Notifications = ({animStyle}) => {
    const [permission, askForPermission] = usePermissions(CAMERA_ROLL, { ask: true });
    const [isMute, setMute] = useState(false);
    Notification.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    const showNotification = async () => {
        let myNot= await Notification.presentNotificationAsync({
            sticky:false,
            priority:'low',
            autoDismiss:true,
            sound:false,
            title: 'Look at that notification',
            body: "I'm so proud of myself!",
        });

    };

    return (
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
            <Button title={'Press'} onPress={showNotification}/>
        </View>
    );
};
export default Notifications;

const styles = StyleSheet.create({
    header: {
        width: "100%",

        height: 200,
        zIndex:12,
        backgroundColor: "#F51E38",

    },
});
