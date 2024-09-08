"use client";
import Vets from "@/pages/PetOwners/Appointments/Vets";
import useVets from "../../../../hooks/useVets";
import { usePathname } from "next/navigation";

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