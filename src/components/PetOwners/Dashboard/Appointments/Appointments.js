"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiArrowRight, HiOutlineCalendar, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineMapPin, HiOutlineTrash, HiPencilSquare, HiVideoCamera } from 'react-icons/hi2';
import { LuCat, LuDog } from 'react-icons/lu';
import ConfirmBookingModal from './ConfirmBooking';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { toast } from 'react-toastify';
import Countdown from './Countdown';
import { useDeleteAppointmentMutation, useGetAppointmentsQuery, useUpdateAppointmentMutation } from '@/redux/services/appointmentApi';
import GiveFeedback from './GiveFeedback';
import { HiOutlineThumbUp } from 'react-icons/hi';
import Reschedule from './Reschedule';
import BookingPopup from '../../Appointment/BookingPopup';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { Calendar, CalendarClock, CheckCircle, MessageCircle } from 'lucide-react';
import ConfirmBooking from './ConfirmBooking';
import Button from '@/components/Common/Button/Button';
import Link from 'next/link';

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
    const handleMakeCancelledAppointment = async (id) => {
        try {
            const res = await updateAppointment({ id, status: "cancelled" }).unwrap();
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
                if (new Date().getTime() >= endTime.getTime()) {
                    if (element.status === "confirmed") {
                        handleMakePastAppointment(element._id);
                    } else if (element.status === "pending") {
                        handleMakeCancelledAppointment(element._id);
                    }
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
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            deleteAppointment(id);
            notify("Appointment deleted successfully!", "success");
        }
    }

    const handleConfirmBooking = (appointment) => {
        setClickedAppointment(appointment);
        setShowModal(true);
    };

    const [editConfirmAppt, setEditConfirmAppt] = useState({
        show: false,
        appointment: null
    })
    const handleEditConfirmAppt = (appointment) => {
        setEditConfirmAppt({
            show: true,
            appointment: appointment
        })
    }

    const handleJoinNow = (appointment) => {
        console.log("Trigger join appointment:", appointment._id);
        window.open(`https://meet.jit.si/petvetpals-appointment/${appointment._id}#config.prejoinPageEnabled=false`, '_blank');
    }

    // Appointment Reschedule
    const [apptReschedule, setApptReschedule] = useState(false);
    const [appointmentToReschedule, setAppointmentToReschedule] = useState(null);
    const handleApptReschedule = (appointment) => {
        setApptReschedule(true);
        setAppointmentToReschedule(appointment);
    }

    // Give Feedback
    const [giveFeedback, setGiveFeedback] = useState(false);
    const [appointmentToGiveFeedback, setAppointmentToGiveFeedback] = useState(null);
    const handleGiveFeedback = (appointment) => {
        setGiveFeedback(true);
        setAppointmentToGiveFeedback(appointment);
    }

    if (isLoading) {
        return <PetSpinner />
    }
    return (
        <div className=''>
            <div className='mb-5'>
                <h2 className='font-bold text-2xl mb-2 flex items-center gap-3'><span className="bg-primary rounded-md w-10 h-10 flex items-center justify-center text-white"><Calendar /></span> Appointments</h2>
                <p className='text-gray-500'>See your scheduled and all other appointments</p>
            </div>

            <ul className='health-records-tabs flex space-x-3 overflow-x-auto whitespace-nowrap max-md:max-w-max bg-gray-50 border border-gray-200 rounded-md p-2 scrollbar-thin scrollbar-thumb-gray-300'>
                {status_tabs.map((tab, index) => {
                    const count = data?.appointments.filter(appointment => appointment.status === tab).length;
                    return (
                        <li
                            key={index}
                            onClick={() => set_active_status_tab(tab)}
                            className={`capitalize cursor-pointer py-2 px-4 rounded-md font-medium text-sm ${active_status_tab === tab ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-[#f6f0f4] hover:text-primary border border-gray-200'}`}
                        >
                            {tab} <span className='text-xs text-gray-400'>{count > 0 && count}</span>
                        </li>
                    );
                })}
            </ul>

            {filtered_appointments?.length > 0 ? (
                <div className='space-y-5 max-md:space-y-8 sm:max-h-screen sm:overflow-y-auto mt-6'>
                    {filtered_appointments.map((appointment, index) => (
                        <div key={index} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-center gap-5  md:p-3 shadow-sm max-md:shadow-lg max-md:hover:shadow-xl duration-200 bg-white rounded-md'>
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
                                <Image src={"/images/user.jpg"} alt='vet_img' width={200} height={200} className='w-16 h-auto rounded-full border-2' />
                                <div>
                                    <h5 className='font-semibold text-lg mb-1'>{appointment.vet?.fullName}</h5>
                                    <p className='text-sm text-gray-500'>{appointment.vet?.degrees[0]}</p>
                                </div>
                            </div>

                            <div className='lg:col-span-3 px-3'>
                                <p className='text-gray-600 flex items-center gap-2 mb-2'>
                                    <HiOutlineClock className='text-lg text-blue-500' />
                                    {(() => {
                                        const startDate = new Date(appointment.date);
                                        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
                                        return `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
                                    })()}
                                </p>
                                <p className='text-amber-300 flex items-center gap-2'><HiOutlineMapPin className='text-lg' /> Online</p>
                            </div>

                            <div className='lg:col-span-2 px-3'>
                                <p className='text-purple-600 flex items-center gap-2 mb-2'>
                                    {appointment?.pet?.type == 'Dog' ? <LuDog className='text-lg' /> : <LuCat className='text-lg' />}
                                    {appointment?.pet?.name || 'Unknown'} ({appointment?.pet?.type || ''})</p>
                                <p className={`${appointment.payment_status ? 'text-green-500' : 'text-red-500'} flex items-center gap-2`}><HiOutlineCurrencyDollar className='text-lg' /> {appointment.payment_status ? 'Paid' : 'Unpaid'}</p>
                            </div>

                            <div className='flex flex-wrap gap-4 lg:col-span-3 justify-end p-3'>
                                {active_status_tab === 'confirmed' ? (
                                    <div className='w-full flex items-center max-md:flex-col gap-3'>
                                        <button onClick={() => handleEditConfirmAppt(appointment)} className='bg-white hover:bg-primary hover:border-none hover:text-white duration-150 rounded-md border text-primary flex items-center justify-center  w-12 max-md:w-full h-12 gap-2'>
                                            <HiPencilSquare className='text-lg' />
                                            <span className='sm:hidden'>Edit</span>
                                        </button>
                                        {editConfirmAppt.show && <ModalPopup isOpen={editConfirmAppt.show} onClose={() => setEditConfirmAppt({ show: false })} title={"Edit Appointment"} icon={<HiPencilSquare />}>
                                            <div>Show Edit Form</div>
                                        </ModalPopup>}
                                        {new Date() >= new Date(appointment.date) ? (
                                            <button onClick={() => handleJoinNow(appointment)} className='bg-primary hover:bg-primaryHover rounded-md text-white text-base flex items-center gap-2 justify-center  w-44 max-md:w-full h-12'>
                                                Join Now <HiVideoCamera />
                                            </button>
                                        ) : (
                                            <Countdown date_time={new Date(appointment.date)} />
                                        )}
                                    </div>
                                ) : active_status_tab === 'pending' ? (
                                    <div className='w-full flex items-center max-md:flex-col-reverse gap-3 '>
                                        <button onClick={() => handleConfirmBooking(appointment)} className='bg-primary hover:bg-primaryHover rounded-md text-white w-44 max-md:w-full h-12 flex items-center gap-2  justify-center'>Confirm <HiArrowRight /></button>
                                        <button onClick={() => handleAppointmentDlt(appointment._id)} className='bg-white hover:bg-red-500 hover:text-white duration-150 w-12 max-md:w-full h-12 rounded-lg text-red-500 border border-red-500 flex items-center justify-center max-sm:gap-2'><HiOutlineTrash className='text-lg' /> <span className='sm:hidden'>Cancel</span></button>
                                        {showModal && <ModalPopup isOpen={showModal} onClose={() => setShowModal(false)} title={"Confirm your appointment"} icon={<CheckCircle />}>
                                            <ConfirmBooking setShowModal={setShowModal} appt={clickedAppointment} />
                                        </ModalPopup>}
                                    </div>
                                ) : active_status_tab === 'past' ? (
                                    <>
                                        <button onClick={() => handleGiveFeedback(appointment)} className=' hover:bg-primaryHover bg-primary duration-150 px-5 py-3 rounded-md text-white text-sm font-medium flex items-center gap-2 max-sm:w-full justify-center'>Give Feedback <HiOutlineThumbUp size={18} /></button>
                                        {giveFeedback && appointmentToGiveFeedback?._id === appointment._id && <ModalPopup isOpen={giveFeedback} onClose={() => setGiveFeedback(false)} title={"Share Your Experience"} icon={<MessageCircle />}>
                                            <GiveFeedback setGiveFeedback={setGiveFeedback} appointment={appointmentToGiveFeedback} />
                                        </ModalPopup>}
                                    </>
                                ) : <>
                                    <button onClick={() => handleApptReschedule(appointment)} className='bg-primary hover:bg-primaryHover px-5 py-3 rounded-md text-white text-sm font-medium flex items-center gap-2 max-sm:w-full justify-center'>Reschedule Now <HiOutlineCalendar size={18} /></button>
                                    {apptReschedule && <BookingPopup setApptReschedule={setApptReschedule} appointment={appointmentToReschedule} />}
                                </>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 max-sm:h-screen">
                    <CalendarClock className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                    <p className="text-lg font-medium capitalize">No {active_status_tab} Appointment!</p>
                    <p className='text-sm'>
                        {active_status_tab === 'confirmed' ?
                            'Book or confirm a appointment to get started'
                            :
                            active_status_tab === 'pending' ?
                                'Book an appointment to get started'
                                :
                                active_status_tab === 'cancelled' ?
                                    'You have no cancelled appointment'
                                    :
                                    "You have no paste appointment"
                        }
                    </p>
                    <div className='w-full flex items-center justify-center mt-10'>
                        {active_status_tab === 'confirmed' &&
                            <Link href="/vet-appointment"><Button variant={'primaryOutline'}>Book new appointment</Button></Link>
                        }
                        {active_status_tab === 'pending' &&
                            <Link href="/vet-appointment"><Button variant={'primaryOutline'}>Book new appointment</Button></Link>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;