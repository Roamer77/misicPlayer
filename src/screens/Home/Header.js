import ReAnimated from "react-native-reanimated";
import {Feather} from "@expo/vector-icons";
import {Image, Pressable, Text, View, StyleSheet} from "react-native";
import {songNameRepresentation} from "../../api/textTransformations";
import Button from "../../components/Buttons/Button";
import IconButton from "../../components/Buttons/IconButton";
import React from "react";

const Header = ({onMenuButtonPress, headerDynamicHeight, backgroundColor, borderRadius, opacity, pressPlay, currentTrack, isPlying, menuBtnColor}) => {
    const {image, songName, songAuthor} = currentTrack;
    const AnimatedIcon = ReAnimated.createAnimatedComponent(Feather);
    return (
        <ReAnimated.View
            style={[style.header, {
                height: headerDynamicHeight,
                backgroundColor: backgroundColor,
                borderRadius: borderRadius
            }]}>

            <Pressable onPress={onMenuButtonPress} style={style.menuBtn}>
                <AnimatedIcon name="menu" size={27} style={{color: menuBtnColor}}/>
            </Pressable>

            <ReAnimated.View style={{opacity: opacity, borderRadius: borderRadius}}>
                <Image source={image ? image : require('../../assets/Rectangle.png')}
                       style={style.image}/>
                <View style={{position: 'absolute', left: 0, width: '100%', bottom: 20, zIndex: 12, opacity: 1}}>
                    {songName && <View
                        style={style.trackInfo}>
                        <Text style={[{color: '#fff'}, style.headerBackgroundTextStyle]}>// TRENDING</Text>
                        <Text style={[style.songName, style.headerBackgroundTextStyle]}>{songNameRepresentation(songName, 27)}</Text>
                        <Text style={style.authorName}>{songAuthor}</Text>
                    </View>}
                    <View style={style.actionButtons}>
                        <Button styles={{marginLeft: 20}} backgroundColor={'#fff'} text={isPlying ? 'PAUSE' : 'PLAY'}
                                onPress={pressPlay} textColor={'#F51E38'}/>
                        <IconButton styles={{marginLeft: 10}} iconName={'share-2'} iconColor={'#F51E38'}
                                    backgroundColor={'#fff'}/>
                    </View>
                </View>

            </ReAnimated.View>
        </ReAnimated.View>
    );
};
export default Header;

const style = StyleSheet.create({
    headerBackgroundTextStyle:{
        backgroundColor:'rgba(17,17,17,0.74)'
    },
    header: {
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        overflow: "hidden",
        zIndex: 999,
        backgroundColor: "#F51E38"
    },
    menuBtn: {
        position: 'absolute', top: 30, left: 18, zIndex: 20
    },
    image:{
        width: '100%',
        height: '100%'
    },
    trackInfo:{
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40
    },
    songName:{
        color: '#fff',
        fontSize: 25,
        textDecorationColor: '#111',
        fontWeight: 'bold'
    },
    authorName:{
        color: '#fff',
        fontSize: 18
    },
    actionButtons:{
        flexDirection: 'row',
        marginBottom: 10,
        paddingTop: 20,
    }
});
