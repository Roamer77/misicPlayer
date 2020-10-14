import { createSlice } from '@reduxjs/toolkit';

const  trackSlice=createSlice({
    name:'trackSlice',
    initialState:{currentTrack:null},
    reducers:{
        addCurrentTrack(state,action){
            state.currentTrack=action.payload;
        }
    }
});

export const {addCurrentTrack} = trackSlice.actions;
export default trackSlice.reducer;
