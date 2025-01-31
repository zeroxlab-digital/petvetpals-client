import Reviews from '@/components/Common/Reviews/Reviews';
import { useState } from 'react';
import { HiChat, HiLocationMarker } from 'react-icons/hi';
import { HiAcademicCap, HiBriefcase, HiCalendar, HiHeart, HiOutlineBriefcase, HiStar } from 'react-icons/hi2';

const VetDetailsTabs = ({ fullName, title }) => {
    const tabList = ["About Vet", "Experiences", "Reviews"];
    const [selectedTab, setSelectedTab] = useState("About Vet");

    // Experiences
    const work_experience = [
        { title: "Senior Veterinarian", work_place: "PetCare Plus Clinic", start_date: "July 2018", end_date: "February 2019", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet" },
        { title: "Senior Veterinarian", work_place: "PetCare Plus Clinic", start_date: "July 2018", end_date: "February 2019", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet" },
        { title: "Senior Veterinarian", work_place: "PetCare Plus Clinic", start_date: "July 2018", end_date: "February 2019", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet" }
    ]
    return (
        <div className='p-5 mt-5 rounded-md bg-white h-fit '>
            <ul className='flex gap-2 items-center mb-7 border-b '>
                {tabList.map((list, index) => <li key={index} onClick={() => setSelectedTab(list)} className={`font-bold w-24 h-10 text-primary text-center leading-10 cursor-pointer ${selectedTab == list && 'border-b-[3px] border-[#58294E]'}`}>
                    {list}
                </li>)}
            </ul>
            <div>
                {
                    selectedTab === "About Vet"
                        ?
                        <div className='about-vet '>
                            <div className='mb-5'>
                                <ul className='flex flex-col gap-4'>
                                    <li className='flex items-center gap-2 text-gray-800'>
                                        <HiBriefcase className='text-xl text-gray-700' /> Works at <span className='font-medium'>St. Francis Med</span>
                                    </li>
                                    <li className='flex items-center gap-2 text-gray-800'>
                                        <HiAcademicCap className='text-xl text-gray-700' /> Degree in <span className='font-medium'>Veterinary Medicine</span>
                                    </li>
                                    <li className='flex items-center gap-2 text-gray-800'>
                                        <HiCalendar className='text-xl text-gray-700' /> Experience <span className='font-medium'>8+ years</span>
                                    </li>
                                    <li className='flex items-center gap-2 text-gray-800'>
                                        <HiLocationMarker className='text-xl text-gray-700' /> Based in <span className='font-medium'>Los Angeles, CA</span>
                                    </li>
                                    <li className='flex items-center gap-2 text-gray-800'>
                                        <HiChat className='text-xl text-gray-700' /> Speaks <span className='font-medium'>English, Spanish</span>
                                    </li>
                                    <li className='flex items-center gap-2 text-gray-800'>
                                        <HiStar className='text-xl text-gray-700' /> Ratings <span className='font-medium'>4.7 (193)</span>
                                    </li>
                                </ul>

                            </div>
                            <div className=''>
                                <h2 className='font-bold text-lg text-gray-900 mb-2'>{fullName} - {title}</h2>
                                <p className='text-gray-700 text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam.</p>
                            </div>
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
                                <Reviews />
                                : ""
                }
            </div>
        </div>
    );
};

export default VetDetailsTabs;