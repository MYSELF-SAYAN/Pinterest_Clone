import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{
       user:"",
       email:"",
       password:"",
       isAuth:false},
    reducers:{
        logInUser:(state,action)=>{
            state.user=action.payload.user;
            state.email=action.payload.email;
            state.password=action.payload.password;
            state.isAuth=true;
            console.log("all state data",action.payload);
            console.log("state email is",state.email);
            console.log("state username is",state.user);
            console.log("Authenticated? ",state.isAuth)
        },
        logOutUser:(state,action)=>{
            state.user="";
            state.email="";
            state.password="";
            state.isAuth=false;
        },
    }
})
console.log(authSlice.actions);
export default authSlice.reducer;
export const {logInUser}=authSlice.actions;