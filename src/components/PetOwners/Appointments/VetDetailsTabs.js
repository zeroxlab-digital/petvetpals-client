import { useState } from 'react';
import { HiOutlineBriefcase } from 'react-icons/hi2';

const VetDetailsTabs = ({ name, title }) => {
    const tabList = ["About Vet", "Experiences", "Reviews"];
    const [selectedTab, setSelectedTab] = useState("About Vet");

    // Experiences
    const work_experience = [
        {title: "Senior Veterinarian", work_place: "PetCare Plus Clinic", start_date: "July 2018", end_date: "February 2019", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet"},
        {title: "Senior Veterinarian", work_place: "PetCare Plus Clinic", start_date: "July 2018", end_date: "February 2019", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet"},
        {title: "Senior Veterinarian", work_place: "PetCare Plus Clinic", start_date: "July 2018", end_date: "February 2019", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet"}
    ]
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
                        <h3 className='font-bold text-xl mb-2'>Work Experience</h3>
                        <p className='text-gray-700 '>{name} proffessional journey</p>
                        <div className='experience-list mt-5 flex flex-col gap-6'>
                            {work_experience.map((item, index) => <div key={index} className='flex items-start gap-3'>
                                <div className='bg-black p-1 text-white rounded-full relative top-[2px]'><HiOutlineBriefcase /></div>
                                <div>
                                    <h4 className='font-semibold text-lg mb-1'>{item.title}</h4>
                                    <p className='text-gray-600 mb-3'>{item.work_place} | {item.start_date} - {item.end_date}</p>
                                    <p className='text-gray-600'>{item.description}</p>
                                </div>
                            </div>)}
                        </div>
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