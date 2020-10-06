import React, {useState, useRef,useEffect} from 'react';
import {View, Text, FlatList, LayoutAnimation, Animated, Pressable, StyleSheet,ScrollView,ImageBackground} from 'react-native';
import TrackItem from "../components/ListItems/TrackItem";
import {Extrapolate} from "react-native-reanimated";
import {burgerMenu} from '../components/SvgIcons/listOfIconsPathes';
import HorizontalScrollTrackItem from "../components/ListItems/HorizontalScrollTrackItem";
import {Path, Svg} from "react-native-svg";
import SvgIcon from "../components/SvgIcons/SvgIcon";
import Button from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";




const DATA = [
    {
        id: 1,
        songName: 'song 1',
        songAuthor: 'author 1',
    },
    {
        id: 2,
        songName: 'song 2',
        songAuthor: 'author 2',
    },
    {
        id: 3,
        songName: 'song 3',
        songAuthor: 'author 3',
    },
    {
        id: 4,
        songName: 'song 4',
        songAuthor: 'author 4',
    },
    {
        id: 5,
        songName: 'song 5',
        songAuthor: 'author ',
    },
    {
        id: 6,
        songName: 'song 5',
        songAuthor: 'author ',
    },
    {
        id: 7,
        songName: 'song 5',
        songAuthor: 'author ',
    },
    {
        id: 8,
        songName: 'song 5',
        songAuthor: 'author ',
    }

];
const TitleForTrackSections = ({text}) => (<View>
    <Text style={style.titleForTrackSections}>{text}</Text>
</View>);
const CustomLayoutSpring = {
    duration: 400,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
    },
};

const toolBarMenuColors=['#fff','#111'];
const HEADER_OPENED = 250;
const HEADER_CLOSED = 72;
const Home = () => {
    const [data, setData] = useState(DATA);
    const [currentMenuBtnColor, setCurrentMenuBtnColor] = useState(toolBarMenuColors[0]);
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerDynamicHeight = scrollY.interpolate({
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputRange: [HEADER_OPENED, HEADER_CLOSED],
        extrapolate: Extrapolate.CLAMP,
    });
    const opacity=scrollY.interpolate({
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });
    const backgroundColor = scrollY.interpolate({
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputRange: ['rgba(255, 0, 0, 1)', 'rgb(255,255,255)'],
        extrapolate: Extrapolate.CLAMP,
    });
    const menuBtnColor = scrollY.interpolate({
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputRange: ['rgb(255,255,255)','rgb(0,0,0)'],
        extrapolate: Extrapolate.CLAMP,
    });


    const onScroll = Animated.event([
        {nativeEvent: {contentOffset: {y: scrollY}}},
    ], {useNativeDriver: false});
    const scrollView=useRef(null);
    const onDeletePress = (id) => {
        const res = data.filter((item) => item.id !== id);
        LayoutAnimation.configureNext(CustomLayoutSpring);
        setData(res);
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        scrollView.current.scrollToEnd();
    };
    const onMenuButtonPress=()=> console.log('onMenuButtonPress');
    return (
        <View style={{flex: 1}} >
            <Animated.View
                style={[style.header, {height: headerDynamicHeight, backgroundColor: backgroundColor} ]}>
                <Pressable onPress={onMenuButtonPress} style={style.menuBtn}>
                    <SvgIcon opacity={1} width={29} height={27} fill={menuBtnColor} fillOpacity={1} d={burgerMenu} style={{paddingTop:30,paddingLeft:10}}/>
                </Pressable>
                <Animated.View style={{opacity:opacity}}>
                   <ImageBackground source={require('../assets/Rectangle.png')} style={{width:'100%',height:'100%'}}>
                    <View style={{justifyContent:'center',flex:1,paddingLeft:20}}>
                        <Text style ={{color:'#fff'}}>// TRENGING</Text>
                        <Text style={{color:'#fff',fontSize: 25, fontWeight: 'bold'}}>{'Akcent feat Lidia \n Buble...'}</Text>
                        <Text style={{color:'#fff',fontSize: 18}}>- Kamelia</Text>
                    </View>
                       <View style={{flexDirection:'row',marginBottom:10}}>
                           <Button styles={{marginLeft:20}} backgroundColor={'#fff'} text={'PLAY'} onPress={()=>{}} textColor={'#F51E38'} />
                           <IconButton styles={{marginLeft:10}} textColor={'#F51E38'} backgroundColor={'#fff'}/>
                       </View>
                   </ImageBackground>
               </Animated.View>
            </Animated.View>
            <ScrollView  ref={scrollView}
                         onScroll={onScroll}
                         showsVerticalScrollIndicator={false}>

                <View style={{paddingTop: 280, flex: 1,height:'50%'}}>

                    <View style={{ paddingLeft: 20}}>
                        <TitleForTrackSections text={'Featured Tracks'}/>
                        <FlatList data={DATA}
                                  showsHorizontalScrollIndicator={false}
                                  horizontal={true}
                                  keyExtractor={item => item.id.toString() + item.songName}
                                  renderItem={({item, index}) => <HorizontalScrollTrackItem indexInItemList={index}
                                                                                            songName={item.songName}
                                                                                            songAuthor={item.songAuthor}/>}/>
                    </View>
                    <View style={{flex: 1, marginTop: 20, paddingLeft: 20}}>
                        <TitleForTrackSections text={'Top Tracks'}/>
                        {
                           /* data.map((item, index)=>(
                                <TrackItem key={index} id={item.id} index={index}
                                           songName={item.songName}
                                           songAuthor={item.songAuthor}
                                           onDeletePress={onDeletePress}/>
                            ))*/
                        }
                          <FlatList data={data} onScroll={onScroll}
                              keyExtractor={item => item.id.toString() + item.songName}
                              renderItem={({item, index}) => <TrackItem id={item.id} index={index}
                                                                        songName={item.songName}
                                                                        songAuthor={item.songAuthor}
                                                                        onDeletePress={onDeletePress}/>}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default Home;

const style = StyleSheet.create({
    titleForTrackSections: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 12
    },
    menuBtn:{
        position:'absolute',top:10,left:10,zIndex:20
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
