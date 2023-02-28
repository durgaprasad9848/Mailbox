import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : 'login and signup',
    initialState: {
        Login:true,
        isLogin:false,
    },
    reducers: {
        change: (state)=>{
            state.Login=!state.Login;
        },
        setLogin : (state,action)=>{
            state.isLogin = !state.isLogin;
        },
        setLogout : (state,action)=>{
            state.isLogin = !state.isLogin;
        }
    }

})

export const {change,setLogin,setLogout} = authSlice.actions;

export default authSlice.reducer;