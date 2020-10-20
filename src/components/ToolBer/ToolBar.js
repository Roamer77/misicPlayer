import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Pressable, Dimensions, StyleSheet} from "react-native";
import ActionButton from "../SvgIcons/ActionButton";
import {pathes} from '../SvgIcons/listOfIconsPathes';
import SvgIcon from "../SvgIcons/SvgIcon";
import ToolBarBackground from "./ToolBarBackground";
import {toolBarHeight} from "../../constants/Constants";
import Animated from 'react-native-reanimated';
import ReAnimated from "react-native-reanimated";
import {useSelector} from "react-redux";
import routs from "../../navogation/routs";

const ToolBar = ({state, descriptors, navigation, drawerProgress}) => {

    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const {width} = Dimensions.get('window');


    if (focusedOptions && focusedOptions.tabBarVisible === false) {
        return null;
    }

    const [currentTabSelected, setCurrentTab] = useState(0);


    const translateYForToolBar = ReAnimated.interpolate(drawerProgress, {
        inputRange: [0, 1],
        outputRange: [0, 80],
    });

    const currentTrack = useSelector(state => state.trackReducer.currentTrack);

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (currentTrack) {
            currentTrack.uri ? setIsActive(false) : setIsActive(true);
        }
    }, [currentTrack]);

    return (
        <Animated.View style={[styles.container, {translateY: translateYForToolBar}]}>

            <Pressable disabled={isActive} onPress={() => {
                let res = routs.find((rout) => rout.routName === 'CurrentTrack');
                navigation.navigate(res.routName);
            }} style={[styles.actionButton,{left: width > 350 ? width / 2.35 : width / 2.4,}]}>
                <ActionButton isActive={!isActive}/>
            </Pressable>

            <ToolBarBackground width={width} height={toolBarHeight} fill={'white'}/>

            <View style={styles.buttonsContainer}>
                {pathes.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        setCurrentTab(index);
                        let res = routs.find((rout) => rout.id === item.id);
                        navigation.navigate(res.routName);
                    }}>
                        <SvgIcon width={30}
                                 height={30}
                                 fill={currentTabSelected === index ? '#3E2AD1' : '#0F1E36'}
                                 fillOpacity={currentTabSelected === index ? 1 : 0.5}
                                 opacity={1}
                                 d={item.path}
                                 style={{
                                     marginLeft: item.id === 3 ? 50 : 0,
                                     marginRight: item.id === 2 ? 50 : 0,
                                 }}/>
                    </TouchableOpacity>
                ))}
            </View>
        </Animated.View>
    );
};
export default ToolBar;

const styles = StyleSheet.create({
    container: {
        height: 65,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    actionButton: {
        position: 'absolute',
        zIndex: 21,

        bottom: 19
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        justifyContent: 'space-around',
        bottom: 10,
        zIndex: 3,
    },
});
