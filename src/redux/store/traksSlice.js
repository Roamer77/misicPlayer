import { createSlice } from '@reduxjs/toolkit';

const  trackSlice=createSlice({
    name:'trackSlice',
    initialState:{currentTrack:null,allTracks:null,playerInstance:null,selectedTrackCurrentTime:0},
    reducers:{
        addCurrentTrack(state,action){
            state.currentTrack=action.payload;
        },
        addAllTracks(state,action){
          state.allTracks=action.payload;
        },
        addPlayerInstance(state,action){
           state.playerInstance=action.payload;
        },
        addSelectedTrackCurrentTime(state,action){
            state.selectedTrackCurrentTime=action.payload;
        }
    }
});

export const {addCurrentTrack,addAllTracks,addPlayerInstance,addSelectedTrackCurrentTime} = trackSlice.actions;
export default trackSlice.reducer;
