import {configureStore,getDefaultMiddleware,combineReducers} from '@reduxjs/toolkit';
import trackReducer from './traksSlice';
import drawerReducer from './drawerSlice';
import userConfigSlice from './userConfigSlice';
export const store = configureStore({
    reducer: {trackReducer:trackReducer,drawerReducer:drawerReducer,userConfigReducer:userConfigSlice} ,
    middleware:getDefaultMiddleware({serializableCheck: false})
});
