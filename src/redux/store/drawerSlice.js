import {createSlice} from "@reduxjs/toolkit";
import Animated from 'react-native-reanimated';
const drawerSlice=createSlice({
    name:'drawerSlice',
    initialState:{drawerProgress:new Animated.Value(0)},
    reducers:{
        addDrawerProgress(state,action){
            state.drawerProgress.setValue(action.payload);
        }
    }
});
export const {addDrawerProgress}= drawerSlice.actions;
export default drawerSlice.reducer;
