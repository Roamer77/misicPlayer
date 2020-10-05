import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import TrackItem from "../components/ListItems/TrackItem";

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
    }

];
const Home = () => {
    const [data, setData] = useState(DATA);
    const onDeletePress = (id) => {
        setData(data.filter((item) => item.id !== id));
        console.log('onDelete press ' + id)
    };

    return (
        <View style={{flex: 1}}>
            <View style={{paddingTop: 50}}>
                <FlatList data={data} keyExtractor={item => item.id.toString() + item.songName}
                          renderItem={({item}) => <TrackItem id={item.id} songName={item.songName} songAuthor={item.songAuthor}
                                                             onDeletePress={onDeletePress}/>}/>
            </View>
        </View>
    );
};
export default Home;
