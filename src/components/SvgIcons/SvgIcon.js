import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Animated, View} from 'react-native';

const SvgIcon = ({opacity = 0.4, fill = '#0F1E36', width = 25, height = 21, fillOpacity = 0.5, style, d}) => {
    const AnimatedPath = Animated.createAnimatedComponent(Path);
    return (
        <View style={style}>
            <Svg width={width} height={height} viewBox="0 0 25 26" fill="none">
                {
                    d instanceof Array ? d.map((item,index) => {

                        return(
                            <AnimatedPath key={index} fillRule="evenodd" clipRule="evenodd" d={item.path} opacity={opacity} fill={fill}
                                  fillOpacity={fillOpacity}/>)}) :
                        <Path fillRule="evenodd" clipRule="evenodd" d={d} opacity={opacity} fill={fill}
                              fillOpacity={fillOpacity}/>
                }
            </Svg>
        </View>
    );
};
export default SvgIcon;
