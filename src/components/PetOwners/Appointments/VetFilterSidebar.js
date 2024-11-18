"use client";
import React, { useState } from 'react';

const VetFilterSidebar = ({ setFilterChange }) => {
    const [filters, setFilters] = useState({
        specialities: [],
        sortBy: "Relevance"
    });

    const handleSpecialityChange = (e) => {
        const { value, checked } = e.target;
        const updatedSpecialities = checked
            ? [...filters.specialities, value]
            : filters.specialities.filter(speciality => speciality !== value);

        setFilters({ ...filters, specialities: updatedSpecialities });
        setFilterChange({ ...filters, specialities: updatedSpecialities });
    };

    const handleSortChange = (e) => {
        setFilters({ ...filters, sortBy: e.target.value });
        setFilterChange({ ...filters, sortBy: e.target.value });
    };

    const resetFilters = () => {
        const resetValues = { specialities: [], sortBy: 'Relevance' };
        setFilters(resetValues);
        setFilterChange(resetValues);
    };

    return (
        <aside className="sticky top-0 h-fit overflow-auto bg-white rounded-lg max-xl:hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-800">Filter Vets</h3>
                <button onClick={resetFilters} className="bg-gray-100 hover:bg-gray-200 duration-200 px-4 py-1 rounded-md text-gray-600 text-sm font-medium">
                    Reset
                </button>
            </div>

            <form action="#">
                {/* Vet Specialties Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3 text-lg">Select Vet Specialties</h4>
                    <div className="flex items-center gap-2 mb-2 ">
                        <input type="checkbox" id="general" value="General Veterinary" onChange={handleSpecialityChange} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="general" className="text-gray-600 cursor-pointer">General Veterinary</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" id="dermatology" value="Dermatology" onChange={handleSpecialityChange} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Dermatology</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" id="dentistry" value="Dentistry" onChange={handleSpecialityChange} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="dentistry" className="text-gray-600 cursor-pointer">Dentistry</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="internal" value="Internal Medicine" onChange={handleSpecialityChange} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="internal" className="text-gray-600 cursor-pointer">Internal Medicine</label>
                    </div>
                </div>

                {/* Sorting Options */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3 text-lg">Sort By</h4>
                    <div className="flex items-center gap-2 mb-2 ">
                        <input type="radio" id="relevance" name="sortBy" value="Relevance" onChange={handleSortChange} checked={filters.sortBy === 'Relevance'} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="relevance" className="text-gray-600 cursor-pointer">Relevance</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <input type="radio" id="popularity" name="sortBy" value="Popularity" onChange={handleSortChange} checked={filters.sortBy === 'Popularity'} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="popularity" className="text-gray-600 cursor-pointer">Popularity</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <input type="radio" id="experience" name="sortBy" value="Experience" onChange={handleSortChange} checked={filters.sortBy === 'Experience'} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="experience" className="text-gray-600 cursor-pointer">Years of Experience</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" id="fee" name="sortBy" value="Fee" onChange={handleSortChange} checked={filters.sortBy === 'Fee'} className="w-4 h-4 text-primary cursor-pointer" />
                        <label htmlFor="fee" className="text-gray-600 cursor-pointer">Low Consultation Fee</label>
                    </div>
                </div>

                {/* Consultation Fee Range */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3 text-lg">Consultation Fee (USD)</h4>
                    <input type="range" min="10" max="500" step="10" className="w-full cursor-pointer" />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>$10</span>
                        <span>$500+</span>
                    </div>
                </div>

                {/* Availability Filter */}
                <div>
                    <h4 className="font-semibold text-gray-700 mb-3 text-lg">Availability</h4>
                    <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" id="available-now" value="Available Now" onChange={handleSpecialityChange} className="w-4 h-4 text-primary" />
                        <label htmlFor="available-now" className="text-gray-600">Available Now</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" id="weekends" value="Weekends" onChange={handleSpecialityChange} className="w-4 h-4 text-primary" />
                        <label htmlFor="weekends" className="text-gray-600">Available on Weekends</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="house-visits" value="House Visits" onChange={handleSpecialityChange} className="w-4 h-4 text-primary" />
                        <label htmlFor="house-visits" className="text-gray-600">Offers House Visits</label>
                    </div>
                </div>
            </form>
        </aside>
    );
};

export default VetFilterSidebar;
