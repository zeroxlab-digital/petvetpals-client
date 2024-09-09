"use client";
import Vets from "@/pages/PetOwners/Appointments/Vets";
import { usePathname } from "next/navigation";
import useVets from "../../../../../hooks/useVets";

const AppointmentsPage = () => {
    const vets = useVets();
    const currentPath = usePathname();
    return (
        <div>
            <Vets vets={vets} currentPath={currentPath} />
        </div>
    );
};

export default AppointmentsPage;