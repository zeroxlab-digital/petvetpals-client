"use client";
import React from 'react';
import store from '@/redux/store/store';
import { Provider } from 'react-redux';

const StoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            { children }
        </Provider>
    );
};

export default StoreProvider;