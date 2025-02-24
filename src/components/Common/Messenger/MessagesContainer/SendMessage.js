import axios from 'axios';
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchMessages from '../../../../../hooks/useFetchMessages';

const SendMessage = ({triggerRefresh}) => {
    const clickedParticipant = useSelector((state) => state.messageRedu.clickedParticipant);
    const [message, setMessage] = useState("");
    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/message/send/${clickedParticipant._id}`, { message }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if(res.status === 201) {
                triggerRefresh();
            }
            setMessage("");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSendMessage} className='send-message mt-auto pt-2 relative'>
            <input type="text" placeholder='Write a message' className='border border-[#58294ea8] w-full p-3 rounded-md outline-[#58294E]'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <button type='submit' className='p-1 absolute top-4 right-4 text-gray-800'><Send className='h-5 w-5 text-primary' /></button>
        </form>
    );
};

export default SendMessage;