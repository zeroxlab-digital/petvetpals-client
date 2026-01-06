"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import useFetchMessages from '../../../../../hooks/useFetchMessages';
import SendMessage from './SendMessage';
import { HiArrowLeft, HiEllipsisVertical } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { setClickedParticipant } from '@/redux/features/messageSlice';
import { useRouter } from 'next/navigation';
import TinySpinner from '../../Loader/TinySpinner';
import { MessageCircleMore, Phone, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConversationContainer = ({ clickedParticipant, authUser }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { messages, loading, error } = useFetchMessages(refreshTrigger);
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const router = useRouter();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!clickedParticipant) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:relative md:inset-auto md:h-[calc(100vh-12rem)] md:rounded-2xl md:shadow-xl md:border md:border-slate-100 overflow-hidden">
            
            <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => dispatch(setClickedParticipant(null))}
                        className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors active:scale-90"
                    >
                        <HiArrowLeft className="text-slate-900 text-xl" />
                    </button>
                    
                    <div className="relative group cursor-pointer" onClick={() => router.push(`/vet-appointment/${clickedParticipant._id}`)}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                            <Image src="/images/dr-vector.png" alt="profile" width={40} height={40} className="object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>

                    <div>
                        <h2 className="font-bold text-slate-900 leading-none">{clickedParticipant.fullName}</h2>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</span>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Phone size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Video size={20} /></button>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-slate-900"><HiEllipsisVertical size={24} /></button>
                        
                        <AnimatePresence>
                            {showMenu && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-12 right-0 w-56 bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden z-50"
                                >
                                    <button onClick={() => router.push(`/vet-appointment/${clickedParticipant._id}`)} className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b">View Professional Profile</button>
                                    <button className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b">Media, Links & Docs</button>
                                    <button className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50">Report / Block</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-slate-50/50">
                {loading && <div className="flex justify-center"><TinySpinner /></div>}
                
                {messages.length < 1 && !loading ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-40">
                        <MessageCircleMore size={64} className="mb-2 text-slate-300" />
                        <p className="font-bold text-slate-400">Start the conversation</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div key={message._id} className={`flex ${message.senderType === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] group`}>
                                <div className={`flex items-end gap-2 ${message.senderType === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
                                        <img src={message.senderType === "user" ? "/images/user-man.png" : "/images/vet.png"} alt="avatar" />
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm ${
                                            message.senderType === "user" 
                                            ? "bg-primary text-white rounded-br-none" 
                                            : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                                        }`}>
                                            {message.message}
                                        </div>
                                        <span className={`text-[10px] mt-1 text-slate-400 font-bold uppercase ${message.senderType === "user" ? "text-right" : "text-left"}`}>
                                            {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 bg-white border-t border-slate-100">
                <SendMessage triggerRefresh={() => setRefreshTrigger((prev) => prev + 1)} />
            </footer>
        </div>
    );
};

export default ConversationContainer;