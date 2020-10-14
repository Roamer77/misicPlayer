import React from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {songNameRepresentation} from "../../api/textTransformations";


const HorizontalScrollTrackItem=({songName,image,songAuthor,indexInItemList})=>{
    return(
        <View style={{paddingLeft:indexInItemList!==0? 20 :0}}>
            <Image source={image} style={styles.image}/>
            <View style={{paddingLeft:4,paddingTop:6}}>
                <Text style={styles.songName} >{songNameRepresentation(songName,14)}</Text>
            </View>
        </View>
    );
};

export default HorizontalScrollTrackItem;

const styles=StyleSheet.create({
    image:{
        width: 130, height: 130,
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
