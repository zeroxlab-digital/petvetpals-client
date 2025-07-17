import React, { useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi2';

const FAQs = () => {

    const faqs = [
            { title: "What is PetVetPals?", details: "PetVetPals is an online platform where pet owners can find animal doctors, book appointments, and use telemedicine for video consultations. Along with that, we also provide pet-focused e-commerce services." },
            { title: "How do I book an appointment?", details: "You can book an appointment by signing up on our platform, selecting a veterinarian, and choosing an available time slot." },
            { title: "Can I get prescriptions through PetVetPals?", details: "Yes, after a consultation, veterinarians can provide prescriptions, which you can purchase through our platform or from your local pet pharmacy." },
            { title: "Is telemedicine available for all pet types?", details: "Yes, we support consultations for dogs, cats, birds, reptiles, and other small animals. However, some conditions may require in-person visits." },
            { title: "How do I pay for a consultation?", details: "You can pay securely using credit/debit cards, PayPal, or cryptocurrency through our integrated payment system." },
            { title: "Can I cancel or reschedule my appointment?", details: "Yes, you can cancel or reschedule an appointment from your dashboard, but cancellation policies may vary by veterinarian." }
        ];

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