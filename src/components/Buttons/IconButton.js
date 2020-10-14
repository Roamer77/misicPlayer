import  React from 'react';
import {StyleSheet,Pressable} from 'react-native';
import { Feather } from '@expo/vector-icons';
const IconButton=({onPress,backgroundColor, iconColor,styles,iconName})=>{
    return(
        <Pressable onPress={onPress} style={[style.container,{backgroundColor:backgroundColor},styles]}>
            <Feather name={iconName} size={20} color={iconColor} />
        </Pressable>
    );
};
export default IconButton;
const style=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:30,
        height:30,
        borderRadius:3,
    },
    text:{
        color:'#F51E38',
        fontSize:15,
    },
});

