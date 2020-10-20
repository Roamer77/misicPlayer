import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    FlatList,
    LayoutAnimation,
    StatusBar,
    Dimensions,
    StyleSheet,

} from 'react-native';
import TrackItem from "../../components/ListItems/TrackItem";
import {block, Extrapolate, greaterThan, lessThan} from "react-native-reanimated";

import HorizontalScrollTrackItem from "../../components/ListItems/HorizontalScrollTrackItem";
import BackGround from "./HomeBackground";

import {toolBarHeight} from "../../constants/Constants";
import {LinearGradient} from "expo-linear-gradient";
import ReAnimated, {useCode, cond, call, round} from "react-native-reanimated";

import {
    pauseTrack,
    playTrack,
    startPlaying,
    setPlaybackStatusUpdate,
    getCurrentTrackDuration
} from "../../api/playerApi";

import {useDispatch, useSelector} from "react-redux";
import {addCurrentTrack, setIsAnyTrackPlaying, addSelectedTrackCurrentTime} from "../../redux/store/traksSlice";
import {useIsFocused} from '@react-navigation/native';
import Header from "./Header";
import TitleForTrackSections from "./TitleForTrackSections";
import {addLastListenedTrack} from "../../redux/store/userConfigSlice";
import {getLastListenedTrack, saveLastListenedTrack} from "../../storage/sorageAPI";


const HEADER_OPENED = 250;
const HEADER_CLOSED = 72;


const Home = ({drawerProgress}) => {



    let listOftecks = useSelector(state => state.trackReducer.allTracks);

    let temp = useSelector(state => state.trackReducer.currentTrack);

    const [allTracks, setAllTracks] = useState([]);

    const [isCurrentTrackPlaying, setCurrentTrackState] = useState(false);

    const [currentTrack, setCurrentTrack] = useState({});

    const statusBarThemes = ['light-content', 'dark-content'];

    const scrollY = new ReAnimated.Value(0);

    const triggerHeight = new ReAnimated.Value(180);

    const triggerLowHeight = new ReAnimated.Value(72);

    const dispatch = useDispatch();

    const isFocused = useIsFocused();

    const screenHeight = Dimensions.get('screen').height;

    const AnimList = ReAnimated.createAnimatedComponent(FlatList);

    const playbackStatusCallBack=(playbackStatus)=>{
        if (playbackStatus.isPlaying) {
            setCurrentTrackState(true);
            dispatch(setIsAnyTrackPlaying(true));
        } else {
            setCurrentTrackState(false);
            dispatch(setIsAnyTrackPlaying(false));
        }
        if (playbackStatus.positionMillis) {
            let progressInMilSec = playbackStatus.positionMillis;
            dispatch(addSelectedTrackCurrentTime(progressInMilSec));
        }
    };
    useEffect(()=>{
        getLastListenedTrack().then((track)=>{setCurrentTrack(track?track:{});console.log('track:',track)});
    },[]);
    useEffect(() => {
        if (isFocused && temp) {
            setCurrentTrack(temp);
        }
    }, [isFocused]);

    useEffect(() => {
        setAllTracks(listOftecks);
    }, [listOftecks]);

    useEffect(() => {
        dispatch(addCurrentTrack(currentTrack));
       // dispatch(addLastListenedTrack(currentTrack));
        setPlaybackStatusUpdate(playbackStatusCallBack);
    }, [currentTrack]);

    useCode(() => block([
        cond(greaterThan(triggerHeight, round(scrollY)),
            call([scrollY], (scrollY) => {
                StatusBar.setBarStyle(statusBarThemes[0])
            }),
        ),
        cond(lessThan(triggerLowHeight, round(scrollY)),
            call([scrollY], (scrollY) => {
                StatusBar.setBarStyle(statusBarThemes[1])
            })
        ),
    ]), [scrollY]);

    const headerDynamicHeight = ReAnimated.interpolate(scrollY, {
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputRange: [HEADER_OPENED, HEADER_CLOSED],
        extrapolate: Extrapolate.CLAMP,
    });

    const opacity = ReAnimated.interpolate(scrollY, {
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    const backgroundColor = ReAnimated.interpolateColors(scrollY, {
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputColorRange: ['rgb(255,0,0)', '#fff']
    });

    const menuBtnBackgroundColor = ReAnimated.interpolateColors(scrollY, {
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputColorRange: ['rgb(255,255,255)', 'rgb(0,0,0)']
    });

    const scale = ReAnimated.interpolate(drawerProgress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });


    const borderRadius = ReAnimated.interpolate(drawerProgress, {
        inputRange: [0, 1],
        outputRange: [0, 17],
    });


    const onScroll = ReAnimated.event([
        {
            nativeEvent: {
                contentOffset: {y: scrollY},
            }
        },
    ], {useNativeDriver: true});

    const scrollView = useRef(null);

    const onDeletePress = (id) => {
        const res = allTracks.filter((item) => item.id !== id);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAllTracks(res);
    };
    const saveAsLastListenedTrack=(item)=>{
        item.isLastListenedSong=true;
        saveLastListenedTrack(item);
    };
    const handleTrackListItemPress = (item) => {
        getCurrentTrackDuration().then(data => {
            item.durationInMillis = data;
            setCurrentTrack(item);
        });
        startPlaying(item.uri);
        saveAsLastListenedTrack(item);
    };

    const onMenuButtonPress = () => console.log('onMenuButtonPress');

    const pressPlay = () => {
        if(currentTrack.isLastListenedSong===true){
            ///тут баг из за этого даважды нужно включать трэк.
            let tmp={...currentTrack,isLastListenedSong:false};
            setCurrentTrack(tmp);
            startPlaying(currentTrack.uri);

        }else{
            isCurrentTrackPlaying ? pauseTrack() : playTrack()
        }

    };

    return (
        <>
            <BackGround/>
            <ReAnimated.View style={[{flex: 1, transform: [{scale: scale}], zIndex: 2}]}>
                <StatusBar backgroundColor={'transparent'} barStyle={statusBarThemes[0]} translucent={true}
                           animated={true}/>
                <ReAnimated.View style={{
                    width: '100%',
                    height: screenHeight,
                    backgroundColor: '#fff',
                    borderRadius: borderRadius,
                    elevation: 12
                }}>
                    <LinearGradient
                        colors={['transparent', 'rgba(255,245,231,0.05)', 'rgba(11,97,255,0.11)']}
                        style={style.gradientViewStyle}
                    />

                    <Header backgroundColor={backgroundColor}
                            opacity={opacity}
                            borderRadius={borderRadius}
                            headerDynamicHeight={headerDynamicHeight} onMenuButtonPress={onMenuButtonPress}
                            currentTrack={currentTrack} isPlying={isCurrentTrackPlaying}
                            menuBtnColor={menuBtnBackgroundColor}
                            pressPlay={pressPlay}/>


                    <AnimList data={allTracks}
                              ref={scrollView}
                              showsVerticalScrollIndicator={false}
                              onScroll={onScroll}
                              scrollEventThrottle={16}
                              ListHeaderComponent={() => (
                                  <View>
                                      <TitleForTrackSections text={'Featured Tracks'}/>

                                      <FlatList data={allTracks}
                                                contentContainerStyle={{paddingRight: 20}}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal={true}
                                                keyExtractor={item => item.id.toString()}
                                                renderItem={({item, index}) =>
                                                    <HorizontalScrollTrackItem
                                                        indexInItemList={index}
                                                        songName={item.songName}
                                                        image={item.image}
                                                        songAuthor={item.songAuthor}/>}/>

                                      <TitleForTrackSections text={'All Tracks'}/>
                                  </View>)}
                              contentContainerStyle={{
                                  paddingTop:HEADER_OPENED,
                                  paddingLeft: 20,
                                  paddingBottom: toolBarHeight + 20
                              }}
                              keyExtractor={item => item.id.toString()}
                              renderItem={({item, index}) => (
                                  <TrackItem id={item.id}
                                             index={index}
                                             songName={item.songName}
                                             songAuthor={item.songAuthor}
                                             songDuration={item.duration}
                                             image={item.image}
                                             onItemPress={() => handleTrackListItemPress({...item, index})}
                                             onDeletePress={onDeletePress}/>
                              )}/>


                </ReAnimated.View>

            </ReAnimated.View>
        </>
    );
};
export default Home;

const style = StyleSheet.create({


    gradientViewStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        borderRadius: 16,
        height: '100%',
    },

    featureTracks: {
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        overflow: "hidden",
        zIndex: 999,
        padding: 10,
        backgroundColor: "#F51E38"
    },
});
