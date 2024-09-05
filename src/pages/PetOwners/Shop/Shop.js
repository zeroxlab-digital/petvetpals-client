import CatFoods from "@/components/PetOwners/Shop/CatFoods";
import CatMedicines from "@/components/PetOwners/Shop/CatMedicines";
import DogFoods from "@/components/PetOwners/Shop/DogFoods";
import DogMedicines from "@/components/PetOwners/Shop/DogMedicines";
import Others from "@/components/PetOwners/Shop/Others";
import PetAccessories from "@/components/PetOwners/Shop/PetAccessories";
import ShopCategories from "@/components/PetOwners/Shop/ShopCategories";


const ShopPage = () => {
    return (
        <div className="">
            <ShopCategories />
            <div className="mt-10 flex flex-col gap-5">
                <CatFoods />
                <DogFoods />
                <CatMedicines />
                <DogMedicines />
                <PetAccessories />
                <Others />
            </div>
        </div>
    );
};

export default ShopPage;