"use client";
import React, { useState } from 'react';
import Participants from './TopBar/Participants';
import ConversationContainer from './MessagesContainer/ConversationContainer';
import { useSelector } from 'react-redux';

const Messenger = () => {
    const authUser = useSelector((state) => state.userRedu.user.authUser);
    const [clickedParticipant, setClickedParticipant] = useState(null);
    return (
        <div className='grid grid-cols-[5fr_2fr] max-md:grid-cols-1 gap-5'>
            {clickedParticipant ?
                <ConversationContainer clickedParticipant={clickedParticipant} authUser={authUser} />
                :
                <div>
                    Choose a vet you want to chat with!
                </div>
            }
            <Participants setClickedParticipant={setClickedParticipant} />
        </div>
    );
};

export default Messenger;