import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
};
const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
