import React, { useEffect, useState } from 'react';
import Button from '@/components/Common/Button/Button';
import Textarea from '@/components/Common/Form/Textarea';
import { MessageCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { HiOutlineThumbDown, HiOutlineThumbUp } from 'react-icons/hi';
import { HiStar, HiXMark } from 'react-icons/hi2';

const GiveFeedback = ({ setGiveFeedback, appointment }) => {
    console.log(appointment)
    const [ratings, setRatings] = useState(0);
    const [recommend, setRecommend] = useState(true);
    return (
        <>
            <div className='border rounded-md p-5 bg-[#672e5b35] border-[#672e5b6e] flex items-center gap-4'>
                <Image src={appointment.vet?.image || '/images/user.jpg'} alt={`vet image`} height={70} width={70} className='border-spacing-3 border-4 border-white rounded-full' />
                <div>
                    <h3 className='text-base font-semibold'>{appointment.vet?.fullName}</h3>
                    <p className='text-sm text-blue-500 font-medium'>{appointment.vet?.degrees.slice(-1)}</p>
                    <p className='text-sm text-gray-900 mt-2'>{new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • {appointment.pet?.name} ({appointment.pet?.type})</p>
                </div>
            </div>
            <div className='text-center mt-7'>
                <h2 className='font-semibold text-lg'>How was your experience?</h2>
                <div className='mt-3 border rounded-md p-5 bg-yellow-400 bg-opacity-10 border-yellow-300 border-opacity-50'>
                    <div className='flex items-center justify-center gap-2 mb-3'>
                        {[...Array(5)].map((_, index) => {
                            const starIndex = index + 1;
                            const isFilled = starIndex <= ratings;
                            return (
                                <HiStar
                                    key={starIndex}
                                    onClick={() => setRatings(starIndex)}
                                    size={36 + index * 2}
                                    className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-125 ${isFilled ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300 hover:text-yellow-400'}`}
                                />
                            );
                        })}
                    </div>
                    <p className='font-medium text-gray-800'>
                        {
                            ratings === 1 ? 'Poor - Not satisfied' :
                                ratings === 2 ? 'Fair - Below expectations' :
                                    ratings === 3 ? 'Good - Met expectations' :
                                        ratings === 4 ? 'Very Good - Exceeded expectations' :
                                            ratings === 5 ? 'Excellent - Outstanding experience!' :
                                                'Click to rate your experience!'
                        }
                    </p>
                </div>
            </div>

            <div className='mt-7'>
                <h3 className='font-semibold text-base'>Would you recommend Dr. {appointment.vet?.fullName} to other pet parents?</h3>
                <div className='grid grid-cols-2 gap-4 text-center mt-4'>
                    <Button onClick={() => setRecommend(true)} classNames={`border rounded-md text-base py-3 ${recommend ? 'bg-green-500 text-white' : 'border hover:border-green-400 hover:border-opacity-50 hover:bg-green-400 hover:bg-opacity-20 duration-200'}`}><HiOutlineThumbUp /> Yes, sure!</Button>
                    <Button onClick={() => setRecommend(false)} classNames={`border rounded-md text-base py-3 ${!recommend ? 'bg-red-500 text-white' : 'border hover:border-red-400 hover:border-opacity-50 hover:bg-red-400 hover:bg-opacity-20 duration-200'}`}><HiOutlineThumbDown /> Not really</Button>
                </div>
            </div>
            <div className='mt-7'>
                <h3 className='font-semibold text-base mb-3'>Tell us more about your experience</h3>
                <Textarea placeholder={'Share your experience...'} />
            </div>
            <div className='mt-7 border rounded-md p-3 bg-green-400 bg-opacity-10 border-green-300 border-opacity-50'>
                <h3 className='font-medium text-base text-green-500 mb-2 flex items-center gap-2'><Sparkles size={20} /> Feedback Summary</h3>
                <ul>
                    <li className='text-sm text-gray-700 flex items-center gap-1 mb-1'>
                        Ratings:
                        <div className='flex items-center gap-1'>
                            {
                                [...Array(ratings)].map((_, index) => {
                                    return (
                                        <HiStar key={index} size={16} className='text-yellow-400' />
                                    );
                                })
                            }
                            ({ratings}/5)
                        </div>
                    </li>
                    <li className='text-sm text-gray-700'>Recommendation: <span className={`${recommend ? 'bg-green-500' : 'bg-black'} text-white rounded-full px-3`}>{recommend ? 'Yes' : 'No'}</span></li>
                </ul>
            </div>
            <div>
                <Button classNames='w-full mt-5 bg-primary text-white hover:bg-primaryHover rounded-md py-3' onClick={() => {
                    setGiveFeedback(false);
                    // Submission logic
                }}>
                    Submit Feedback
                </Button>
            </div>
        </>
    );
};

export default GiveFeedback;