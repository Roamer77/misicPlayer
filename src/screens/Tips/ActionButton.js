import React from "react";
import {Text, View,StyleSheet} from "react-native";
import IconButton from "../../components/Buttons/IconButton";


const ActionButton = ({onPress}) => (
    <View style={style.container}>
        <IconButton backgroundColor={'#fff'}
                    iconName={'arrow-right'}
                    iconColor={'#F51E38'}
                    onPress={onPress}
                    styles={style.iconButton}/>
        <View style={style.textNearBtnContainer}>
            <Text style={style.textNearBtn}>GET START</Text>
        </View>
    </View>
);

const style=StyleSheet.create({
    container:{
        flexDirection: 'row-reverse',
        paddingLeft: '10%',
        alignItems: 'center',
        backgroundColor: "#F51E38",
        paddingBottom: '10%'
    },
    iconButton:{
        width: 40,
        height: 30,
        elevation: 5
    },
    textNearBtnContainer:{
        paddingRight: 12
    },
    textNearBtn:{
        color: '#fff',
        fontSize: 15
    },
});

export default ActionButton;

