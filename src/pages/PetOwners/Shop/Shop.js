"use client";
import CatFoods from "@/components/PetOwners/Shop/CatFoods";
import CatMedicines from "@/components/PetOwners/Shop/CatMedicines";
import DogFoods from "@/components/PetOwners/Shop/DogFoods";
import DogMedicines from "@/components/PetOwners/Shop/DogMedicines";
import PetAccessories from "@/components/PetOwners/Shop/PetAccessories";
import ShopCategories from "@/components/PetOwners/Shop/ShopCategories";
import useProducts from "../../../../hooks/useProducts";
import { usePathname } from "next/navigation";


const ShopPage = () => {
    const products = useProducts();
    const currentPathname = usePathname();
    return (
        <div className="">
            <ShopCategories />
            <div className="mt-10 flex flex-col gap-5">
                <CatFoods products={products} currentPathname={currentPathname} />
                <DogFoods products={products} currentPathname={currentPathname} />
                <CatMedicines products={products} currentPathname={currentPathname} />
                <DogMedicines products={products} currentPathname={currentPathname} />
                <PetAccessories products={products} currentPathname={currentPathname} />
            </div>
        </div>
    );
};

export default ShopPage;