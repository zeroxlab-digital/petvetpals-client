"use client";
import React, { useState } from 'react';
import { HiBars4, HiBarsArrowUp, HiMiniAdjustmentsHorizontal, HiOutlineBarsArrowDown, HiOutlineXCircle } from 'react-icons/hi2';

const VetFilterSidebar = ({ setFilterChange, vets, isLoading }) => {

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
        setShowResponsiveSort(false);
    };

    const resetFilters = () => {
        const resetValues = { specialities: [], sortBy: 'Relevance' };
        setFilters(resetValues);
        setFilterChange(resetValues);
    };

    const [showResponsiveSort, setShowResponsiveSort] = useState(false);
    const [showResponsiveFilter, setShowResponsiveFilter] = useState(false);

    return (
        <>
            <div className={`filter-header xl:hidden flex items-center justify-between bg-white p-3 rounded-md max-h-max ${isLoading && 'hidden'}`}>
                <p className='text-gray-800 text-sm'>{vets.length} vets found</p>
                <div className='flex gap-2'>
                    <button onClick={() => { setShowResponsiveFilter(true), setShowResponsiveSort(false) }} className='rounded px-2 py-[2px] border text-gray-800 text-sm flex items-center gap-1'><HiMiniAdjustmentsHorizontal className='text-xs' /> Filter</button>
                    <button onClick={() => { setShowResponsiveSort(true), setShowResponsiveFilter(false) }} className='rounded px-2 py-[2px] border text-gray-800 text-sm flex items-center gap-1'><HiOutlineBarsArrowDown className='text-sm' /> Sort by</button>
                    <button onClick={resetFilters} className='rounded px-2 py-[2px] border text-gray-800 text-sm flex items-center gap-1'><HiBarsArrowUp className='text-sm' /> Reset</button>
                </div>
                {showResponsiveSort && (
                    <div className="fixed bottom-0 left-0 w-full bg-white shadow-black shadow-2xl rounded-t-xl z-50 p-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Sort by</h3>
                            <button onClick={() => setShowResponsiveSort(false)}>
                                <HiOutlineXCircle className="text-3xl text-gray-700" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="relevance"
                                    name="sortBy"
                                    value="Relevance"
                                    onChange={handleSortChange}
                                    checked={filters.sortBy === 'Relevance'}
                                    className="w-4 h-4 text-primary cursor-pointer"
                                />
                                <label htmlFor="relevance" className="text-gray-600 cursor-pointer">Relevance</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="popularity"
                                    name="sortBy"
                                    value="Popularity"
                                    onChange={handleSortChange}
                                    checked={filters.sortBy === 'Popularity'}
                                    className="w-4 h-4 text-primary cursor-pointer"
                                />
                                <label htmlFor="popularity" className="text-gray-600 cursor-pointer">Popularity</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="experience"
                                    name="sortBy"
                                    value="Experience"
                                    onChange={handleSortChange}
                                    checked={filters.sortBy === 'Experience'}
                                    className="w-4 h-4 text-primary cursor-pointer"
                                />
                                <label htmlFor="experience" className="text-gray-600 cursor-pointer">Years of Experience</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="fee"
                                    name="sortBy"
                                    value="Fee"
                                    onChange={handleSortChange}
                                    checked={filters.sortBy === 'Fee'}
                                    className="w-4 h-4 text-primary cursor-pointer"
                                />
                                <label htmlFor="fee" className="text-gray-600 cursor-pointer">Low Consultation Fee</label>
                            </div>
                        </div>
                    </div>
                )}

                {showResponsiveFilter && (
                    <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl shadow-black rounded-t-xl z-50 p-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Filter by</h3>
                            <button onClick={() => setShowResponsiveFilter(false)}>
                                <HiOutlineXCircle className="text-3xl text-gray-700" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3">Consultation Fee (USD)</h4>
                                <input type="range" min="10" max="500" step="10" className="w-full cursor-pointer" />
                                <div className="flex justify-between text-sm text-gray-500 mt-1">
                                    <span>$10</span>
                                    <span>$500+</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3">Specialities</h4>
                                <div className="flex items-center gap-2 mb-3">
                                    <input
                                        type="checkbox"
                                        id="general"
                                        value="General Veterinary"
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-primary cursor-pointer"
                                    />
                                    <label htmlFor="general" className="text-gray-600 cursor-pointer">General Veterinary</label>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <input
                                        type="checkbox"
                                        id="dermatology"
                                        value="Dermatology"
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-primary cursor-pointer"
                                    />
                                    <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Dermatology</label>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <input
                                        type="checkbox"
                                        id="dentistry"
                                        value="Dentistry"
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-primary cursor-pointer"
                                    />
                                    <label htmlFor="dentistry" className="text-gray-600 cursor-pointer">Dentistry</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="internal"
                                        value="Internal Medicine"
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-primary cursor-pointer"
                                    />
                                    <label htmlFor="internal" className="text-gray-600 cursor-pointer">Internal Medicine</label>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3">Availability</h4>
                                <div className="flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        id="available-now"
                                        value="Available Now"
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <label htmlFor="available-now" className="text-gray-600">Available Now</label>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        id="weekends"
                                        value="Weekends"
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <label htmlFor="weekends" className="text-gray-600">Available on Weekends</label>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="house-visits"
                                        value="House Visits"
                                        onChange={handleSpecialityChange}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <label htmlFor="house-visits" className="text-gray-600">Offers House Visits</label>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <aside className="sticky top-28 h-fit overflow-auto bg-white border-r pr-6 max-xl:hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-gray-800">Filter Veterinarian</h3>
                    <button onClick={resetFilters} className="bg-primary hover:bg-primaryHover duration-200 px-4 py-1 rounded text-white text-sm font-medium">
                        Reset
                    </button>
                </div>

                <form action="#">
                    {/* Vet Specialties Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-3 text-base">Select Vet Specialties</h4>
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
                        <h4 className="font-semibold text-gray-700 mb-3 text-base">Sort By</h4>
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
                        <h4 className="font-semibold text-gray-700 mb-3 text-base">Consultation Fee (USD)</h4>
                        <input type="range" min="10" max="500" step="10" className="w-full cursor-pointer" />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>$10</span>
                            <span>$500+</span>
                        </div>
                    </div>

                    {/* Availability Filter */}
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3 text-base">Availability</h4>
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" id="available-now" value="Available Now" onChange={handleSpecialityChange} className="w-4 h-4 text-primary" />
                            <label htmlFor="available-now" className="text-gray-600">Available Now</label>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" id="weekends" value="Weekends" onChange={handleSpecialityChange} className="w-4 h-4 text-primary" />
                            <label htmlFor="weekends" className="text-gray-600">Available on Weekends</label>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <input type="checkbox" id="house-visits" value="House Visits" onChange={handleSpecialityChange} className="w-4 h-4 text-primary" />
                            <label htmlFor="house-visits" className="text-gray-600">Offers House Visits</label>
                        </div> */}
                    </div>
                </form>
            </aside>
        </>
    );
};

export default VetFilterSidebar;
