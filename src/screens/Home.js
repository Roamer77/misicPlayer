import React, {useState, useRef} from 'react';
import {View, Text, FlatList, LayoutAnimation, Animated, Image, StyleSheet} from 'react-native';
import TrackItem from "../components/ListItems/TrackItem";
import {Extrapolate} from "react-native-reanimated";
import SvgIcon from "../components/SvgIcons/SvgIcon";
import {burgerMenu} from '../components/SvgIcons/listOfIconsPathes';

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
const HEADER_OPENED = 150;
const HEADER_CLOSED = 52;
const Home = () => {
    const [data, setData] = useState(DATA);
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerDynamicHeight = scrollY.interpolate({
        inputRange: [0, HEADER_OPENED - HEADER_CLOSED],
        outputRange: [HEADER_CLOSED, HEADER_OPENED],
        extrapolate: Extrapolate.CLAMP,
    });
    const onScroll = Animated.event([
        {nativeEvent: {contentOffset: {y: scrollY}}},
    ]);

    const onDeletePress = (id) => {
        const res = data.filter((item) => item.id !== id);

        LayoutAnimation.configureNext(CustomLayoutSpring);
        setData(res);
        console.log('onDelete press ' + id);

    };

    return (
        <View style={{flex: 1}}>
            <Animated.View
                style={[style.header, {height: headerDynamicHeight,}]}>
            </Animated.View>
            <View style={{paddingTop: 50}}>
                <FlatList data={data} onScroll={onScroll} keyExtractor={item => item.id.toString() + item.songName}
                          renderItem={({item}) => <TrackItem id={item.id} songName={item.songName}
                                                             songAuthor={item.songAuthor}
                                                             onDeletePress={onDeletePress}/>}/>
            </View>
        </View>
    );
};
export default Home;

const style = StyleSheet.create({
    header: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 20,
        width: "100%",
        overflow: "hidden",
        zIndex: 999,
        borderBottomColor: "#F51E38",
        borderBottomWidth: 2,
        padding: 10,
        backgroundColor: "#F51E38"
    },
});
