"use client";

import Image from "next/image";
import useVets from "../../../../hooks/useVets";
import Button from "@/components/Common/Button/Button";
import { HiMiniVideoCamera } from "react-icons/hi2";
import VetDetailsTabs from "@/components/PetOwners/Appointments/VetDetailsTabs";


const VetDetails = ({ params }) => {
    const vets = useVets();
    const foundVet = vets.find(vet => vet._id === Number(params._id));
    console.log(foundVet);
    const { _id, avator, name, title, works_at, years_of_experiences, specialities, visit_fee_usd, visit_fee_bdt } = foundVet || {};
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
                    <div className="mt-5 flex  justify-center">
                        <Button variant={"primary"} ><HiMiniVideoCamera /> See Vet Now</Button>
                    </div>
                </div>
            </div>
            <div className="mt-10 grid grid-cols-[3fr_2fr] gap-5">
                <VetDetailsTabs name={name} title={title} />
                <div>
                    <div className="p-5 rounded-md border mb-5 h-80">Availability Calendar</div>
                    <div className="p-5 rounded-md border">Some Content</div>
                </div>
            </div>
        </div>
    );
};

export default VetDetails;