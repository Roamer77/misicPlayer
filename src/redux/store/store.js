import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import trackReducer from './traksSlice';
export const store = configureStore({
    reducer: trackReducer,
    middleware:getDefaultMiddleware({serializableCheck: false})
});
