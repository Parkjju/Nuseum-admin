import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
};
const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
