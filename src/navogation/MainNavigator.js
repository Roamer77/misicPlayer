import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SideMenuNavigator from "./DrawerNavigator";
import Tips from "../screens/Tips";

const Stack = createStackNavigator();

const  MainNavigator=()=> {
    return (
        <Stack.Navigator>
            {/*<Stack.Screen name="Tips" component={Tips} options={{headerShown:false}} />*/}
            <Stack.Screen name="Home" component={SideMenuNavigator} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}
export default MainNavigator;
