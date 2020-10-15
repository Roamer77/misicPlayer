import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {CAMERA, CAMERA_ROLL, usePermissions} from 'expo-permissions';


const Notifications = ({animStyle}) => {
    const [permission, askForPermission] = usePermissions(CAMERA_ROLL, { ask: true });
    const [isMute, setMute] = useState(false);


    return (
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>

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
