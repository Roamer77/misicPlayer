import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SideMenuNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={SideMenuNavigator} />
        </Stack.Navigator>
    );
}
export default MyStack();
