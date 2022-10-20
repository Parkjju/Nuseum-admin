import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import dateSlice from './date-slice';
import groupSlice from './group-slice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        date: dateSlice,
        group: groupSlice,
    },
});

export default store;
