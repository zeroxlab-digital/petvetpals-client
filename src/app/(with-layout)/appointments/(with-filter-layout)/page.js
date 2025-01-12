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
    const [filteredVets, setFilteredVets] = useState([]);

    const { sortBy, specialities } = filterChange || {};

    useEffect(() => {
        if (!vets || vets.length === 0) return; // Ensure vets are loaded before processing

        let filteredVets = [...vets]; // Create a copy of the vets array to avoid mutating the original array

        // Step 1: Apply filtering based on selected specialities
        if (specialities?.length > 0) {
            filteredVets = filteredVets.filter(vet =>
                vet.specialities.some(speciality => specialities.includes(speciality))
            );
        }

        // Step 2: Apply sorting based on the `sortBy` value
        if (sortBy === 'Experience') {
            filteredVets.sort((a, b) => {
                const experienceA = Number(a.years_of_experiences) || 0;
                const experienceB = Number(b.years_of_experiences) || 0;
                return experienceB - experienceA; // Sort by experience (descending)
            });
        } else if (sortBy === 'Fee') {
            filteredVets.sort((a, b) => {
                const feeA = Number(a.visit_fee_usd) || 0;
                const feeB = Number(b.visit_fee_usd) || 0;
                return feeA - feeB; // Sort by fee (ascending)
            });
        }

        // Set the filtered and/or sorted vets
        setFilteredVets(filteredVets);

    }, [filterChange, vets]);

    return (
        <div className="container mx-auto max-md:px-3 2xl:px-20 py-10 grid xl:grid-cols-[2fr_7fr] gap-14 max-md:bg-gray-100">
            <VetFilterSidebar setFilterChange={setFilterChange} />
            <Vets vets={filteredVets} currentPath={currentPath} />
        </div>
    );
};

export default AppointmentsPage;
