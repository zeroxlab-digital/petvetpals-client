import React, { useState } from 'react';
import { HiBarsArrowUp, HiMiniAdjustmentsHorizontal, HiOutlineBarsArrowDown, HiOutlineXCircle } from 'react-icons/hi2';

const FilterSort = () => {
    const [show_sort, set_show_sort] = useState(false);
    const [show_filters, set_show_filters] = useState(false);
    return (
        <div className='relative'>
            <div className='flex gap-2'>
                <button onClick={() => { set_show_filters(!show_filters), set_show_sort(false) }} className={`rounded px-3 py-1 border text-gray-800 ${show_filters && 'bg-gray-100'} hover:bg-gray-100 duration-150 text-base flex items-center gap-1`}><HiMiniAdjustmentsHorizontal className='text-sm' /> All filters</button>
                <button onClick={() => { set_show_sort(!show_sort), set_show_filters(false) }} className={`rounded px-3 py-1 border text-gray-800 ${show_sort && 'bg-gray-100'} hover:bg-gray-100 duration-150 text-base flex items-center gap-1`}><HiOutlineBarsArrowDown className='text-base' /> Sort by</button>
                <button className='rounded px-3 py-1 border text-gray-800 hover:bg-gray-100 duration-150 text-base flex items-center gap-1'><HiBarsArrowUp className='text-base' /> Reset</button>
            </div>
            {show_sort &&
                <div className=' bg-white border shadow-lg px-3 py-5 rounded-lg absolute top-10 right-0 w-80 h-max z-10'>
                    <div className='flex items-center justify-between mb-3'>
                        <h3 className='text-gray-700 font-medium text-lg'>Sort by</h3>
                        <button onClick={() => set_show_sort(false)}><HiOutlineXCircle className='text-2xl text-gray-700' /></button>
                    </div>
                    <div className=''>
                        <div className="flex items-center gap-2 mb-4">
                            <input type="radio" id="relevance" name="sortBy" value="Relevance" className="w-4 h-4 text-primary cursor-pointer" />
                            <label htmlFor="relevance" className="text-gray-600 cursor-pointer">Relevance</label>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <input type="radio" id="popularity" name="sortBy" value="Popularity" className="w-4 h-4 text-primary cursor-pointer" />
                            <label htmlFor="popularity" className="text-gray-600 cursor-pointer">Popularity</label>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <input type="radio" id="experience" name="sortBy" value="Experience" className="w-4 h-4 text-primary cursor-pointer" />
                            <label htmlFor="experience" className="text-gray-600 cursor-pointer">Years of Experience</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="fee" name="sortBy" value="Fee" className="w-4 h-4 text-primary cursor-pointer" />
                            <label htmlFor="fee" className="text-gray-600 cursor-pointer">Low Consultation Fee</label>
                        </div>
                    </div>
                </div>
            }
            {show_filters &&
                <div className=' bg-white border shadow-lg px-3 py-5 rounded-lg absolute top-10 right-0 w-80 h-max z-10'>
                    <div className='flex items-center justify-between mb-3'>
                        <h3 className='text-gray-700 font-medium text-lg'>All filters</h3>
                        <button onClick={() => set_show_filters(false)}><HiOutlineXCircle className='text-2xl text-gray-700' /></button>
                    </div>
                    <div className=''>
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Price in USD</h4>
                            <input type="range" min="10" max="500" step="10" className="w-full cursor-pointer" />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                                <span>$1</span>
                                <span>$500+</span>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Pet</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="general" value="General Veterinary" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="general" className="text-gray-600 cursor-pointer">Dog</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="dermatology" value="Dermatology" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Cat</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="dermatology" value="Dermatology" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Others</label>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Category</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="general" value="General Veterinary" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="general" className="text-gray-600 cursor-pointer">Dog</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="dermatology" value="Dermatology" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Cat</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="dermatology" value="Dermatology" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Others</label>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Brand</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="general" value="General Veterinary" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="general" className="text-gray-600 cursor-pointer">Dog</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="dermatology" value="Dermatology" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Cat</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="dermatology" value="Dermatology" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="dermatology" className="text-gray-600 cursor-pointer">Others</label>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Ratings</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="available-now" value="Available Now" className="w-4 h-4 text-primary" />
                                <label htmlFor="available-now" className="text-gray-600">Available Now</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="weekends" value="Weekends" className="w-4 h-4 text-primary" />
                                <label htmlFor="weekends" className="text-gray-600">Available on Weekends</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="house-visits" value="House Visits" className="w-4 h-4 text-primary" />
                                <label htmlFor="house-visits" className="text-gray-600">Offers House Visits</label>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default FilterSort;