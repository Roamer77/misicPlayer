import {createSlice} from '@reduxjs/toolkit';

const initState={
    progress:null,
};
export const drawerSlice=createSlice({
    name:'drawerSlice',
    initialState:initState,
    reducers:{
        changeProgress(state, action) {
            const { progress } = action.payload;
            state.push({ progress })
        },
    }
});


