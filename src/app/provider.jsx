"use client";
import React, { useState, useEffect } from "react";
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { PetVetPalsLoader } from "@/components/Common/Loader/PetVetPalsLoader";
import NotificationCenter from "@/components/Common/Notifications/NotificationCenter";
import useReminderNotifications from "../../hooks/useReminderNotifications";
import usePushNotifications from "../../hooks/usePushNotifications";

const StoreProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('Service Worker Registered', reg);
            });
        }
    }, []);

    return (
        <Provider store={store}>
            <ReminderWrapper>
                {children}
                <NotificationCenter />
            </ReminderWrapper>
        </Provider>
    );
};

// Create a separate component where the Redux context is guaranteed to exist
const ReminderWrapper = ({ children }) => {
    useReminderNotifications();
    usePushNotifications();
    return children;
};

export default StoreProvider;
