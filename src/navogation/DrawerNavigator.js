import React, {useEffect, useRef, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from "./TabNavigator";
import CustomDrawerLayout from "../components/DrawerLayout";
import Animated from 'react-native-reanimated';
import {View} from 'react-native';
import Notifications from "../screens/Notifications";


const Drawer = createDrawerNavigator();

const  SideMenuNavigator =() =>{
    const [progress, setProgress] = useState(new Animated.Value(0));
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = {transform: [{ scale }] };
    return (
            <Drawer.Navigator overlayColor={'transparent'} drawerType={'slide'}
                              drawerStyle={{
                                  backgroundColor: '#F51E38',
                                  width: '50%',
                              }}
                              drawerContent={ props=>{
                                  setProgress(props.progress);
                                  return <CustomDrawerLayout {...props} />
                              } } >
                <Drawer.Screen name="Feed" >{()=><TabNavigator drawerProgress={progress}/>}</Drawer.Screen>
                <Drawer.Screen name="Notifications" >{()=><Notifications animStyle={progress}/>}</Drawer.Screen>
            </Drawer.Navigator>

    );
};
export default SideMenuNavigator;
