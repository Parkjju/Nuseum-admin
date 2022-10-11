import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import dateSlice from './date-slice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        date: dateSlice,
    },
});

export default store;
