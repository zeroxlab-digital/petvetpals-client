"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NoPhoto from '/public/images/vet.png';
import { HiArrowRight, HiChevronDown, HiClock, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineMapPin, HiOutlineStar, HiOutlineTrash, HiPencilSquare, HiVideoCamera } from 'react-icons/hi2';
import { LuDog } from 'react-icons/lu';
import axios from 'axios';
import ConfirmBookingModal from './ConfirmBookingModal';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { toast } from 'react-toastify';
import Countdown from './Countdown';
import { useDeleteAppointmentMutation, useGetAppointmentsQuery, useUpdateAppointmentMutation } from '@/redux/services/appointmentApi';

const Appointments = () => {
    const { data, isLoading, isError } = useGetAppointmentsQuery();
    const [updateAppointment] = useUpdateAppointmentMutation();

    const handleMakePastAppointment = async (id) => {
        try {
            const res = await updateAppointment({ id, status: "past" }).unwrap();
            console.log("Updated appointment:", res);
        } catch (error) {
            console.error("Failed to update appointment:", error);
        }
    };

    useEffect(() => {
        if (!isLoading && !isError && data?.appointments?.length) {
            data.appointments.forEach(element => {
                const startTime = new Date(element.date);
                const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
                if (new Date().getTime() >= endTime.getTime() && element.status !== "past") {
                    handleMakePastAppointment(element._id);
                }
            });
        }
    }, [data, isLoading, isError]);

    const status_tabs = ["confirmed", "pending", "cancelled", "past"];
    const [active_status_tab, set_active_status_tab] = useState(status_tabs[0]);
    const [showModal, setShowModal] = useState(false);
    const [clickedAppointment, setClickedAppointment] = useState(null);

    const filtered_appointments = data?.appointments.filter(appointment => appointment.status === active_status_tab);

    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1500 });
    }

    const [deleteAppointment] = useDeleteAppointmentMutation();
    const handleAppointmentDlt = (id) => {
        deleteAppointment(id);
        notify("Appointment deleted successfully!", "success");
    }

    const handleConfirmBooking = (appointment) => {
        setClickedAppointment(appointment);
        setShowModal(true);
    };


    if (isLoading) {
        return <PetSpinner />
    }
    return (
        <div className=''>
            <div className='mb-5'>
                <h2 className='font-bold text-2xl mb-1'>Appointments</h2>
                <p className='text-gray-500'>See your scheduled and all other appointments</p>
            </div>

            <ul className='bg-gray-200 bg-opacity-50 p-2 rounded-md flex overflow-auto items-center gap-2 mb-6'>
                {status_tabs.map((tab, index) => {
                    const count = data?.appointments.filter(appointment => appointment.status === tab).length;
                    return (
                        <li
                            key={index}
                            onClick={() => set_active_status_tab(tab)}
                            className={`text-sm py-2 px-4 text-center rounded-md cursor-pointer capitalize flex items-center gap-2 ${active_status_tab === tab ? 'bg-gray-700 text-gray-100' : 'text-gray-800'}`}
                        >
                            {tab} <span className='text-xs text-gray-400'>{count > 0 && count}</span>
                        </li>
                    );
                })}
            </ul>

            {filtered_appointments?.length > 0 ? (
                <div className='space-y-4 max-md:space-y-8'>
                    {filtered_appointments.map((appointment, index) => (
                        <div key={index} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-center gap-5  md:p-3 shadow-sm max-md:shadow-xl max-md:hover:shadow-2xl duration-200 bg-white rounded-md'>
                            <div className='text-center lg:col-span-1 max-md:bg-primary max-md:rounded-md max-md:p-3'>
                                {(() => {
                                    const date = new Date(appointment.date);
                                    return (
                                        <>
                                            <p className='text-gray-600 max-md:text-gray-200 font-semibold text-sm max-md:hidden'>{date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                            <h4 className='font-bold text-3xl text-gray-700 max-md:text-gray-100 mt-1'>{date.toLocaleDateString('en-US', { day: '2-digit' })}</h4>
                                            <p className='text-gray-600 max-md:text-gray-200 text-sm'> <span className='text-gray-600 max-md:text-gray-200 text-sm md:hidden'>{date.toLocaleDateString('en-US', { weekday: 'long' })},</span> {date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className='flex items-center gap-3 lg:col-span-3 px-3'>
                                <Image src={NoPhoto} alt='vet_img' width={200} height={200} className='w-16 h-auto rounded-full' />
                                <div>
                                    <h5 className='font-semibold text-lg mb-1'>{appointment.vet?.fullName}</h5>
                                    <p className='text-sm text-gray-500'>{appointment.vet?.degrees[0]}</p>
                                </div>
                            </div>

                            <div className='lg:col-span-3 px-3'>
                                <p className='text-gray-600 flex items-center gap-2 mb-2'>
                                    <HiOutlineClock className='text-lg' />
                                    {(() => {
                                        const startDate = new Date(appointment.date);
                                        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
                                        // if (new Date().getTime() >= endDate.getTime()) {
                                        //     handleMakePastAppointment();
                                        // }
                                        return `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
                                    })()}
                                </p>
                                <p className='text-gray-600 flex items-center gap-2'><HiOutlineMapPin className='text-lg' /> Online</p>
                            </div>

                            <div className='lg:col-span-2 px-3'>
                                <p className='text-gray-600 flex items-center gap-2 mb-2'><LuDog className='text-lg' /> {appointment?.pet?.name || 'Unavailable'} ({appointment?.pet?.type || ''})</p>
                                <p className='text-gray-600 flex items-center gap-2'><HiOutlineCurrencyDollar className='text-lg' /> {appointment.payment_status ? 'Paid' : 'Unpaid'}</p>
                            </div>

                            <div className='flex flex-wrap gap-4 lg:col-span-3 justify-end p-3'>
                                {active_status_tab === 'confirmed' ? (
                                    <div className='w-full flex items-center max-md:flex-col gap-3'>
                                        <button className='bg-white rounded-lg border text-blue-500 flex items-center justify-center  w-12 max-md:w-full h-12'>
                                            <HiPencilSquare className='text-xl ' />
                                        </button>
                                        {new Date() >= new Date(appointment.date) ? (
                                            <button className='bg-primary rounded-lg text-white text-base flex items-center gap-2 justify-center  w-44 max-md:w-full h-12'>
                                                Join Now <HiVideoCamera />
                                            </button>
                                        ) : (
                                            <Countdown date_time={new Date(appointment.date)} />
                                        )}
                                    </div>
                                ) : active_status_tab === 'pending' ? (
                                    <div className='w-full flex items-center max-md:flex-col-reverse gap-3 '>
                                        <button onClick={() => handleConfirmBooking(appointment)} className='bg-primary rounded-lg text-white w-44 max-md:w-full h-12 flex items-center gap-2  justify-center'>Confirm <HiArrowRight /></button>
                                        <button onClick={() => handleAppointmentDlt(appointment._id)} className='bg-white w-12 max-md:w-full h-12 rounded-lg text-blue-500 border flex items-center justify-center '><HiOutlineTrash className='text-xl' /></button>
                                        {showModal && <ConfirmBookingModal apptId={clickedAppointment._id} setShowModal={setShowModal} />}
                                    </div>
                                ) : (
                                    <button className='bg-primary px-5 py-3 rounded-lg text-white text-sm flex items-center gap-2'>Give Feedback <HiOutlineStar /></button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center'>No {active_status_tab} appointments!</div>
            )}
        </div>
    );
};

export default Appointments;