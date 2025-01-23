import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../features/userSlice";

const store = configureStore({
    reducer: {
        userRedu: userSlice,
    }
})

export default store;