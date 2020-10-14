
import React, {useEffect, useState} from 'react';
import {StyleSheet, UIManager} from 'react-native';


import {NavigationContainer} from "@react-navigation/native";

import {navigationRef} from "./src/navogation/RootNavigation";

import SideMenuNavigator from "./src/navogation/DrawerNavigator";

import Tips from "./src/screens/Tips";
import MainNavigator from "./src/navogation/MainNavigator";
import Notifications from "./src/screens/Notifications";
import {Provider} from "react-redux";
import {store} from "./src/redux/store/store";


if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <MainNavigator/>
            </NavigationContainer>
        </Provider>

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
