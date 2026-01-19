import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiMagnifyingGlass, HiOutlineShoppingCart } from 'react-icons/hi2';
import { LuPill } from 'react-icons/lu';

const Search = () => {
    const searchTypes = [
        // { type: "Food, Accs.", icon: <HiOutlineShoppingCart /> },
        { type: "Pharmacy", icon: <LuPill /> },
    ];
    const [selected, set_selected] = useState(searchTypes[0].type);
    const [clicked, set_clicked] = useState(false);
    const dropdownRef = useRef(null);

    // Close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                set_clicked(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleItemClick = (index) => {
        set_selected(searchTypes[index].type);
        set_clicked(false);
    };

    return (
        <form action="#" className="max-lg:hidden">
            <div className={`flex items-center pl-3 pr-1 border rounded-full border-[#58294ea3] max-xl:hidden`}>
                <label htmlFor="search" className={`cursor-pointer flex items-center justify-center text-primary`}>
                    <HiMagnifyingGlass className="text-lg" />
                </label>
                <input
                    type="text"
                    placeholder="Search"
                    id="search"
                    className="font-light text-black w-52 outline-none px-2 py-2 rounded-full"
                />
                <div className='relative' ref={dropdownRef}>
                    <p
                        onClick={() => set_clicked(!clicked)}
                        className={`py-[6px] text-sm flex items-center justify-end gap-[2px] cursor-pointer pr-2 rounded-full w-[6.5rem] text-right font-normal text-primary`}>
                        {selected} <HiChevronDown className='text-[12px]' />
                    </p>
                    {clicked && (
                        <ul className='absolute top-full bg-white shadow-xl border border-gray-200 rounded-md w-52 flex flex-col'>
                            {searchTypes.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleItemClick(index)}
                                    className='hover:text-primary text-gray-800 duration-150 p-3 cursor-pointer flex items-center gap-2 first:rounded-t-md last:rounded-b-md first:border-b'>
                                    {item.icon} {item.type}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="xl:hidden">
                <HiMagnifyingGlass className="text-2xl text-primary" />
            </div>
        </form>
    );
};

export default Search;
