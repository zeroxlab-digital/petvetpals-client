import Header from "@/components/PetOwners/Header/Header";

export const metadat = {
    title: "PetVetPals – AI Pet Care & Virtual Vet Solutions",
    description: "Experience next-level pet care with PetVetPals. Our AI-powered Symptom Checker, Nutritionist, Allergy & Itch Coach, and Virtual Vet Calls help keep your dog or cat healthy and happy."
}

const WithLayout = ({ children }) => {

    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default WithLayout;