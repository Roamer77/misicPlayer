import React, {useState} from 'react';
import {StyleSheet, View,Image, StatusBar, LayoutAnimation} from 'react-native';

import ViewPager from "@react-native-community/viewpager";
import ViewPagerIndicator from "../../components/ViewPagerIndicator";
import {useNavigation} from '@react-navigation/native';
import ActionButton from "../../components/SvgIcons/ActionButton";
import Message from "./Message";
import Tip1Image from '../../assets/tips/1.png';
import Tip2Image from '../../assets/tips/2.png';
import Tip3Image from '../../assets/tips/3.png';


const TipsImages = [Tip1Image, Tip2Image, Tip3Image];
const messageData = [
    {
        title: 'Listening',
        message: 'The artists we represent are one of the most successful in Romania and also were a huge breakthrough.',
    }, {
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

    const navigation = useNavigation();

    const handlePageSelected = (e) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCurrentPage(e.nativeEvent.position);
    };

    return (
        <View style={{backgroundColor: '#F51E38', flex: 1}}>

            <StatusBar backgroundColor={'#F51E38'}/>

            <ViewPager style={styles.viewPager} initialPage={0} onPageSelected={handlePageSelected}>
                {
                    TipsImages.map((item, index) => (
                        <View style={styles.page} key={index.toString()}>
                            <Image source={item} style={{width: imageSize, height: imageSize}}/>
                        </View>

                    ))
                }
            </ViewPager>

            <View style={{position: 'absolute', top: '52%', alignSelf: 'center', zIndex: 14}}>
                <ViewPagerIndicator amountOfDots={3} currentPage={currentPage} backgroundColor={'transparent'}
                                    indicatorSize={12}/>
            </View>
            {
                messageData.map((item, index) => (
                    currentPage === index ? <Message key={index} title={item.title} message={item.message}/> : null
                ))
            }
            <ActionButton onPress={() => navigation.navigate('Home')}/>
        </View>

    );
};
export default Tips;

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        backgroundColor: '#F51E38',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',

    },

});
