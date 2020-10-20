import {createSlice} from '@reduxjs/toolkit';
import {getLastListenedTrack, saveLastListenedTrack} from "../../storage/sorageAPI";

const userConfigSlice=createSlice({
    name:'userConfigSlice',
    initialState:{ lastListenedTrack:null},
    reducers:{
        addLastListenedTrack(state,actions){
            state.lastListenedTrack=actions.payload;
            saveLastListenedTrack(actions.payload);
        },
        getLastListenedTrackFromStorage(state,actions){
            getLastListenedTrack().then((track)=>{
                state.initialState=track;
            });
        }
    }
});
export const {addLastListenedTrack,getLastListenedTrackFromStorage} =userConfigSlice.actions;
export default userConfigSlice.reducer;
