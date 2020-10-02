import React from 'react';
import {View,StyleSheet,Image} from 'react-native';
const imageSize=150;
const RoundImage=({imageSource})=>{

    return(
       <View>
           <Image source={imageSource} style={styles.image}/>
       </View>
    );
};
export default RoundImage;

const styles=StyleSheet.create({
    image:{
        width:imageSize,
        height:imageSize,
        borderRadius:imageSize/2,
       backgroundColor:'#111'
    }
});
