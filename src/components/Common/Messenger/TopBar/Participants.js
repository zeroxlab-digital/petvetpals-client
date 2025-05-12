import Image from 'next/image';
import React from 'react';
import useFetchVets from '../../../../../hooks/useFetchVets';
import { HiDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setClickedParticipant } from '@/redux/features/messageSlice';
import { Search } from 'lucide-react';
import { PetSpinner } from '../../Loader/PetSpinner';
import TinySpinner from '../../Loader/TinySpinner';

const Participants = () => {
    
    const clickedParticipant = useSelector((state) => state.messageRedu.clickedParticipant);
    const dispatch = useDispatch();
    const { vets, isLoading, error } = useFetchVets();
    if (isLoading) {
        return <TinySpinner />
    }
    const participants = vets;

    // Use this for showing the first letter for firstname
    // const nameFormat = (name) => {
    //     const format = name.split(" ");
    //     if (format.length > 1) {
    //         return `${format[0][0]}. ${format[1]}`;
    //     }
    // }
    return (
        <div className={`${clickedParticipant ? 'max-md:hidden' : ''} md:border-l-2   md:p-3 py-0 pr-0 md:h-[calc(100vh-10.2rem)] `}>
            <div className='flex items-center justify-between  mb-4'>
                <h3 className='text-gray-800 font-medium  md:ml-1'>Available vets</h3>
                <div className='flex items-center gap-5'>
                    <button><Search className='h-4 w-4 text-gray-800' /></button>
                    <button><HiDotsVertical className='h-4 w-4 text-gray-800' /></button>
                    
                </div>
            </div>
            <ul className='flex justify-start items-start flex-col '>
                {participants.map(participant => <li key={participant._id} onClick={() => dispatch(setClickedParticipant(participant))} className={`border-b last:border-none py-2 text-center w-full flex  items-center gap-3 cursor-pointer hover:bg-gray-50 duration-200 rounded-md  ${clickedParticipant?._id === participant._id && 'md:bg-gray-100'}`}>
                    <Image src="/images/user.jpg" alt="participant-profile" width={30} height={30} className='rounded-full w-10 h-10 max-md:w-14 max-md:h-14 border' />
                    <span className=' text-gray-800 '>{participant.fullName}</span>
                </li>)}
            </ul>
        </div>
    );
};

export default Participants;