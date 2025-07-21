import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const ModalPopup = ({ isOpen, onClose, title = () => { }, icon = () => { }, children }) => {
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isOpen);
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    onClick={handleBackgroundClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-full max-w-lg mx-4 rounded-xl bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className='flex items-center justify-between p-4 border-b'>
                            <h3 className='text-gray-900 font-semibold text-lg flex items-center gap-3'>
                                {icon && <span className='text-white bg-primary p-[6px] rounded'>{icon}</span>}
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className=" text-gray-500 hover:text-gray-800 transition"
                            >
                                <HiXMark size={26} />
                            </button>
                        </div>

                        <div className="p-4 max-h-[80vh] overflow-auto hide-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalPopup;
