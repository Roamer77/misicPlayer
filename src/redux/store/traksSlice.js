import { createSlice } from '@reduxjs/toolkit';

const  trackSlice=createSlice({
    name:'trackSlice',
    initialState:{currentTrack:null,allTracks:null,playerInstance:null,selectedTrackCurrentTime:0,isAnyTrackPlaying:false},
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
        },
        setIsAnyTrackPlaying(state,action){
            state.isAnyTrackPlaying=action.payload;
        }
    }
});

export const {addCurrentTrack,addAllTracks,addPlayerInstance,addSelectedTrackCurrentTime,setIsAnyTrackPlaying} = trackSlice.actions;
export default trackSlice.reducer;
