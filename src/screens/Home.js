import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    LayoutAnimation,
    Animated,
    StatusBar,
    Pressable,
    Dimensions,
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native';
import TrackItem from "../components/ListItems/TrackItem";
import {block, Extrapolate, greaterThan, lessThan} from "react-native-reanimated";
import {burgerMenu} from '../components/SvgIcons/listOfIconsPathes';
import HorizontalScrollTrackItem from "../components/ListItems/HorizontalScrollTrackItem";
import { Feather } from '@expo/vector-icons';
import SvgIcon from "../components/SvgIcons/SvgIcon";
import Button from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";
import {toolBarHeight} from "../constants/Constants";
import {LinearGradient} from "expo-linear-gradient";
import ReAnimated, {useCode, cond, call, round} from "react-native-reanimated";

import {pauseTrack, playTrack, startPlaying, setPlaybackStatusUpdate, getCurrentTrackDuration} from "../api/playerApi";
import {songNameRepresentation} from "../api/textTransformations";
import {useDispatch, useSelector} from "react-redux";
import {addCurrentTrack,setIsAnyTrackPlaying,addSelectedTrackCurrentTime} from "../redux/store/traksSlice";
import {useIsFocused} from '@react-navigation/native';

const TitleForTrackSections = ({text}) => (
    <View>
        <Text style={style.titleForTrackSections}>{text}</Text>
    </View>
);

const HEADER_OPENED = 250;
const HEADER_CLOSED = 72;


const ListHeader = ({onMenuButtonPress, headerDynamicHeight, backgroundColor, borderRadius, opacity, pressPlay,currentTrack,isPlying,menuBtnColor}) => {
    const {image,songName,songAuthor}=currentTrack;
    const AnimatedIcon=ReAnimated.createAnimatedComponent(Feather);
    return (
        <ReAnimated.View
            style={[style.header, {
                height: headerDynamicHeight,
                backgroundColor: backgroundColor,
                borderRadius: borderRadius
            }]}>
            <Pressable onPress={onMenuButtonPress} style={style.menuBtn}>
                <AnimatedIcon name="menu" size={27} style={{color:menuBtnColor}} />
            </Pressable>
            <ReAnimated.View style={{opacity: opacity, borderRadius: borderRadius}}>
                <Image source={image?image:require('../assets/Rectangle.png')}
                       style={{width: '100%', height: '100%'}}/>

                <View style={{position:'absolute',left:0,width:'100%',bottom:20,zIndex:12,opacity:1}}>
                    {songName&&<View style={{justifyContent: 'center', flex: 1, paddingLeft: 20,paddingRight:20, paddingTop: 40}}>
                        <Text style={[{color: '#fff'},style.headerBackgroundTextStyle]}>// TRENDING</Text>
                        <Text style={[{
                            color: '#fff',
                            fontSize: 25,
                            textDecorationColor:'#111',
                            fontWeight: 'bold'
                        },style.headerBackgroundTextStyle]}>{ songNameRepresentation(songName,27) }</Text>
                        <Text style={{color: '#fff', fontSize: 18}}>{songAuthor}</Text>
                    </View>}
                    <View style={{flexDirection: 'row', marginBottom: 10,paddingTop:20,}}>
                        <Button styles={{marginLeft: 20}} backgroundColor={'#fff'} text={isPlying?'PAUSE':'PLAY'}
                                onPress={pressPlay} textColor={'#F51E38'}/>
                        <IconButton styles={{marginLeft: 10}} iconName={'share-2'} iconColor={'#F51E38'}
                                    backgroundColor={'#fff'}/>
                    </View>
                </View>

            </ReAnimated.View>
        </ReAnimated.View>
    );
};
const BackGround = () => (
    <Animated.View style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F51E38',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1}}/>
    );

const Home = ({drawerProgress}) => {
    let listOftecks=useSelector(state=>state.trackReducer.allTracks);
    let temp=useSelector(state=>state.trackReducer.currentTrack);
    const [allTracks, setAllTracks] = useState([]);
    const [isCurrentTrackPlaying,setCurrentTrackState]=useState(false);

    const [currentTrack, setCurrentTrack] = useState({});

    const statusBarThemes = ['light-content', 'dark-content'];
    const scrollY = new ReAnimated.Value(0);

    const triggerHeight = new ReAnimated.Value(180);
    const triggerLowHeight = new ReAnimated.Value(72);

    const dispatch= useDispatch();

    const isFocused=useIsFocused();

    useEffect(()=>{
       if(isFocused && temp){
          setCurrentTrack(temp);
       }
    },[isFocused]);
    useEffect(() => {
        setAllTracks(listOftecks);
    },[listOftecks]);

    useEffect(()=>{
        dispatch(addCurrentTrack(currentTrack));
        setPlaybackStatusUpdate(playbackStatus => {
           if(playbackStatus.isPlaying) {
               setCurrentTrackState(true) ;
               dispatch(setIsAnyTrackPlaying(true));
           }else{
               setCurrentTrackState(false);
               dispatch(setIsAnyTrackPlaying(false));
           }

            if (playbackStatus.progressUpdateIntervalMillis) {

            }
            if (playbackStatus.positionMillis) {
                let progressInMilSec=playbackStatus.positionMillis;
                    dispatch(addSelectedTrackCurrentTime(progressInMilSec));
            }
        });
    },[currentTrack]);

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
        outputColorRange: [ 'rgb(255,255,255)','rgb(0,0,0)']
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
    const handleTrackListItemPress=(item)=>{
          getCurrentTrackDuration().then(data=>{
              item.durationInMillis=data;
              setCurrentTrack(item);
          });
          startPlaying(item.uri)
    };
    const onMenuButtonPress = () => console.log('onMenuButtonPress');
    const pressPlay = () => {isCurrentTrackPlaying ? pauseTrack():playTrack()};
    const screenHeight = Dimensions.get('screen').height;

    const AnimList = ReAnimated.createAnimatedComponent(FlatList);
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
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            borderRadius: 16,
                            height: '100%',
                        }}
                    />

                    <ListHeader backgroundColor={backgroundColor} opacity={opacity} borderRadius={borderRadius}
                                headerDynamicHeight={headerDynamicHeight} onMenuButtonPress={onMenuButtonPress}
                                currentTrack={currentTrack} isPlying={isCurrentTrackPlaying}
                                menuBtnColor={menuBtnBackgroundColor}
                                pressPlay={pressPlay}/>


                    <AnimList data={allTracks}
                              ref={scrollView}
                              showsVerticalScrollIndicator={false}
                              onScroll={onScroll}
                              scrollEventThrottle={16}
                              ListHeaderComponent={()=>(
                                  <View>
                                      <TitleForTrackSections text={'Featured Tracks'}/>
                                      <FlatList data={allTracks}
                                                contentContainerStyle={{paddingRight:20}}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal={true}
                                                keyExtractor={item =>item.id.toString()}
                                                renderItem={({item, index}) =>
                                                    <HorizontalScrollTrackItem
                                                    indexInItemList={index}
                                                    songName={item.songName}
                                                    image={item.image}
                                                    songAuthor={item.songAuthor}/>}/>
                                      <TitleForTrackSections text={'All Tracks'}/>
                                  </View>) }
                              contentContainerStyle={{
                                  paddingTop: HEADER_OPENED,
                                  paddingLeft: 20,
                                  paddingBottom: toolBarHeight + 10
                              }}
                              keyExtractor={item => item.id.toString()}
                              renderItem={({item, index}) => (
                                  <TrackItem id={item.id}
                                             index={index}
                                             songName={item.songName}
                                             songAuthor={item.songAuthor}
                                             songDuration={item.duration}
                                             image={item.image}
                                             onItemPress={()=>handleTrackListItemPress({...item,index})}
                                             onDeletePress={onDeletePress}/>
                                             )}/>


                </ReAnimated.View>

            </ReAnimated.View>
        </>
    );
};
export default Home;

const style = StyleSheet.create({
    titleForTrackSections: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 12,
        paddingTop: 20
    },
    headerBackgroundTextStyle:{
        backgroundColor:'rgba(17,17,17,0.74)'
    },
    menuBtn: {
        position: 'absolute', top: 30, left: 18, zIndex: 20
    },
    header: {
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        overflow: "hidden",
        zIndex: 999,
        backgroundColor: "#F51E38"
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
