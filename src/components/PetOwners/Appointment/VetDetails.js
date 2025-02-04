"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Common/Button/Button";
import { HiMiniVideoCamera } from "react-icons/hi2";
import VetDetailsTabs from "@/components/PetOwners/Appointment/VetDetailsTabs";
import BookingPopup from "@/components/PetOwners/Appointment/BookingPopup";
import { HiCalendar, HiOutlineClock, HiXMark } from "react-icons/hi2";
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import { useSelector } from "react-redux";
import useFetchVets from "../../../../hooks/useFetchVets";
import useGetAppts from "../../../../hooks/useGetAppts";
import Link from "next/link";

const VetDetails = ({ params }) => {
    const { authUser } = useSelector((state) => state.user);

    const vets = useFetchVets();
    const foundVet = vets.find(vet => vet._id === params._id);

    const { _id, image, fullName, title, works_at, experience_years, specialities, fees } = foundVet || {};
    const [showModal, setShowModal] = useState(false);

    // Availability Calendar
    const today = new Date();
    const twoDaysFromNow = addDays(today, 5);

    const appointments = useGetAppts();
    const pendingAppts = appointments.filter(appt => appt.status === "pending");

    return (
        <div>
            <div className="bg-white">
                <div>
                    <Image src="/images/cute-dog.jpg" alt="" width={100} height={100} className="w-full h-96 max-sm:h-56 object-cover rounded-md" />
                </div>
                <div className="relative -top-10 grid grid-cols-3 max-lg:grid-cols-1 items-end px-5 pb-0 max-lg:gap-y-10 rounded-md ">
                    <div className="flex max-md:flex-col md:items-end gap-5 col-span-2 ">
                        <div className=""><Image src="/images/vet.png" alt="vet logo" width={200} height={200} className="rounded-full max-md:rounded-md border-2 border-gray-300 max-sm:w-40" /></div>
                        <div className="md:pb-3">
                            <h2 className="mb-2 font-bold text-lg">{fullName}</h2>
                            <p className='mb-2'>{title || "Title goes here"}</p>
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
            <VetDetailsTabs fullName={fullName} title={title || "Title goes here"} />
            <div className="mt-5 grid xl:grid-cols-5 gap-5">
                <div className="p-5 rounded-md bg-white overflow-hidden xl:col-span-2">
                    <h2 className="mb-8 font-semibold text-gray-900">Availability Calendar</h2>
                    <DayPicker
                        mode="single"
                        disabled={[
                            { before: today },
                            { after: twoDaysFromNow },
                            { dayOfWeek: [0, 6] }
                        ]}
                        className="rdp-custom text-center"
                    />
                </div>
                <div className="p-5 rounded-md bg-white xl:col-span-3">
                    <h2 className="font-semibold text-gray-900">FAQs</h2>
                </div>
            </div>
        </div >
    );
};

export default VetDetails;