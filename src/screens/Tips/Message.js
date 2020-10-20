import {Text, View,StyleSheet} from "react-native";
import React from "react";

const Message = ({title,message}) => (
    <View  style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
    </View>
);
export default Message;
const styles=StyleSheet.create({
    container:{
        justifyContent: 'center',
        paddingLeft: '10%',
        backgroundColor: '#F51E38',
        height:'35%',
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    message: {
        paddingTop:15,
        color: '#fff',
        fontSize: 16,
    }
});
