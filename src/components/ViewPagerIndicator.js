import React from 'react';
import {View} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const getIndexArray=(amountOfDots)=>{
    const array=[];
    for(let i=0;i<amountOfDots;i++){
        array.push(i);
    }
    return array;
};

const ViewPagerIndicator=({amountOfDots=0,currentPage,backgroundColor,indicatorSize=15})=>{
    const dots=getIndexArray(amountOfDots);
    return(
        <View style={{flexDirection:'row',justifyContent:'center',backgroundColor:backgroundColor}}>
            {
                dots.map((item)=>(currentPage===item?
                        <FontAwesome key={item} name="circle" size={indicatorSize} color="#fff" style={{marginLeft:12}}/>
                        :
                        <FontAwesome key={item} name="circle-o" size={indicatorSize} color="#fff" style={{marginLeft:12}} />
                ))
            }
        </View>
    );
};

export default ViewPagerIndicator;
