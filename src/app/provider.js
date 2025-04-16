"use client";
import React, { useState, useEffect } from "react";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
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
            {
                // isReady ? 
                children
                // : <PetVetPalsLoader />
            }
        </Provider>
    );
};

export default StoreProvider;
