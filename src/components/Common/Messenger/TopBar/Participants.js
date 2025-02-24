import Image from 'next/image';
import React from 'react';
import useFetchVets from '../../../../../hooks/useFetchVets';
import { HiDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setClickedParticipant } from '@/redux/features/messageSlice';
import { Search } from 'lucide-react';

const Participants = () => {
    const clickedParticipant = useSelector((state) => state.messageRedu.clickedParticipant);
    const dispatch = useDispatch();
    const { vets, isLoading, error } = useFetchVets();
    if (isLoading) {
        return <div className='bg-primary p-3 rounded-md md:h-[calc(100vh-10.2rem)] text-gray-200'>Loading vets...</div>
    }
    const participants = vets;

    const nameFormat = (name) => {
        const format = name.split(" ");
        if (format.length > 1) {
            return `${format[0][0]}. ${format[1]}`;
        }
    }
    return (
        <div className='md:border-l-2 max-md:border-2 max-md:rounded-md p-3 md:py-0 pr-0 md:h-[calc(100vh-10.2rem)]'>
            <div className='flex items-center justify-between  mb-4'>
                <h3 className='text-gray-800 font-medium  md:ml-1'>Available vets</h3>
                <div className='flex items-center gap-5'>
                    <button><Search className='h-4 w-4 text-gray-800' /></button>
                    <button><HiDotsVertical className='h-4 w-4 text-gray-800' /></button>
                </div>
            </div>
            <ul className='flex md:flex-col gap-1 max-md:gap-5'>
                {participants.map(participant => <li key={participant._id} onClick={() => dispatch(setClickedParticipant(participant))} className={`text-center flex max-md:flex-col items-center gap-3 max-md:gap-2 cursor-pointer md:hover:bg-gray-100 duration-200 md:p-1 rounded-md max-md:p-2 ${clickedParticipant?._id === participant._id && 'bg-gray-200'}`}>
                    <Image src="/images/vet.png" alt="participant-profile" width={30} height={30} className='rounded-full w-10 h-10 max-md:w-16 max-md:h-16' />
                    <span className='font-medium text-gray-800 md:hidden'>{nameFormat(participant.fullName)}</span>
                    <span className='font-medium text-gray-800 max-md:hidden'>{participant.fullName}</span>
                </li>)}
            </ul>
        </div>
    );
};

export default Participants;