import SignUpPage from '@/components/Common/SignUp/SignUp';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const signup = () => {
    return (
        <>
            <SignUpPage mode={"vet"} />
            <ToastContainer />
        </>
    );
};

export default signup;