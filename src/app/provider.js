"use client";
import React, { useState, useEffect } from "react";
import store, { persistor } from "@/redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PetVetPalsLoader } from "@/components/Common/Loader/PetVetPalsLoader";

const StoreProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {isReady ? children : <PetVetPalsLoader />}
            </PersistGate>
        </Provider>
    );
};

export default StoreProvider;
