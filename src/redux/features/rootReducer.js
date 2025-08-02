import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import notificationReducer from "./notificationSlice"

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    notification: notificationReducer
})

export default rootReducer;