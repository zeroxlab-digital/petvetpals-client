"use client";
import Vets from "@/components/PetOwners/Appointment/Vets";
import { usePathname } from "next/navigation";
import VetFilterSidebar from "@/components/PetOwners/Appointment/VetFilterSidebar";
import { useEffect, useState } from "react";
import useFetchVets from "../../../../hooks/useFetchVets";

const AppointmentsPage = () => {
    const { vets, isLoading, error } = useFetchVets();
    const currentPath = usePathname();
    const [filterChange, setFilterChange] = useState({});
    const [filteredVets, setFilteredVets] = useState([]);

    const { sortBy, specialities } = filterChange || {};

    useEffect(() => {
        if (!vets || vets.length === 0) return; // Ensures vets are loaded before processing

        let filteredVets = [...vets]; // Creates a copy of the vets array to avoid mutating the original array

        // Step 1: Apply filtering based on selected specialities
        if (specialities?.length > 0) {
            filteredVets = filteredVets.filter(vet =>
                vet.specialities.some(speciality => specialities.includes(speciality))
            );
        }

        // Step 2: Apply sorting based on the `sortBy` value
        if (sortBy === 'Experience') {
            filteredVets.sort((a, b) => {
                const experienceA = Number(a.experience_years) || 0;
                const experienceB = Number(b.experience_years) || 0;
                return experienceB - experienceA; // Sort by experience (descending)
            });
        } else if (sortBy === 'Fee') {
            filteredVets.sort((a, b) => {
                const feeA = Number(a.fees) || 0;
                const feeB = Number(b.fees) || 0;
                return feeA - feeB; // Sort by fee (ascending)
            });
        }

        // Set the filtered and/or sorted vets
        setFilteredVets(filteredVets);

    }, [filterChange, vets]);

    return (
        <div className="app-container py-10 max-xl:py-5 xl:grid xl:grid-cols-[2fr_10fr] gap-12 max-xl:gap-3 max-md:bg-gray-100 min-h-screen">
            <VetFilterSidebar setFilterChange={setFilterChange} vets={filteredVets} />
            <Vets vets={filteredVets} isLoading={isLoading} error={error} currentPath={currentPath} />
        </div>
    );
};

export default AppointmentsPage;
