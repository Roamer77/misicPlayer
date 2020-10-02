import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from "react-native";
import ActionButton from "./SvgIcons/ActionButton";
import {pathes} from './SvgIcons/listOfIconsPathes';
import SvgIcon from "./SvgIcons/SvgIcon";
import {Svg, Path} from "react-native-svg";

const ToolBarBackground = ({width, height, fill}) => (
    <Svg width={width} height={height} viewBox="0 39 375 100" preserveAspectRatio='none' fillOpacity={1}>
        <Path fillRule="evenodd"
              clipRule="evenodd"
              fill={fill}
              fillOpacity={1}
              d="M0 40H127.822C136.75 40 144.566 45.937 147.913 54.2138C152.474 65.4916 159.913 80.2259 169.246 85.6172C175.148 89.0269 194.005 95.6325 210.277 83.0325C216.849 77.9427 224.148 63.5252 228.947 52.7719C232.341 45.1683 239.773 40 248.099 40H375V120H0V40Z"/>
    </Svg>

);

const ToolBar = ({state, descriptors, navigation}) => {

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions && focusedOptions.tabBarVisible === false) {
        return null;
    }

    const [currentTabSelected, setCurrentTab] = useState(0);
    const routs = [{
        id: 1,
        routName: 'Home'
    }, {
        id: 2,
        routName: 'Tv'
    }, {
        id: 3,
        routName: 'Radio'
    }, {
        id: 4,
        routName: 'Notifications'
    }, {
        id: 5,
        routName: 'CurrentTrack'
    },];


    return (
        <View style={{height: 65, position: 'absolute', bottom: 0, left: 0, backgroundColor: 'transparent', zIndex: 1}}>
            <TouchableOpacity onPress={() => {
                let res = routs.find((rout) => rout.routName === 'CurrentTrack');
                navigation.navigate(res.routName);
            }}
                              style={{position: 'absolute', zIndex: 21, left: 179, bottom: 19}}>
                <ActionButton/>
            </TouchableOpacity>
            <ToolBarBackground width={420} height={100} fill={'white'}/>
            <View style={{
                flexDirection: 'row',
                width: '100%',
                position: 'absolute',
                justifyContent: 'space-around',
                bottom: 10,
                zIndex: 3,
            }}>
                {pathes.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        setCurrentTab(index);
                        let res = routs.find((rout) => rout.id === item.id);
                        navigation.navigate(res.routName);
                    }}>
                        <SvgIcon width={30} height={30} fill={currentTabSelected === index ? '#3E2AD1' : '#0F1E36'}
                                 fillOpacity={currentTabSelected === index ? 1 : 0.5} opacity={1} d={item.path} style={{
                            marginLeft: item.id === 3 ? 50 : 0,
                            marginRight: item.id === 2 ? 50 : 0,
                        }}/>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
export default ToolBar;
