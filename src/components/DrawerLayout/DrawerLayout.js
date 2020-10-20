import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {DrawerContentScrollView,} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import DrawerItem from "./DrawerItem";


const CustomDrawerLayout = ({progress, ...props}) => {

    const translateX = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    const iconsNames = ['music-note-outline', 'file-multiple', 'account-outline', 'youtube', 'cards-heart', 'file-cabinet', 'folder-download', 'folder-open-outline'];

    const labels = ['Songs', 'Albums', 'Artists', 'YouTube', 'Favourite', 'Recent History', 'Download', 'Local Files'];

    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false} style={{backgroundColor: '#F51E38'}}>
            <Animated.View style={{transform: [{translateX}], paddingTop: '30%'}}>
                <View style={style.profile}>
                    <Image source={require('../../assets/music_placeholder.png')} style={style.avatar}/>
                    <View>
                        <Text style={{fontSize: 15}}>Flow</Text>
                        <View style={style.profileStatusIndicator}>
                            <MaterialCommunityIcons name="crown" size={20} color="#3E2AD1"/>
                            <Text style={{color: '#3E2AD1'}}>Premium</Text>
                        </View>

                    </View>
                </View>
                <View style={{paddingLeft: 20}}>
                    {iconsNames.map((item, index) =>
                        (<DrawerItem
                            key={index}
                            iconName={item}
                            label={labels[index]}
                            rippleColor={'rgba(0,103,255,0.08)'}
                            onPress={() => {}}/>)
                    )}
                </View>
                <View style={style.logoutBtn}>
                    <DrawerItem
                        iconName={'logout'}
                        onPress={() => {}}
                        rippleColor={'rgba(0,103,255,0.08)'}
                        iconSize={35}
                        label={'Sing Out'}/>
                </View>
            </Animated.View>

        </DrawerContentScrollView>
    );
};

export default CustomDrawerLayout;
const style = StyleSheet.create({
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12
    },
    profileStatusIndicator: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    logoutBtn:{
        paddingLeft: 20,
        paddingTop: '17%'
    },
});
