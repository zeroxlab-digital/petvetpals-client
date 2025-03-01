import Header from "@/components/PetOwners/Header/Header";
import { ToastContainer } from "react-toastify";

const WithLayout = ({ children }) => {
    return (
        <div>
            <ToastContainer />
            <Header />
            {children}
        </div>
    );
};

export default WithLayout;