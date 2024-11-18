
import VetDetails from "@/pages/PetOwners/Appointments/VetDetails";

const VetDetailsPage = ({ params }) => {
    return (
        <div className="container mx-auto xl:px-20 max-md:px-3 py-10">
            <VetDetails params={params} />
        </div>
    );
};

export default VetDetailsPage;