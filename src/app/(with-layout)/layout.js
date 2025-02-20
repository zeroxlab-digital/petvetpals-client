import Header from "@/components/PetOwners/Header/Header";

const WithLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default WithLayout;