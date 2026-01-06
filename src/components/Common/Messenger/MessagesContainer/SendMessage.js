"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Send, Plus, Image as ImageIcon, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SendMessage = ({ triggerRefresh }) => {
    const clickedParticipant = useSelector((state) => state.messageRedu.clickedParticipant);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const textareaRef = useRef(null);

    // Auto-expand height logic
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [message]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!message.trim()) return;

        const currentMessage = message;
        setMessage("");

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/message/send/${clickedParticipant._id}`, 
                { message: currentMessage }, 
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (res.status === 201) {
                triggerRefresh();
            }
        } catch (error) {
            console.error("Failed to send:", error);
            setMessage(currentMessage); // Revert on fail
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="relative bg-white pt-2 pb-safe">
            <div className="flex items-center gap-2 px-2 max-w-4xl mx-auto">
                
                <button className="flex-shrink-0 mb-1.5 p-2 rounded-full bg-slate-100 text-slate-500 active:scale-90 transition-all">
                    <Plus size={22} />
                </button>

                <div className="relative flex-1 bg-slate-100 rounded-[1.5rem] border border-transparent focus-within:border-primary/20 focus-within:bg-white focus-within:shadow-inner transition-all duration-200">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        placeholder="Type a message..."
                        className="w-full bg-transparent p-3 pr-12 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none resize-none no-scrollbar font-medium"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    
                    {/* Inline Photo Icon*/}
                    {/* <div className="absolute right-3 bottom-2 flex gap-2">
                         {!message && (
                            <button className="p-1 text-slate-400 hover:text-primary transition-colors">
                                <ImageIcon size={20} />
                            </button>
                         )}
                    </div> */}
                </div>

                <AnimatePresence mode="wait">
                    {message.trim() ? (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={handleSendMessage}
                            className="flex-shrink-0 mb-1 p-3 bg-primary rounded-full text-white shadow-lg shadow-primary/30 active:scale-95 transition-all"
                        >
                            <Send size={18} fill="currentColor" />
                        </motion.button>
                    ) : (
                        <div className="w-[42px]" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SendMessage;