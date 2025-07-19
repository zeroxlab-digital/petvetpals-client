import Button from '@/components/Common/Button/Button';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

const Reschedule = ({ setApptReschedule, appointment }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [])
    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
            <div className="relative w-[95%] max-w-[30rem] bg-white shadow-lg rounded-lg overflow-hidden hide-scrollbar">

                <div className='overflow-auto hide-scrollbar h-[35rem] p-4'>
                    <h2 className='font-bold text-xl flex items-center gap-3'><div className='w-min bg-primary p-2 rounded-lg text-white'><Calendar /></div> Reschedule Your Appointment</h2>

                    {/* <div className='mt-7 border rounded-md p-5 bg-[#672e5b35] border-[#672e5b6e] flex items-center gap-4'>
                        <Image src={appointment.vet?.image || '/images/user.jpg'} alt={`vet image`} height={70} width={70} className='border-spacing-3 border-4 border-white rounded-full' />
                        <div>
                            <h3 className='text-base font-semibold'>{appointment.vet?.fullName}</h3>
                            <p className='text-sm text-blue-500 font-medium'>{appointment.vet?.degrees.slice(-1)}</p>
                            <p className='text-sm text-gray-900 mt-2'>{new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • {appointment.pet?.name} ({appointment.pet?.type})</p>
                        </div>
                    </div> */}
                    
                    {/* <div className='mt-7 border rounded-md p-3 bg-green-400 bg-opacity-10 border-green-300 border-opacity-50'>
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
                    </div> */}
                    <div>
                        <Button classNames='w-full mt-5 bg-primary text-white hover:bg-primaryHover rounded-md py-3' onClick={() => {
                            setApptReschedule(false);
                            // Submission logic
                        }}>
                            Reschedule Now
                        </Button>
                    </div>
                </div>

                <button
                    className="absolute top-2 right-2 sm:right-2 sm:top-2 max-sm:right-2 max-sm:top-2 w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 duration-200 text-black rounded-full"
                    onClick={() => setApptReschedule(false)}
                >
                    <HiXMark size={20} />
                </button>
            </div>
        </div>
    );
};

export default Reschedule;