import {configureStore} from '@reduxjs/toolkit';
import trackReducer from './traksSlice';
export const store = configureStore({
    reducer: trackReducer,
});
