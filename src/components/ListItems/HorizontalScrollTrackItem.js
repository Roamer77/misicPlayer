import React from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';


const HorizontalScrollTrackItem=({songName,songAuthor,indexInItemList})=>{
    return(
        <View style={{paddingLeft:indexInItemList!==0? 20 :0}}>
            <Image source={require('../../assets/music_placeholder.png')} style={styles.image}/>
            <View style={{paddingLeft:4,paddingTop:6}}>
                <Text style={styles.songName} >{songName}</Text>
                <Text style={styles.authorName}>{songAuthor}</Text>
            </View>
        </View>
    );
};

export default HorizontalScrollTrackItem;

const styles=StyleSheet.create({
    image:{
        width: 160, height: 160,
        borderRadius:5,
    },
    songName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    authorName: {
        fontSize: 16,
        color: '#9a9a9a'
    },
});
