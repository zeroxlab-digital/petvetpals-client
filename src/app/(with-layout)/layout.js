import Footer from "@/components/PetOwners/Footer/Footer";
import Header from "@/components/PetOwners/Header/Header";

const WithLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default WithLayout;