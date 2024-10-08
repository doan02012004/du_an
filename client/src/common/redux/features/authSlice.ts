import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: "auth",
    initialState: {
        // accessToken:'',
        login: {
            currentUser: null ,
            isFetching: false,
            error: false
        },
        register:{
            isFetching: false,
            error: false,
            success:false
        }
    },
    reducers: {
        // setAccessToken: (state, action) => {
        //     state.accessToken = action.payload;
        // },
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload;
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.success = true;
            state.register.error = false
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
            state.register.success = false;

        }
    }
})
export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess,
    // setAccessToken
} = authSlice.actions

export default authSlice.reducer