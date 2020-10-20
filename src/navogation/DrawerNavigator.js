import React, {useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from "./TabNavigator";
import CustomDrawerLayout from "../components/DrawerLayout/DrawerLayout";
import Animated from 'react-native-reanimated';

import Notifications from "../screens/Notifications";
import {CommonActions } from '@react-navigation/native';
import {getListOfAudiosFromFileSystem} from "../api/playerApi";
import {addAllTracks} from "../redux/store/traksSlice";
import {useDispatch} from "react-redux";
import {initPlayer} from '../api/playerApi';

const Drawer = createDrawerNavigator();

const  SideMenuNavigator =({navigation}) =>{
    navigation.dispatch(state => {

        const routes = state.routes.filter(r => r.name !== 'Tips');

        return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
        });
    });


    const [progress, setProgress] = useState(new Animated.Value(0));

    const dispatch=useDispatch();

    useEffect(()=>{
        initPlayer();
        let listWithAudioFiles = getListOfAudiosFromFileSystem();
        listWithAudioFiles.then((data) => { dispatch(addAllTracks(data))});
    },[]);



    return (
            <Drawer.Navigator overlayColor={'transparent'} drawerType={'slide'}
                              drawerStyle={{backgroundColor: '#F51E38', width: '50%',}}
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
