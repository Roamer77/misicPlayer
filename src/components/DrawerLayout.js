import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Pressable,Image} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {addDrawerProgress} from "../redux/store/drawerSlice";
import {useDispatch} from "react-redux";

const DrawerItem = ({onPress, rippleColor, label, iconName,iconSize=24}) => (
    <Pressable onPress={onPress} android_ripple={{color: rippleColor}}
               style={{flexDirection: 'row', alignItems: 'center', paddingTop: 25}}>
        <MaterialCommunityIcons name={iconName} size={iconSize} color="white"/>
        <View style={{paddingLeft: 12}}>
            <Text style={{color: 'white', fontSize: 16}}>{label}</Text>
        </View>
    </Pressable>
);

const CustomDrawerLayout = ({progress, ...props}) => {

    const dispatch=useDispatch();

    const translateX = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });
    const iconsNames = ['music-note-outline', 'file-multiple', 'account-outline', 'youtube', 'cards-heart', 'file-cabinet', 'folder-download', 'folder-open-outline'];
    const labels = ['Songs', 'Albums', 'Artists', 'YouTube', 'Favourite', 'Recent History', 'Download', 'Local Files'];


    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}  style={{backgroundColor: '#F51E38'}}>
            <Animated.View style={{transform: [{translateX}],paddingTop:'30%'}}>
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',paddingLeft:20,borderBottomRightRadius:12,borderTopRightRadius:12}}>
                    <Image source={require('../assets/music_placeholder.png')} style={{width:60,height:60,borderRadius:30}}/>
                    <View >
                        <Text style={{fontSize:15}}>Flow</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <MaterialCommunityIcons name="crown" size={20} color="#3E2AD1" />
                            <Text style={{color:'#3E2AD1'}}>Premium</Text>
                        </View>

                    </View>
                </View>
                <View style={{paddingLeft: 20}}>
                    {iconsNames.map((item, index) => (<DrawerItem key={index} iconName={item} label={labels[index]}
                                                                  rippleColor={'rgba(0,103,255,0.08)'} onPress={() => {
                    }}/>))}
                </View>
                <View style={{paddingLeft:20,paddingTop:'17%'}}>
                    <DrawerItem iconName={'logout'} onPress={()=>{}} rippleColor={'rgba(0,103,255,0.08)'} iconSize={35} label={'Sing Out'} />
                </View>
            </Animated.View>

        </DrawerContentScrollView>
    );
};

export default CustomDrawerLayout;
