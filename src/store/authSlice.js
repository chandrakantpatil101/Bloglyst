import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isloggedIn : false,
    userData : null
}

const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isloggedIn = true,
            state.userData = action.payload;
        },
        logout:(state)=>{
            state.isloggedIn = false,
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer