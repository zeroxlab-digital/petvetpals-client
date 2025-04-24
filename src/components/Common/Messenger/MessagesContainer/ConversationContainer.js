/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import useFetchMessages from '../../../../../hooks/useFetchMessages';
import SendMessage from './SendMessage';
import { HiArrowLeft, HiInformationCircle, HiOutlineInformationCircle } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { setClickedParticipant } from '@/redux/features/messageSlice';
import { PetSpinner } from '../../Loader/PetSpinner';
import { useRouter } from 'next/navigation';
import TinySpinner from '../../Loader/TinySpinner';

const ConversationContainer = ({ clickedParticipant, authUser }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);
    // Close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { messages, loading, error } = useFetchMessages(refreshTrigger);
    const dispatch = useDispatch();

    const messagesEndRef = useRef(null);
    // Scroll to the bottom when messages update
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const router = useRouter();

    return (
        <div className={`max-md:order-2 ${clickedParticipant ? '' : 'max-md:hidden'} flex flex-col h-[calc(100vh-10.2rem)] max-md:!min-h-full`}>
            <div className='relative flex items-center justify-between rounded-md bg-primary p-2'>
                <div className='flex items-center gap-3'>
                    <button onClick={() => dispatch(setClickedParticipant(null))} className='md:hidden'>
                        <HiArrowLeft className='text-gray-200 text-xl' />
                    </button>
                    <Image src="/images/user.jpg" alt="participant-profile" width={20} height={20} className='rounded-full w-10 h-10' />
                    <span className='font-medium text-gray-200'>{clickedParticipant.fullName}</span>
                </div>
                <button onClick={() => setShowMenu(!showMenu)} className='text-gray-200 text-2xl'>
                    {showMenu ? <HiInformationCircle /> : <HiOutlineInformationCircle />}
                </button>
                {showMenu && <div className='absolute top-10 right-0 w-52 h-max border shadow-lg bg-white rounded-md '>
                    <ul>
                        <li onClick={() => { router.push(`/appointments/${clickedParticipant._id}`), setShowMenu(false) }} className='py-3 px-3 text-gray-800 cursor-pointer hover:bg-gray-100 duration-150 rounded-t-md font-medium border-b'>View profile</li>
                        <li onClick={() => setShowMenu(false)} className='py-3 px-3 text-gray-800 cursor-pointer hover:bg-gray-100 duration-150 rounded-b-md font-medium'>View media & links</li>
                    </ul>
                </div>}
            </div>
            {loading && <TinySpinner />}
            {messages.length < 1 && error ?
                <div className='flex items-center justify-center h-full'>
                    <h3 className='font-bold text-lg text-gray-800'>No convo found</h3>
                </div>
                :
                <div className='messages h-min overflow-auto'>
                    {
                        messages.map(message => <div key={message._id}>
                            <div className={`chat ${message.senderType === "user" ? "chat-end" : "chat-start"}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src={message.senderType === "user" ? "/images/cute-dog.jpg" : "/images/vet.png"} />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    <time className="text-xs opacity-50">{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
                                </div>
                                <div className="chat-bubble">{message.message}</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                        </div>)
                    }
                    {/* Empty div to scroll to bottom */}
                    <div ref={messagesEndRef}></div>
                </div>
            }

            <SendMessage triggerRefresh={() => setRefreshTrigger((prev) => prev + 1)} />
        </div>
    );
};

export default ConversationContainer;