import { createSlice } from "@reduxjs/toolkit";


const initialState={
    name:"",
    token:"",
    role:null,
    isAuthenticated:false,
    isAdmin:false,
    photo:"",
    id:""

}

export const userSlice = createSlice({
    name:"user",
   initialState,
    reducers:{
        login:(state,action)=>{
            state.name=action.payload.name;
            state.role=action.payload.role;
            state.id=action.payload.id;
            state.token=action.payload.token;
            state.photo=action.payload.photo;
            // state.isAuthenticated=true;
            if (state.role===1) {
                state.isAdmin = true
            }
            state.isAuthenticated = true
            
            // state.=action.payload;
        },
        logout:(state)=>{
            state.name=null;
            state.role=null;
            state.token=null;
            state.isAuthenticated=false;
                state.isAdmin = false
        },
        register:(state,action)=>{
            state.name=action.payload.name;
            state.photo=action.payload.photo;
            // state.name=action.payload.name;
            state.role=action.payload.role;
            state.token=action.payload.token;
        }
    },

})

export const {login,logout,register}  = userSlice.actions;

export const selectUser =(state)=>state.user.user;
export default userSlice.reducer