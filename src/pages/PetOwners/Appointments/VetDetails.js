"use client";
import { useState } from "react";
import Image from "next/image";
import useVets from "../../../../hooks/useVets";
import Button from "@/components/Common/Button/Button";
import { HiMiniVideoCamera } from "react-icons/hi2";
import VetDetailsTabs from "@/components/PetOwners/Appointments/VetDetailsTabs";
import BookingPopup from "@/components/PetOwners/Appointments/BookingPopup";
import { HiCalendar, HiOutlineClock, HiXMark } from "react-icons/hi2";
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';

const VetDetails = ({ params }) => {
    const vets = useVets();
    const foundVet = vets.find(vet => vet._id === Number(params._id));
    const { _id, avator, name, title, works_at, years_of_experiences, specialities, visit_fee_usd, visit_fee_bdt } = foundVet || {};
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Availability Calendar
    const today = new Date();
    const twoDaysFromNow = addDays(today, 5);

    return (
        <div>
            <div className="grid grid-cols-[2fr_5fr_3fr] items-center p-5 rounded-md border">
                <div><Image src="/images/vet.png" alt="vet logo" width={200} height={200} className="rounded-md" /></div>
                <div>
                    <h2 className="mb-2 font-bold text-lg">{name}</h2>
                    <p className='mb-2'>{title}</p>
                    <p className=' text-gray-700 mb-1'>Specialities</p>
                    <div className='flex gap-1 mb-3'>{specialities?.map((speciality, index) => <p key={index} className='text-xs bg-primary p-1 text-white rounded'>{speciality}</p>)}</div>
                    <p className="text-gray-700 ">Works at</p>
                    <h5 className="font-semibold">{works_at} <span className="font-normal">(Monroe, LA, USA)</span></h5>
                </div>
                <div className="text-center ">
                    <h3 className="font-bold text-xl mb-1 text-gray-800">Consultation Fee</h3>
                    <h1 className='mb-1 text-2xl font-bold text-primary  flex items-center justify-center gap-1'>${visit_fee_usd?.toFixed(2)} <span className='text-xs  font-semibold'>(incl. VAT)</span></h1>
                    <div className="mt-5 flex  justify-center" onClick={() => setShowBookingModal(true)}>
                        <Button variant={"primary"} ><HiMiniVideoCamera /> See Vet Now</Button>
                    </div>
                    {showBookingModal && <BookingPopup setShowBookingModal={setShowBookingModal} />}
                </div>
            </div>
            <div className="mt-7 grid grid-cols-[3fr_2fr] gap-7">
                <VetDetailsTabs name={name} title={title} />
                <div className="p-5 rounded-md border h-fit">
                    <h2 className="mb-8 font-semibold text-primary">Availability Calendar</h2>
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
            </div>
        </div>
    );
};

export default VetDetails;