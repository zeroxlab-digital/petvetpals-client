import Image from 'next/image';
import React from 'react';
import useFetchVets from '../../../../../hooks/useFetchVets';

const Participants = ({ setClickedParticipant }) => {
    const { vets, isLoading, error } = useFetchVets();
    console.log(vets);
    if (isLoading) {
        return <div>Loading vets...</div>
    }
    const participants = vets;
    return (
        <div className='bg-gray-200 p-2 rounded-md'>
            <ul className='flex md:flex-col gap-3 max-md:gap-5'>
                {participants.map(participant => <li key={participant._id} onClick={() => setClickedParticipant(participant)} className='text-center flex max-md:flex-col items-center gap-3 cursor-pointer md:bg-gray-100 md:p-1'>
                    <Image src="/images/vet.png" alt="participant-profile" width={30} height={30} className='rounded-full w-16 h-16' />
                    <span>{participant.fullName}</span>
                </li>)}
            </ul>
        </div>
    );
};

export default Participants;