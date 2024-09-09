
import VetDetails from "@/pages/PetOwners/Appointments/VetDetails";

const VetDetailsPage = ({ params }) => {
    return (
        <div className="container py-10">
            <VetDetails params={params} />
        </div>
    );
};

export default VetDetailsPage;