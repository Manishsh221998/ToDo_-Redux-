import { configureStore } from "@reduxjs/toolkit";
import formReducer from '../formSlice/formSlice'
 export const store=configureStore({
    reducer:{
        form:formReducer
     }
 })

 export default store