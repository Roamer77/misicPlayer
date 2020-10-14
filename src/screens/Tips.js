import React, {useState,useEffect} from 'react';
import {StyleSheet, View, Text, Image, StatusBar, LayoutAnimation} from 'react-native';

import IconButton from "../components/Buttons/IconButton";
import ViewPager from "@react-native-community/viewpager";
import ViewPagerIndicator from "../components/ViewPagerIndicator";
import {useNavigation} from '@react-navigation/native';

const ActionButton = ({onPress}) => (
    <View style={{
        flexDirection: 'row-reverse',
        paddingLeft: '10%',
        alignItems: 'center',
        backgroundColor: "#F51E38",
        paddingBottom: '10%'
    }}>
        <IconButton backgroundColor={'#fff'} iconName={'arrow-right'} iconColor={'#F51E38'} onPress={onPress} styles={{width: 40, height: 30, elevation: 5}}/>
        <View style={{paddingRight: 12}}>
            <Text style={{color: '#fff', fontSize: 15}}>GET START</Text>
        </View>
    </View>
);
const Message = ({title,message}) => (
    <View  style={{
        justifyContent: 'center',
        paddingLeft: '10%',
        backgroundColor: '#F51E38',
        height:'35%',
    }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
    </View>
);

const messageData=[
    {
        title: 'Listening',
        message: 'The artists we represent are one of the most successful in Romania and also were a huge breakthrough.',
    },  {
        title: 'Watching ',
        message: 'The artists we represent are one of the most successful in Romania and also were a huge breakthrough.',
    },
    {
        title: 'Listening anytime, anywhere ',
        message: 'The artists we represent are one of the most successful in Romania and also were a huge breakthrough.',
    }];

const Tips = ({animStyle}) => {
    const imageSize = 300;
    const [currentPage, setCurrentPage] = useState(0);
    const navigation =useNavigation();
    const handlePageSelected = (e) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCurrentPage(e.nativeEvent.position);
    };

    return (
        <View style={{backgroundColor: '#F51E38',flex:1}}>
            <StatusBar backgroundColor={'#F51E38'}/>
            <ViewPager style={styles.viewPager} initialPage={0} onPageSelected={handlePageSelected}>
                <View style={styles.page} key="1">
                    <Image source={require('../assets/tips/1.png')} style={{width: imageSize, height: imageSize}}/>
                </View>
                <View style={styles.page} key="2">
                    <Image source={require('../assets/tips/2.png')} style={{width: imageSize, height: imageSize}}/>
                </View>
                <View style={styles.page} key="3">
                    <Image source={require('../assets/tips/3.png')} style={{width: imageSize, height: imageSize}}/>
                </View>
            </ViewPager>
            <View style={{position:'absolute',top:'52%',alignSelf:'center',zIndex:14}}>
                <ViewPagerIndicator amountOfDots={3} currentPage={currentPage} backgroundColor={'transparent'} indicatorSize={12}/>
            </View>
            {
                messageData.map((item,index)=>(currentPage===index? <Message key={index} title={item.title} message={item.message}/>:null ))
            }
            <ActionButton onPress={()=>navigation.navigate('Home')}/>
        </View>

    );
};
export default Tips;

const styles = StyleSheet.create({
    viewPager: {
        flex:1,
        backgroundColor: '#F51E38',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    message: {
        paddingTop:15,
        color: '#fff',
        fontSize: 16,
    }
});
