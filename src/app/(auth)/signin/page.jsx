import SignInPage from "@/components/Common/SignIn/SignIn";
import { ToastContainer } from "react-toastify";

const SignIn = () => {
    return (
        <>
            <SignInPage mode={"user"} />
            <ToastContainer />
        </>
    );
};

export default SignIn;