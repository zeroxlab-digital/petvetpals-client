import VetDetails from "@/components/PetOwners/Appointment/VetDetails";
import { ToastContainer } from "react-toastify";

const VetDetailsPage = ({ params }) => {
    return (
        <div className="container mx-auto xl:px-60 max-md:px-3 py-10 bg-gray-200 bg-opacity-25">
            <VetDetails params={params} />
            <ToastContainer />
        </div>
    );
};

export default VetDetailsPage;