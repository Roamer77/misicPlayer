import {configureStore} from '@reduxjs/toolkit';
import {drawerSlice} from '../reducers/drawerReducer';
export const store = configureStore({
    reducer: drawerSlice.reducer
});
