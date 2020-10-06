import  React from 'react';
import {View,StyleSheet,Pressable,Text} from 'react-native';
import { Feather } from '@expo/vector-icons';
const Button=({onPress,backgroundColor,text,textColor,styles})=>{
    return(
        <Pressable onPress={onPress} style={[style.container,{backgroundColor:backgroundColor},styles]}>
            <Text style={[{color:textColor},]}>{text}</Text>
            <Feather name="play" size={15} color={textColor} />
        </Pressable>
    );
};
export default Button;
const style=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:70,
        height:30,
        borderRadius:3,
    },
    text:{
        color:'#F51E38',
        fontSize:15,
    },
});

