import React from 'react';
import {Path,Svg} from 'react-native-svg';
import {View} from 'react-native';

const SvgIcon=({opacity=0.4, fill='#0F1E36',width=25,height=21,fillOpacity=0.5,style,d})=>{
    return(
        <View style={style}>
            <Svg width={width} height={height} viewBox="0 0 25 26" fill="none" >
                <Path fillRule="evenodd" clipRule="evenodd" d={d}  opacity={opacity} fill={fill} fillOpacity={fillOpacity}/>
            </Svg>
        </View>
    );
};
export default SvgIcon;
