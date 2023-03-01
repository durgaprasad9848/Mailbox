import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : 'login and signup',
    initialState: {
        Login:true,
        isLogin:!!(localStorage.getItem('token')),
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
            localStorage.removeItem('email');
            localStorage.removeItem('token');
        }
    }

})

export const {change,setLogin,setLogout} = authSlice.actions;

export default authSlice.reducer;