
import React, {useEffect, useState} from 'react';
import {StyleSheet, UIManager} from 'react-native';


import {NavigationContainer} from "@react-navigation/native";

import {navigationRef} from "./src/navogation/RootNavigation";

import SideMenuNavigator from "./src/navogation/DrawerNavigator";


if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
    /*const [isMute, setMute] = useState(false);
    useEffect(() => {
        initConfig();
    }, []);
    useEffect(() => {
        mute(isMute);
    }, [isMute]);*/

    return (
            <NavigationContainer ref={navigationRef}>
                <SideMenuNavigator/>
            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
