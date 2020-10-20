import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Home from "../screens/Home/Home";
import TV from "../screens/Tv";
import CurrentTrack from "../screens/CurrentTrack";
import Radio from "../screens/Radio";
import Notifications from "../screens/Notifications";
import ToolBar from "../components/ToolBer/ToolBar";

const Tab = createBottomTabNavigator();


const  TabNavigator=( {drawerProgress})=> {

    return (
        <Tab.Navigator tabBarOptions={{showLabel: false, style:{backgroundColor:'#111'}}}
                       tabBar={(props)=>(<ToolBar {...props} drawerProgress={drawerProgress}  />)}>
            <Tab.Screen  name="Home">{()=><Home drawerProgress={drawerProgress} />}</Tab.Screen>
            <Tab.Screen name="Tv" component={TV} options={{}}/>
            <Tab.Screen name="CurrentTrack" component={CurrentTrack} options={{
                tabBarVisible: false,}}/>
            <Tab.Screen name="Radio" component={Radio} options={{}}/>
            <Tab.Screen name="Notifications" component={Notifications} options={{}}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
