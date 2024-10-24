import { useState } from 'react';

const VetDetailsTabs = ({ name, title }) => {
    const tabList = ["About Vet", "Experiences", "Reviews"];
    const [selectedTab, setSelectedTab] = useState("About Vet");
    return (
        <div className='p-5 rounded-md border h-fit'>
            <ul className='flex gap-2 items-center mb-6'>
                {tabList.map((list, index) => <li key={index} onClick={() => setSelectedTab(list)} className={`font-bold w-24 h-10 text-primary text-center leading-10 cursor-pointer ${selectedTab == list && 'border-b-2 border-[#58294E]'}`}>
                    {list}
                </li>)}
            </ul>
            <div>
                {
                    selectedTab === "About Vet"
                    ?
                    <div className='about-vet '>
                        <h2 className='font-bold text-lg text-gray-900 mb-2'>{name} - {title}</h2>
                        <p className='text-gray-700 text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam.</p>
                    </div>
                    : selectedTab === "Experiences"
                    ?
                    <div className='experiences'>
                        Experiences
                    </div>
                    : selectedTab === "Reviews"
                    ?
                    <div className='reviews'>
                        Reviews
                    </div>
                    : ""
                }
            </div>
        </div>
    );
};

export default VetDetailsTabs;