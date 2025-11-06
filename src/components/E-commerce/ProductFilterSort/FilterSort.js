"use client";
import React, { useState } from 'react';
import { HiBarsArrowUp, HiMiniAdjustmentsHorizontal, HiOutlineBarsArrowDown, HiOutlineXCircle } from 'react-icons/hi2';

const FilterSort = () => {
    const [show_sort, set_show_sort] = useState(false);
    const [show_filters, set_show_filters] = useState(false);
    return (
        <div className='md:relative'>
            <div className='flex gap-2'>
                <button onClick={() => { set_show_filters(!show_filters), set_show_sort(false) }} className={`rounded px-3 py-1 border text-gray-800 ${show_filters && 'bg-gray-100'} hover:bg-gray-100 duration-150 text-base flex items-center gap-1`}><HiMiniAdjustmentsHorizontal className='text-sm' /> All filters</button>
                <button onClick={() => { set_show_sort(!show_sort), set_show_filters(false) }} className={`rounded px-3 py-1 border text-gray-800 ${show_sort && 'bg-gray-100'} hover:bg-gray-100 duration-150 text-base flex items-center gap-1`}><HiOutlineBarsArrowDown className='text-base' /> Sort by</button>
                <button onClick={() => { set_show_filters(false), set_show_sort(false) }} className='rounded px-3 py-1 border text-gray-800 hover:bg-gray-100 duration-150 text-base flex items-center gap-1'><HiBarsArrowUp className='text-base' /> Reset</button>
            </div>
            {show_sort &&
                <div className='bg-white border shadow-lg px-3 py-5 rounded-lg absolute md:top-10 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full md:w-full h-max z-20'>
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
                <div className='bg-white border shadow-lg px-3 py-5 rounded-lg absolute md:top-10 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full md:w-full h-96 overflow-auto z-10'>
                    <div className='flex items-center justify-between mb-3'>
                        <h3 className='text-gray-700 font-medium text-lg'>All Filters</h3>
                        <button onClick={() => set_show_filters(false)}>
                            <HiOutlineXCircle className='text-2xl text-gray-700' />
                        </button>
                    </div>

                    <div>
                        {/* Price Filter */}
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Price Range</h4>
                            <input type="range" min="5" max="500" step="5" className="w-full cursor-pointer" />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                                <span>$5</span>
                                <span>$500+</span>
                            </div>
                        </div>

                        {/* Pet Type Filter */}
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Pet Type</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="dog" value="Dog" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="dog" className="text-gray-600 cursor-pointer">Dog</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="cat" value="Cat" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="cat" className="text-gray-600 cursor-pointer">Cat</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="small-pets" value="Small Pets" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="small-pets" className="text-gray-600 cursor-pointer">Small Pets (Rabbits, Hamsters, etc.)</label>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Category</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="food" value="Food" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="food" className="text-gray-600 cursor-pointer">Food & Treats</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="toys" value="Toys" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="toys" className="text-gray-600 cursor-pointer">Toys</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="grooming" value="Grooming" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="grooming" className="text-gray-600 cursor-pointer">Grooming & Health</label>
                            </div>
                        </div>

                        {/* Brand Filter */}
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Brand</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="royal-canin" value="Royal Canin" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="royal-canin" className="text-gray-600 cursor-pointer">Royal Canin</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="purina" value="Purina" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="purina" className="text-gray-600 cursor-pointer">Purina</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="hills" value="Hill's Science Diet" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="hills" className="text-gray-600 cursor-pointer">Hills Science Diet</label>
                            </div>
                        </div>

                        {/* Ratings Filter */}
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Customer Ratings</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="4stars-up" value="4stars-up" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="4stars-up" className="text-gray-600 cursor-pointer">4 stars & up</label>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="3stars-up" value="3stars-up" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="3stars-up" className="text-gray-600 cursor-pointer">3 stars & up</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="2stars-up" value="2stars-up" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="2stars-up" className="text-gray-600 cursor-pointer">2 stars & up</label>
                            </div>
                        </div>

                        {/* Availability Filter */}
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Availability</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="in-stock" value="In Stock" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="in-stock" className="text-gray-600 cursor-pointer">In Stock</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="out-of-stock" value="Out of Stock" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="out-of-stock" className="text-gray-600 cursor-pointer">Out of Stock</label>
                            </div>
                        </div>

                        {/* Shipping Filter */}
                        <div className="mb-5">
                            <h4 className="font-semibold text-gray-700 mb-3 text-base">Shipping Options</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" id="free-shipping" value="Free Shipping" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="free-shipping" className="text-gray-600 cursor-pointer">Free Shipping</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="same-day" value="Same Day Delivery" className="w-4 h-4 text-primary cursor-pointer" />
                                <label htmlFor="same-day" className="text-gray-600 cursor-pointer">Same Day Delivery</label>
                            </div>
                        </div>

                        {/* Apply & Reset Buttons */}
                        <div className="flex justify-between mt-5">
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                                Reset
                            </button>
                            <button className="bg-primary text-white px-4 py-2 rounded-lg">
                                Apply Filters
                            </button>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};

export default FilterSort;