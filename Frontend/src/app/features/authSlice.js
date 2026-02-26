import { createSlice } from "@reduxjs/toolkit";
// it is use to create a slice of the state, it takes an object with name, initialState and reducers. it returns an object with actions and reducer. actions are the functions that we can dispatch to update the state, reducer is the function that takes the current state and an action, and returns a new state based on the action type and payload. it is used to manage the authentication state of the user, it will store the user information, token and loading state.


const authSlice = createSlice({
    name : "auth", // this is the name of the slice, it will be used to identify the slice in the store and in the actions.
    initialState : { //` this is the initial state of the slice, it will be used to set the default values for the state when the application starts.
        user : null,
        token : null,
        loading : true,
    },
    reducers : { // this is an object that contains the reducer functions, each function takes the current state and an action, and returns a new state based on the action type and payload. it is used to update the state based on the actions dispatched.
        login : (state,action) => { // this is the reducer function for login action, it takes the current state and an action, and returns a new state with the user information and token from the action payload. it also sets the loading state to false.
            state.token = action.payload.token; // this is the token that we will use to authenticate the user in the backend, it will be stored in the local storage and sent in the headers of the requests to the backend.
            state.user = action.payload.user; // this is the user information that we will use to display the user name and other information in the frontend, it will be stored in the state and can be accessed using the useSelector hook in the components.
        },
        logout : (state)=>{
            state.token = null;
            state.user = null;
            localStorage.removeItem('token'); 
        },
        setLoading : (state,action)=>{
            state.loading = action.payload; //` this is the reducer function for setLoading action, it takes the current state and an action, and returns a new state with the loading state from the action payload. it is used to set the loading state when we are checking the authentication status of the user in the frontend, it will be set to true when we are checking and set to false when we have the result.
        }
    }
})

export const {login,logout,setLoading} = authSlice.actions;

export default authSlice.reducer;
