import SignInPage from '@/components/Common/SignIn/SignIn';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const page = () => {
    return (
        <>
            <SignInPage mode={"vet"} />
            <ToastContainer />
        </>
    );
};

export default page;