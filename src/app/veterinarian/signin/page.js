import SignInPage from '@/components/Common/SignIn/SignIn';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const page = () => {
    console.log("Rendering VetSignIn wrapper");
    return (
        <>
            <SignInPage mode={"vet"} />
            <ToastContainer />
        </>
    );
};

export default page;