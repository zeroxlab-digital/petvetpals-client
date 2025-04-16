import { configureStore } from "@reduxjs/toolkit"
import messageReducer from "../features/messageSlice";
import cartReducer from "../features/cartSlice";
import { appointmentApi } from "../services/appointmentApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { petApi } from "../services/petApi";
import { userApi } from "../services/userApi";

const store = configureStore({
    reducer: {
        cartRedu: cartReducer,
        messageRedu: messageReducer,
        [userApi.reducerPath]: userApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [petApi.reducerPath]: petApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        })
            .concat(userApi.middleware)
            .concat(appointmentApi.middleware)
            .concat(petApi.middleware)
})

setupListeners(store.dispatch)

export default store;