import React, {useState, useEffect} from 'react';
import {AntDesign, Ionicons, Feather} from '@expo/vector-icons';
import Constants from 'expo-constants';
import {View, StyleSheet, Image, Text, TouchableOpacity, Pressable} from 'react-native';
import RoundImage from "./RoundImage";
import PlayerActionButton from "./PlayerActionButton";
import navigation from '../navogation/RootNavigation';
import Track from "./Track";
import SvgIcon from "./SvgIcons/SvgIcon";
import {playerIcons} from "./SvgIcons/listOfIconsPathes";


const Player = () => {
    const toolBarIcons1 = ['download', 'reload1', 'sound'];
    const toolBarIcons = [playerIcons.Downloader, playerIcons.louder];
    const iconColor = '#a9a9a9';
    const [isPlayBtnPressed, setIsPlayBtnPressed] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.imagePart}>
                <Pressable onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
                    <AntDesign name="arrowleft" size={30} color="#111"/>
                </Pressable>
                <Image source={require('../assets/music_placeholder.png')} style={styles.backgroundImage}/>
            </View>
            <View style={styles.playerUI}>
                <View style={{alignItems: 'center', paddingTop: 40}}>
                    <RoundImage imageSource={require('../assets/music_placeholder.png')}/>
                </View>
                <View style={styles.songTitleContainer}>
                    <View style={{}}>
                        <Text style={styles.songName}>Song name</Text>
                        <Text style={styles.authorName}>Song author</Text>
                    </View>
                </View>
                <View style={styles.toolBar}>
                    <TouchableOpacity onPress={() => console.log('ios-options')}>
                        <SvgIcon opacity={1} height={25} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons.Options.path}/>
                    </TouchableOpacity>
                    {toolBarIcons.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => console.log(index)}>
                            <SvgIcon opacity={1} height={25} width={50} fill={iconColor}
                                     fillOpacity={1} d={item.path}/>
                        </TouchableOpacity>
                    ))}
                    <AntDesign name={'reload1'} size={24} color={iconColor}/>
                </View>
                <Track/>
                <View style={styles.playerActionButtons}>
                    <TouchableOpacity onPress={() => console.log('priv')}>
                        <SvgIcon opacity={1} height={28} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons["2"].path}/>
                    </TouchableOpacity>
                    <PlayerActionButton onPlayPress={() => setIsPlayBtnPressed(!isPlayBtnPressed)}
                                        isPressed={isPlayBtnPressed}/>
                    <TouchableOpacity onPress={() => console.log('next')}>
                        <SvgIcon opacity={1} height={28} width={50} fill={iconColor} fillOpacity={1}
                                 d={playerIcons["1"].path}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default Player;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonBack: {
        width: 50,
        height: 50,
        zIndex: 10,
        position: 'absolute',
        top: 20, left: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    songTitleContainer: {
        alignItems: 'center', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-around'
    },
    songName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    authorName: {
        fontSize: 17,
        color: '#a9a9a9'
    },
    toolBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 40
    },
    playerActionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: Constants.statusBarHeight,
    },
    imagePart: {
        flex: 0.3,
    },
    playerUI: {
        flex: 0.7,
        elevation: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

});
