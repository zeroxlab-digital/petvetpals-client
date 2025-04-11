import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "../features/rootReducer";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import messageReducer from "../features/messageSlice";
import { appointmentApi } from "../services/appointmentApi";
import { setupListeners } from "@reduxjs/toolkit/query";

// Redux Persist configuration
const persistConfig = {
    key: 'root',
    storage,
}

// Wrap the root reducer with persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: {
        userRedu: persistedReducer,
        messageRedu: messageReducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
        .concat(appointmentApi.middleware)
})

setupListeners(store.dispatch)

export const persistor = persistStore(store);

export default store;