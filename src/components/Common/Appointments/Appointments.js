"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NoPhoto from '/public/images/vet.png'
import { HiArrowRight, HiChevronDown, HiClock, HiCurrencyDollar, HiMapPin, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineMapPin, HiOutlineStar, HiOutlineTrash, HiVideoCamera } from 'react-icons/hi2';
import { LuCat, LuDog, LuRat } from 'react-icons/lu';
import useGetAppts from '../../../../hooks/useGetAppts';
import axios from 'axios';
import ConfirmBookingModal from './ConfirmBookingModal';


const Appointments = () => {

    const appointments = useGetAppts();

    const status_tabs = ["confirmed", "pending", "cancelled", "past"];
    const [active_status_tab, set_active_status_tab] = useState(status_tabs[0]);

    const filtered_appointments = appointments.filter(appointment => appointment.status === active_status_tab);
    console.log(filtered_appointments);

    const handleAppointmentDlt = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/appointment/delete-appointment/${id}`, {
                withCredentials: true,
            })
            console.log(res);
            if (res.status === 200) {
                console.log("Appointment deleted successfull!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [clickedAppointment, setClickedAppointment] = useState(null);
    const handleConfirmBooking = (appointment) => {
        setClickedAppointment(appointment)
        setShowModal(true);
    }

    return (
        <div>
            <div className='mb-5'>
                <h2 className='font-bold text-2xl mb-1'>Appointments</h2>
                <p className='text-gray-500 '>See your scheduled and all other appointments</p>
            </div>
            <ul className='bg-gray-100 bg-opacity-50 p-2 rounded-md flex items-center gap-2 mb-10'>
                {status_tabs.map((tab, index) => {
                    const count = appointments.filter(appointment => appointment.status === tab).length;

                    return (
                        <li
                            key={index}
                            onClick={() => set_active_status_tab(tab)}
                            className={`${active_status_tab === tab ? 'bg-gray-700 text-gray-100' : 'text-gray-800'} text-sm py-2 w-32 text-center rounded-md cursor-pointer capitalize flex items-center justify-center gap-2`}
                        >
                            {tab} <p className='text-xs relative -top-1 text-gray-400'>{count > 0 && count}</p>
                        </li>
                    );
                })}
            </ul>
            <>
                {filtered_appointments.length > 0 ?
                    <div>
                        {filtered_appointments.map((appointment, index) => (
                            <div key={index} className='grid grid-cols-12 items-center gap-5 border rounded-md p-5 mb-3 last:mb-0'>
                                <div className='text-center col-span-1'>
                                    {(() => {
                                        const dateISO = appointment.date;
                                        const date = new Date(dateISO);
                                        const optionsDay = { weekday: 'long' };
                                        const optionsDate = { day: '2-digit' };
                                        const optionsMonthYear = { month: 'short', year: 'numeric' };

                                        return (
                                            <>
                                                <p className='text-gray-600 font-semibold text-sm'>{date.toLocaleDateString('en-US', optionsDay)}</p>
                                                <h4 className='font-bold text-3xl text-gray-700 mt-1'>{date.toLocaleDateString('en-US', optionsDate)}</h4>
                                                <p className='text-gray-600 text-sm'>{date.toLocaleDateString('en-US', optionsMonthYear)}</p>
                                            </>
                                        );
                                    })()}
                                </div>

                                <div className='flex items-center gap-3 col-span-3'>
                                    <Image src={NoPhoto} alt='vet_img' width={200} height={200} className='w-14 h-auto rounded-full' />
                                    <div>
                                        <h5 className='font-semibold text-lg mb-1'>{appointment.vet?.fullName}</h5>
                                        <p className='text-sm text-gray-500'>Consul. type</p>
                                    </div>
                                </div>
                                <div className='col-span-3'>
                                    <p className='text-gray-600 flex items-center gap-2 mb-2'>
                                        <HiOutlineClock className='text-lg' />
                                        {(() => {
                                            const startISO = appointment.date;
                                            const startDate = new Date(startISO);
                                            const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // Add 30 minutes
                                            const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }; // Format time as HH:MM AM/PM
                                            return `${startDate.toLocaleTimeString('en-US', timeOptions)} - ${endDate.toLocaleTimeString('en-US', timeOptions)}`;
                                        })()}
                                    </p>
                                    <p className='text-gray-600 flex items-center gap-2'><HiOutlineMapPin className='text-lg' /> Online</p>
                                </div>
                                <div className='col-span-2'>
                                    <div className='text-gray-600 flex items-center gap-2 mb-2'><LuDog className='text-lg' /> <p className='flex items-center gap-1'>{appointment?.pet?.name || 'N/A'} <span className='text-xs'>({appointment?.pet?.type || 'N/A'})</span></p></div>
                                    <p className='text-gray-600 flex items-center gap-2'><HiOutlineCurrencyDollar className='text-lg' /> {appointment.payment_status ? 'Paid' : 'Unpaid'}</p>
                                </div>
                                <div className='appointments-actions flex items-center gap-4 col-span-3 justify-end'>

                                    {active_status_tab === 'confirmed' ?
                                        <>
                                            <button className='flex items-center gap-2 bg-white px-5 py-3 rounded-lg text-gray-900 border text-sm'>Edit <HiChevronDown /></button>
                                            <button className='flex items-center gap-2 bg-primary px-5 py-3 rounded-lg text-white text-sm'>Join Now <HiVideoCamera /></button>
                                        </>
                                        :
                                        active_status_tab === 'pending' ?
                                            <>
                                                <button onClick={() => handleConfirmBooking(appointment)} className='flex items-center gap-2 bg-primary px-5 py-3 rounded-lg text-white text-sm'>Click to confirm <HiArrowRight /></button>
                                                <button onClick={() => handleAppointmentDlt(appointment._id)} className='flex items-center gap-2 bg-white px-3 py-3 rounded-lg text-red-400 border  text-sm'> <HiOutlineTrash /></button>
                                                {showModal && <ConfirmBookingModal apptId={clickedAppointment._id} setShowModal={setShowModal}  />}
                                            </>
                                            :
                                            active_status_tab === 'cancelled' ?
                                                <>
                                                    <button className='flex items-center gap-2 bg-primary px-5 py-3 rounded-lg text-white text-sm'>View reason <HiArrowRight /></button>
                                                    <button className='flex items-center gap-2 bg-white px-3 py-3 rounded-lg text-red-400 border  text-sm'> <HiOutlineTrash /></button>
                                                </>
                                                :
                                                <>
                                                    <button className='flex items-center gap-2 bg-primary px-5 py-3 rounded-lg text-white text-sm'>Give a feedback <HiOutlineStar /></button>
                                                </>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div>There is no {active_status_tab} appointment!</div>
                }

            </>
        </div>
    );
};

export default Appointments;