import SignUpPage from "@/components/Common/SignUp/SignUp";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
    
    return (
        <>
            <SignUpPage mode={"user"} />
            <ToastContainer />
        </>
    );
};

export default SignUp;