import {configureStore,getDefaultMiddleware,combineReducers} from '@reduxjs/toolkit';
import trackReducer from './traksSlice';
import drawerReducer from './drawerSlice';
export const store = configureStore({
    reducer: {trackReducer:trackReducer,drawerReducer:drawerReducer} ,
    middleware:getDefaultMiddleware({serializableCheck: false})
});
