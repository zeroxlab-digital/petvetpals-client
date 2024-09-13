"use client";
import Vets from "@/pages/PetOwners/Appointments/Vets";
import { usePathname } from "next/navigation";
import useVets from "../../../../../hooks/useVets";
import VetFilterSidebar from "@/components/PetOwners/Appointments/VetFilterSidebar";

const AppointmentsPage = () => {
    const vets = useVets();
    const currentPath = usePathname();
    return (
        <div  className="container py-10 grid grid-cols-[2fr_7fr] gap-14">
            <VetFilterSidebar />
            <Vets vets={vets} currentPath={currentPath} />
        </div>
    );
};

export default AppointmentsPage;