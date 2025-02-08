import React, { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi2';

const FAQs = ({ faqs }) => {

    const [activeFaq, setActiveFaq] = useState(0);
    const handleActiveFaq = (i) => {
        if (i === activeFaq) {
            setActiveFaq(null)
        } else {
            setActiveFaq(i);
        }
    }
    
    return (
        <div>
            <ul>
                {faqs.map((faq, index) => (
                    <li
                        key={index}
                        className="w-full mb-3 last:mb-0 bg-gray-100 bg-opacity-40 rounded-md overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => handleActiveFaq(index)}
                            className={`w-full p-3 text-left font-medium text-base text-gray-800 flex items-center justify-between transition-all duration-300 hover:bg-gray-100 ${activeFaq === index && 'bg-gray-100'}`}
                        >
                            {faq.title}
                            {activeFaq === index ? (
                                <HiMinus className="text-lg transition-transform duration-300 rotate-180" />
                            ) : (
                                <HiPlus className="text-lg transition-transform duration-300 rotate-0" />
                            )}
                        </button>
                        <div
                            className={`grid transition-all duration-300 ${activeFaq === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                        >
                            {activeFaq === index && <p className="text-base text-gray-700 border-t text-justify p-3 overflow-hidden">
                                {faq.details}
                            </p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FAQs;