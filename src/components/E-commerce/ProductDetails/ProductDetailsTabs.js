"use client";
import { useState } from "react";

const ProductDetailsTabs = () => {
    const tabList = ["Description", "Ingredients", "Warnings"];
    const [selectedTab, setSelectedTab] = useState("Description");
    return (
        <div className='h-fit w-full'>
            <ul className='flex gap-2 items-center mb-6 max-sm:w-full max-sm:overflow-auto'>
                {tabList.map((list, index) => <li key={index} onClick={() => setSelectedTab(list)} className={`font-semibold w-24 h-10 text-primary text-center leading-10 cursor-pointer ${selectedTab == list && 'border-b-2 border-[#58294E]'}`}>
                    {list}
                </li>)}
            </ul>
            <div>
                {
                    selectedTab === "Description"
                        ?
                        <div className='about-vet'>
                            <p className='text-gray-700 text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam.</p>
                        </div>
                        : selectedTab === "Ingredients"
                            ?
                            <div className='ingredients'>
                                Ingredients
                            </div>
                            : selectedTab === "Instructions"
                                ?
                                <div className='instructions'>
                                    Insturctions
                                </div>
                                :
                                <div className='warnings'>
                                    Warnings
                                </div>
                }
            </div>
        </div>
    );
};

export default ProductDetailsTabs;