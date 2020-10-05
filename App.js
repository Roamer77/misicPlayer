import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, UIManager} from 'react-native';

import Player from "./src/components/Player";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./src/navogation/TabNavigator";
import {navigationRef} from "./src/navogation/RootNavigation";

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
          <TabNavigator/>
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
