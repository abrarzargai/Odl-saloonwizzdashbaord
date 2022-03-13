import {
    createSlice
} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: "cart",
    initialState: {
        isAuthFetching: false,
        authSuccess: false,
        authError: false,
        LoginSuccess: false,
        LoginError: false,
        Role:'user',
        userRole:false,
        adminRole:false,
        User:null,
        errMsg: '',
        Login:false
    },
    reducers: {
        // changing state of isAuthFetching
        getAuthStart: (state, action) => {
            
            state.isAuthFetching = true;
        },
        // ading data
        signup: (state, action) => {
           
            state.isAuthFetching = false;
            state.authSuccess = true;
            state.authError = false;
           
        },
        login: (state, action) => {
            console.log("slice===>",action.payload.User)
            if (action.payload.User.Role === 'admin'){
                state.userRole = false
                state.adminRole = true
                console.log("admin===>", action.payload.User.Role)
            }
            else{
                state.userRole = true
                state.adminRole = false
                console.log("user===>", action.payload.User.Role)
            }
            state.User =  action.payload.User
            state.isAuthFetching = false;
            state.authSuccess = true;
            state.authError = false;
            state.Login = true;

        },
        // removing data
        removeUser: (state, action) => {
            state.Login = false;
            state.isAuthFetching = false;
            state.authSuccess = false;
            state.authError = false;
            
        },
        // in case authError occurs
        getAuthError: (state, action) => {
            // state.LoginError= 'invalid Credentials',
            state.authSuccess = false;
            state.isAuthFetching = false;
            state.authError = true;
            state.errMsg = action.payload.message;
        },
        LoginErrorHandler: (state, action) => {
            // state.LoginError= 'invalid Credentials',
            state.LoginError = "invalid Credentials";
            state.isAuthFetching = false;
        },
    }
});

export const {
    addData,
    getAuthStart,
    getAuthError,
    login,
    signup,
    removeUser,
    LoginErrorHandler
} = AuthSlice.actions;
export default AuthSlice.reducer;