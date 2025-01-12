import React, { useState } from 'react';
import { HiChevronDown, HiMagnifyingGlass } from 'react-icons/hi2';
import { LuPill } from 'react-icons/lu';

const Search = () => {
    const types = ["Pharmacy", "Foods", "Accessories"];
    const [selected, set_selected] = useState(types[0]);
    const [clicked, set_clicked] = useState(false);
    const handleItemClick = (type, index) => {
        set_selected(types[index])
        set_clicked(false);
    }
    return (
        <form action="#" className="">
            <div className={`flex items-center pl-3 pr-1 border rounded-full border-[#58294E] max-2xl:hidden`}>
                <label htmlFor="search" className={`cursor-pointer  flex items-center justify-center  text-primary `}><HiMagnifyingGlass className="text-lg" /></label>
                <input type="text" placeholder="Search" id="search" className="font-light text-black w-52 outline-none p-2 rounded-full " />
                <div className='relative'>
                    <p onClick={() => set_clicked(!clicked)} className='text-sm flex items-center justify-end gap-[2px] cursor-pointer pr-2 rounded-full w-[6.5rem] text-right'>{selected} <HiChevronDown /></p>
                    {clicked &&
                        <ul className='absolute top-full bg-white border rounded-md w-60  flex flex-col '>
                            {types.map((type, index) => <li key={index} onClick={() => handleItemClick(type, index)} className='hover:bg-gray-200 bg-opacity-50 p-3 cursor-pointer flex items-center gap-2'><LuPill /> {type}</li>)}
                        </ul>
                    }
                </div>
            </div>
            <div className="2xl:hidden">
                <HiMagnifyingGlass className="text-xl text-primary" />
            </div>
        </form>
    );
};

export default Search;