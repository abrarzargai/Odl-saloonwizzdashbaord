import {
    createSlice
} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: "cart",
    initialState: {
        isAuthFetching: false,
        authSuccess: false,
        authError: false,
        errMsg: '',
    },
    reducers: {
        // changing state of isAuthFetching
        getAuthStart: (state, action) => {
            console.log("started")
            state.isAuthFetching = true;
        },
        // ading data
        addData: (state, action) => {
            state.isAuthFetching = false;
            state.authSuccess = true;
            state.authError = false;
            console.log("In authSuccess")
        },
        // removing data
        removeUser: (state, action) => {
            console.log("inside remove user")
            state.isAuthFetching = false;
            state.authSuccess = false;
            state.authError = false;
            
        },
        // in case authError occurs
        getAuthError: (state, action) => {
            console.log("In authErrors")
            state.authSuccess = false;
            state.isAuthFetching = false;
            state.authError = true;
            state.errMsg = action.payload.message;
        },
    }
});

export const {
    addData,
    getAuthStart,
    getAuthError,
    removeUser
} = AuthSlice.actions;
export default AuthSlice.reducer;