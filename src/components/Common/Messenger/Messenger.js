"use client";
import React, { useState } from 'react';
import Participants from './TopBar/Participants';
import ConversationContainer from './MessagesContainer/ConversationContainer';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const Messenger = () => {
    const authUser = useSelector((state) => state.userRedu.user.authUser);
    const clickedParticipant = useSelector((state) => state.messageRedu.clickedParticipant);
    return (
        <div className='grid grid-cols-[5fr_2fr] max-md:grid-cols-1 gap-5 '>
            {clickedParticipant ?
                <ConversationContainer clickedParticipant={clickedParticipant} authUser={authUser} />
                :
                <div className="flex flex-col items-center justify-center text-center max-md:order-2">
                    <Image src="/images/pet-care.jpg" alt="vet" width={100} height={100} className='w-72' />
                    <h1 className='font-bold text-2xl text-primary mb-3 mt-5'>Choose a vet you want to chat with!</h1>
                    <p className='text-gray-600'>Select a vet available and ask anything regarding your furry family member</p>
                </div>
            }
            <Participants />
        </div>
    );
};

export default Messenger;