"use client";
import Vets from "@/pages/PetOwners/Appointments/Vets";
import { usePathname } from "next/navigation";
import useVets from "../../../../../hooks/useVets";
import VetFilterSidebar from "@/components/PetOwners/Appointments/VetFilterSidebar";
import { useEffect, useState } from "react";

const AppointmentsPage = () => {
    const vets = useVets();
    const currentPath = usePathname();
    const [filterChange, setFilterChange] = useState({});
    const [filteredVets, setFilteredVets] = useState(vets); // Initially show all vets

    const { sortBy, specialities } = filterChange || {};

    useEffect(() => {
        if (specialities?.length > 0) {
            // Filter only if there are selected specialities
            const filteringVets = vets.filter(vet =>
                vet.specialities.some(speciality => specialities.includes(speciality))
            );
            setFilteredVets(filteringVets);
        } else {
            // If no filter, show all vets
            setFilteredVets(vets);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterChange, vets]);

    return (
        <div className="container py-10 grid grid-cols-[2fr_7fr] gap-14">
            <VetFilterSidebar setFilterChange={setFilterChange} />
            <Vets vets={filteredVets} currentPath={currentPath} />
        </div>
    );
};

export default AppointmentsPage;
