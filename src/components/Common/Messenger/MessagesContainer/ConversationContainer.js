/* eslint-disable @next/next/no-img-element */
import { Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import useFetchMessages from '../../../../../hooks/useFetchMessages';

const ConversationContainer = ({ clickedParticipant, authUser }) => {
    const { messages, loading, error } = useFetchMessages();
    console.log(messages);
    console.log(loading);
    console.log(error);
    return (
        <div className='max-md:order-2 flex flex-col h-[calc(100vh-10.2rem)]'>
            <div className='flex items-center justify-between rounded-md bg-primary p-2'>
                <div className='flex items-center gap-3'>
                    <Image src="/images/vet.png" alt="participant-profile" width={20} height={20} className='rounded-full w-10 h-10' />
                    <span className='font-medium text-gray-200'>{clickedParticipant.fullName}</span>
                </div>
                <div>
                    <HiDotsVertical className='text-gray-200' />
                </div>
            </div>
            {messages.length < 1 && error ?
                <div className='flex items-center justify-center h-full'>
                    <h3 className='font-bold text-lg text-gray-800'>No convo found</h3>
                </div>
                :
                <div className='messages h-max overflow-auto'>
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
                </div>
            }
            <div className='send-message mt-auto pt-2 relative'>
                <input type="text" placeholder='Write a message' className='border border-[#58294ea8] w-full p-3 rounded-md outline-[#58294E]' />
                <button className='absolute top-5 right-4 text-gray-800'><Send className='h-5 w-5 text-primary' /></button>
            </div>
        </div>
    );
};

export default ConversationContainer;