import { configureStore } from "@reduxjs/toolkit"
import messageReducer from "../features/messageSlice";
import cartReducer from "../features/cartSlice";
import notificationReducer from "../features/notificationSlice";
import { appointmentApi } from "../services/appointmentApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { petApi } from "../services/petApi";
import { userApi } from "../services/userApi";
import { symptomApi } from "../services/symptomApi";
import { nutritionistApi } from "../services/NutritionistApi";
import { allergyCoachApi } from "../services/allergyCoachApi";
import { vetApi } from "../services/vetApi";

const store = configureStore({
    reducer: {
        cartRedu: cartReducer,
        messageRedu: messageReducer,
        notifications: notificationReducer,
        [userApi.reducerPath]: userApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [petApi.reducerPath]: petApi.reducer,
        [symptomApi.reducerPath]: symptomApi.reducer,
        [nutritionistApi.reducerPath]: nutritionistApi.reducer,
        [allergyCoachApi.reducerPath]: allergyCoachApi.reducer,
        [vetApi.reducerPath]: vetApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        })
            .concat(userApi.middleware)
            .concat(appointmentApi.middleware)
            .concat(petApi.middleware)
            .concat(symptomApi.middleware)
            .concat(nutritionistApi.middleware)
            .concat(allergyCoachApi.middleware)
            .concat(vetApi.middleware)
})

setupListeners(store.dispatch)

export default store;