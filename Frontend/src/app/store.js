import {configureStore} from "@reduxjs/toolkit"; // this is the new way to create a store in redux toolkit, it simplifies the process and provides better defaults
import authReducer from "./features/authSlice"; // this is the reducer for authentication, it will handle all the actions related to authentication and update the state accordingly


//reducer is a function that takes the current state and an action, and returns a new state. it is a pure function, meaning it does not mutate the state and does not have side effects. it is used to update the state based on the action dispatched.


export const store = configureStore({ // this is the main store for the application, it will hold all the state and reducers
    reducer :{
        auth : authReducer, // this is the reducer for authentication, it will handle all the actions related to authentication and update the state accordingly
    }
})
