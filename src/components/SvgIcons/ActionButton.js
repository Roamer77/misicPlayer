import React, {useEffect, useRef, useState} from 'react';
import {Path, Svg} from 'react-native-svg';
import {View, Animated, LayoutAnimation} from 'react-native';
import {useSelector} from "react-redux";
import CircleTrackProgress from "../CircleTrackProgress";

const Rocket = () => (<Path fill-rule="evenodd" clip-rule="evenodd"
                            d="M32.3799 42.0899C31.9395 42.0907 31.517 41.9153 31.2066 41.6028L30.0333 40.4295C29.7174 40.159 29.5798 39.7343 29.6771 39.3299C29.7743 38.9256 30.0901 38.6098 30.4944 38.5126C30.8988 38.4153 31.3235 38.5529 31.594 38.8688L32.3799 39.6547L32.7673 39.2673C32.8508 39.1832 32.9051 39.0746 32.9223 38.9573L33.5754 34.3969C33.6447 33.9227 33.8661 33.4838 34.2063 33.1462L36.9624 30.39C38.8374 28.5277 39.8897 25.9928 39.8846 23.3501V21.2138H37.7483C35.1057 21.2088 32.5708 22.261 30.7085 24.136L27.9523 26.8922C27.6147 27.2324 27.1758 27.4538 26.7015 27.5231L22.1301 28.1762C22.0128 28.1933 21.9042 28.2477 21.8201 28.3312L21.4327 28.7186L22.2186 29.5045C22.5345 29.775 22.6721 30.1997 22.5748 30.6041C22.4776 31.0084 22.1619 31.3241 21.7575 31.4214C21.3532 31.5187 20.9284 31.3811 20.6579 31.0652L19.4846 29.8919C18.8372 29.2437 18.8372 28.1935 19.4846 27.5453L20.2705 26.7594C20.6927 26.3364 21.24 26.0608 21.8312 25.9735L26.4027 25.3204L29.1588 22.5643C31.4382 20.2738 34.5391 18.9904 37.7705 19.0001H40.9915C41.6029 19.0001 42.0984 19.4956 42.0984 20.1069V23.3501C42.1081 26.5815 40.8247 29.6824 38.5342 31.9618L35.7781 34.7179L35.125 39.2894C35.0377 39.8806 34.7621 40.428 34.3391 40.8501L33.5532 41.636C33.2374 41.9364 32.8156 42.0995 32.3799 42.0899ZM26.9 38.8688L28.4607 37.3081C28.8368 36.8689 28.8115 36.2143 28.4027 35.8054C27.9938 35.3966 27.3392 35.3713 26.9 35.7474L25.3393 37.3081C25.0234 37.5786 24.8858 38.0034 24.9831 38.4077C25.0803 38.8121 25.396 39.1278 25.8004 39.225C26.2047 39.3223 26.6295 39.1847 26.9 38.8688ZM22.2079 37.308L25.3404 34.1755C25.7165 33.7364 25.6912 33.0817 25.2824 32.6728C24.8735 32.264 24.2189 32.2387 23.7797 32.6148L20.6472 35.7473C20.3313 36.0178 20.1937 36.4426 20.291 36.8469C20.3882 37.2513 20.7039 37.567 21.1083 37.6642C21.5126 37.7615 21.9374 37.6239 22.2079 37.308ZM36.2983 29.4824C37.5931 28.1859 37.5931 26.0856 36.2983 24.7891C36.0277 24.4733 35.603 24.3357 35.1986 24.4329C34.7943 24.5302 34.4786 24.8459 34.3813 25.2503C34.2841 25.6546 34.4217 26.0794 34.7375 26.3499C34.9471 26.5577 35.065 26.8406 35.065 27.1358C35.065 27.4309 34.9471 27.7138 34.7375 27.9217C34.3058 28.3508 33.6085 28.3508 33.1768 27.9217C32.9673 27.7138 32.8494 27.4309 32.8494 27.1358C32.8494 26.8406 32.9673 26.5577 33.1768 26.3499C33.5529 25.9107 33.5276 25.256 33.1188 24.8472C32.7099 24.4383 32.0553 24.4131 31.6161 24.7891C30.7277 25.617 30.362 26.8637 30.6625 28.0403C30.9629 29.2168 31.8817 30.1355 33.0582 30.436C34.2348 30.7365 35.4815 30.3708 36.3093 29.4824H36.2983Z"
                            fill="white"/>);
const Note = () => (<Path opacity="1" fill-rule="evenodd" clip-rule="evenodd" y={20} x={20}
                          d="M4.8623 25C4.33526 24.9993 3.81037 24.941 3.29983 24.8263C1.40092 24.2829 0.0859548 22.7644 0 21.0158C0 17.7876 3.81288 16.9295 5.83009 16.9295C6.47407 16.9295 6.99611 17.3868 6.99611 17.951C6.99611 18.5153 6.47407 18.9726 5.83009 18.9726C5.69017 18.9726 2.33204 18.9726 2.33204 21.0158C2.43299 21.8184 3.02192 22.5103 3.87118 22.824C5.13923 23.1008 6.48203 22.8398 7.4975 22.1191C8.65411 21.3276 9.33301 20.1154 9.33981 18.8296V4.13918C9.35244 2.81711 10.0258 1.56631 11.1821 0.716857C12.016 0.103945 13.128 -0.133956 14.1904 0.0732567C17.1871 0.675994 21 4.34349 21 7.60236C20.8812 9.29463 19.7505 10.8059 18.0267 11.5763C17.4503 11.8302 16.7481 11.6267 16.4584 11.1217C16.1686 10.6168 16.4009 10.0016 16.9772 9.74769V9.74769C17.9143 9.3196 18.5477 8.512 18.668 7.59214C18.668 5.25271 15.543 2.4842 13.6657 2.05514C13.2986 1.98748 12.9167 2.07872 12.6396 2.30032C12.0382 2.75937 11.6866 3.42 11.6718 4.11874V18.8092C11.6654 20.7231 10.6604 22.5295 8.94336 23.7128C7.78739 24.5325 6.34933 24.986 4.8623 25Z"
                          fill="white"/>);

const Background = () => (<Svg width="62" height="62" viewBox="0 0 62 62" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd"
          d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62Z"
          fill="#3E2AD1"/>
</Svg>);
const CustomLayoutSpring = {
    duration: 200,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    },
    delete:{
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    }
};
const ActionButton = () => {
    const isAnyTrackPlaying = useSelector(state => state.trackReducer.isAnyTrackPlaying);
    const trackProgress = useSelector(state => state.trackReducer.selectedTrackCurrentTime);
    const [flag, setFlag] = useState(true);
    const anim = useRef(new Animated.Value(1));

    const animatedStart = () => {
        return Animated.loop(
            Animated.sequence([
                Animated.timing(anim.current, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.current, {
                    toValue: 0.8,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ])
        )
    };
    useEffect(() => {
        if (isAnyTrackPlaying) {
            animatedStart().start();
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setFlag(false);

        } else {
            animatedStart().stop();
            //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setFlag(true);
        }
    }, [isAnyTrackPlaying]);
   // useEffect(()=>  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring),[flag]);

    return (
        <View>
            <CircleTrackProgress style={{position: 'absolute', right: -2.4, bottom: -2.5}} tintColor={'#ff9550'}
                                 width={68} progress={new Animated.Value(trackProgress * 0.000005)}/>
            <Background/>

               { flag && <Animated.View
                        style={{position: 'absolute',}}>
                        <Svg width="62" height="62">
                            <Rocket/>
                        </Svg>
                    </Animated.View>}
               { !flag &&  <Animated.View style={{position: 'absolute', transform: [{scale: anim.current}]}}>
                        <Svg width="62" height="62">
                            <Note/>
                        </Svg>
                    </Animated.View>}

        </View>

    );
};
export default ActionButton;
