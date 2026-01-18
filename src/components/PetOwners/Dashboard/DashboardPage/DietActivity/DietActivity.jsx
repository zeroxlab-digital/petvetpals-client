import Button from "@/components/Common/Button/Button";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi2";

const DietActivity = () => {
    const [activeTab, setActiveTab] = useState("diet");
    return (
        <div className="space-y-5">
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Diet & Activity</h2>
                <div>
                    {activeTab === 'diet' ? (
                        <>
                            <Button variant={'primaryOutline'} classNames={'text-sm'}>
                                <HiPlus className='text-lg' /> Log Entry
                            </Button>
                            {/* {medicalRecordPopup && (
                                <ModalPopup isOpen={medicalRecordPopup} onClose={() => setMedicalRecordPopup(false)} title={"Add Medical Record"} icon={<Stethoscope />}>
                                    <AddMedicalRecord petId={petId} onClose={() => setMedicalRecordPopup(false)} />
                                </ModalPopup>
                            )} */}
                        </>
                    )
                        :
                        activeTab === 'energy-activity' && (
                            <>
                                <Button variant={'primaryOutline'} classNames={'text-sm'}>
                                    <HiPlus className='text-lg' /> Energy & Activity
                                </Button>
                                {/* {vaccinationPopup && (
                                    <ModalPopup isOpen={vaccinationPopup} onClose={() => setVaccinationPopup(false)} title={"Add Vaccination"} icon={<Syringe />}>
                                        <AddUpdateVaccination petId={petId} onClose={() => setVaccinationPopup(false)} />
                                    </ModalPopup>
                                )} */}
                            </>
                        )}
                </div>
            </div>
            <div className="diet-activity-tabs flex space-x-3 overflow-x-auto whitespace-nowrap max-md:max-w-max bg-gray-50 border border-gray-200 rounded-md p-2 scrollbar-thin scrollbar-thumb-gray-300">
                {[
                    { key: "diet", label: "Diet Tracking" },
                    { key: "weight", label: "Weight History" },
                    { key: "energy-activity", label: "Energy & Activity" },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`py-2 px-4 rounded-md font-medium text-sm
                                ${activeTab === key
                                ? "bg-primary text-white"
                                : "bg-white text-gray-600 hover:bg-[#f6f0f4] hover:text-primary border border-gray-200"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {activeTab === "diet" && (
                // <MedicalHistory petId={petId} />
                <div>Diet</div>
            )}
            {activeTab === "weight" && (
                // <Vaccinations petId={petId} />
                <div>Weight</div>
            )}
            {activeTab === "energy-activity" && (
                // <AllergiesConditions petId={petId} />
                <div>Energy Activity</div>
            )}
        </div>
    )
}

export default DietActivity;