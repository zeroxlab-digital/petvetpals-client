"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Common/Button/Button";
import { HiMiniVideoCamera } from "react-icons/hi2";
import VetDetailsTabs from "@/components/PetOwners/Appointment/VetDetailsTabs";
import BookingPopup from "@/components/PetOwners/Appointment/BookingPopup";
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import useFetchVets from "../../../../hooks/useFetchVets";
import Link from "next/link";
import FAQs from "@/components/Common/FAQs/FAQs";
import { PetSpinner } from "../../Common/Loader/PetSpinner";
import { useGetAppointmentsQuery } from "@/redux/services/appointmentApi";
import { useIsAuthenticated } from "../../../../hooks/useIsAuthenticated";

const VetDetails = ({ params }) => {
    const {isAuthenticated: authUser } = useIsAuthenticated();
    const { vets, isLoading, error } = useFetchVets();
    const foundVet = vets.find(vet => vet._id === params._id);

    const { _id, image, banner, fullName, degrees, works_at, experience_years, specialities, fees, languages, based_in } = foundVet || {};
    const [showModal, setShowModal] = useState(false);

    // Availability Calendar
    const defaultDate = addDays(new Date(), 0);
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const today = new Date();
    const twoDaysFromNow = addDays(today, 5);

    const availableTimes = [
        '4:30 AM', '5:00 PM', '5:30 PM', '6:00 PM', '7:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
    ];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeSelect = (time) => {
        const [hours, minutesPart] = time.split(':');
        const minutes = parseInt(minutesPart.slice(0, 2));
        const period = minutesPart.slice(-2);

        let hours24 = parseInt(hours);
        if (period === 'PM' && hours24 !== 12) {
            hours24 += 12;
        } else if (period === 'AM' && hours24 === 12) {
            hours24 = 0;
        }

        const newDateWithTime = new Date(selectedDate);
        newDateWithTime.setHours(hours24, minutes, 0);

        setSelectedDate(newDateWithTime);
        setSelectedTime(time);
    };


    const { data } = useGetAppointmentsQuery();

    const pendingAppts = data?.appointments.filter(appt => appt.status === "pending");

    const faqs = [
        { title: "What is PetVetPals?", details: "PetVetPals is an online platform where pet owners can find animal doctors, book appointments, and use telemedicine for video consultations. Along with that, we also provide pet-focused e-commerce services." },
        { title: "How do I book an appointment?", details: "You can book an appointment by signing up on our platform, selecting a veterinarian, and choosing an available time slot." },
        { title: "Can I get prescriptions through PetVetPals?", details: "Yes, after a consultation, veterinarians can provide prescriptions, which you can purchase through our platform or from your local pet pharmacy." },
        { title: "Is telemedicine available for all pet types?", details: "Yes, we support consultations for dogs, cats, birds, reptiles, and other small animals. However, some conditions may require in-person visits." },
        { title: "How do I pay for a consultation?", details: "You can pay securely using credit/debit cards, PayPal, or cryptocurrency through our integrated payment system." },
        { title: "Can I cancel or reschedule my appointment?", details: "Yes, you can cancel or reschedule an appointment from your dashboard, but cancellation policies may vary by veterinarian." }
    ];
    if (isLoading) {
        return <PetSpinner />
    }
    if (error) {
        return <div className='max-sm:mt-5 text-center h-[calc(100vh-5.1rem)]'>There was an error fetching vet details!</div>
    }
    return (
        <div>
            <div className="bg-white">
                <div>
                    <div className="relative w-full h-96 max-sm:h-56 rounded-md overflow-hidden">
                        <Image
                            src={banner || "/images/purple-dog-cat.png"}
                            alt="vet-banner"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="relative -top-10 grid grid-cols-3 max-lg:grid-cols-1 items-end px-5 pb-0 max-lg:gap-y-10 rounded-md ">
                    <div className="flex max-md:flex-col md:items-end gap-5 col-span-2 ">
                        <div className=""><Image src={image || "/images/user.jpg"} alt="vet image" width={200} height={200} className="rounded-full max-md:rounded-md border-2 border-gray-300 max-sm:w-32" /></div>
                        <div className="md:pb-3">
                            <h2 className="mb-2 font-bold text-lg">{fullName}</h2>
                            <p className='mb-2'>{degrees[0] || "N/A"}</p>
                            <p className=' text-gray-700 mb-1'>Specialities</p>
                            <div className='flex flex-wrap gap-1'>{specialities?.map((speciality, index) => <p key={index} className='text-xs bg-primary p-1 text-white rounded'>{speciality}</p>)}</div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className='mb-3 text-xl font-bold text-primary text-center flex items-center md:justify-center gap-1'>${fees?.toFixed(2)} USD <span className='text-xs  font-semibold'>/ Appt. fee</span></h1>
                        {pendingAppts && pendingAppts.length > 0 && <div className="mb-2">
                            <h4 className="text-sm text-gray-700">You have {pendingAppts.length} pending appointment, to pay and confirm <Link href="/dashboard/appointments" className="underline text-primary ">click here</Link></h4>
                        </div>}
                        <div className="flex md:justify-center">
                            <Button variant={"primary"} classNames={"max-lg:w-full lg:w-52"} onClick={authUser ? () => setShowModal(true) : () => alert("User must be logged in to perform this action!")} ><HiMiniVideoCamera /> Get appointment</Button>
                        </div>
                        {showModal && <BookingPopup setShowModal={setShowModal} foundVet={foundVet} />}
                    </div>
                </div>
            </div>
            <VetDetailsTabs foundVet={foundVet} />
            <div className="mt-5 grid xl:grid-cols-5 gap-5">
                <div className="p-5 rounded-md bg-white overflow-hidden xl:col-span-2">
                    <h2 className="mb-8 font-semibold text-gray-900">Availability Calendar</h2>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={[
                            { before: today },
                            { after: twoDaysFromNow },
                            { dayOfWeek: [0, 6] }
                        ]}
                        className="rdp-custom text-center"
                    />
                    {selectedDate && (
                        <div className="">
                            <div className="grid grid-cols-3 gap-4">
                                {availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`py-2 px-4 transition duration-300 text-sm font-medium ${selectedTime === time
                                            ? 'bg-primary text-white shadow-lg transform scale-105'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-5 rounded-md bg-white xl:col-span-3">
                    <h2 className="font-semibold text-gray-900 mb-6">FAQs</h2>
                    <FAQs faqs={faqs} />
                </div>
            </div>
        </div >
    );
};

export default VetDetails;