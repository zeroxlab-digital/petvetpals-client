import SignInPage from "@/components/Common/SignIn/SignIn";
import { ToastContainer } from "react-toastify";

const SignIn = () => {
    return (
        <div>
            <SignInPage />
            <ToastContainer />
        </div>
    );
};

export default SignIn;