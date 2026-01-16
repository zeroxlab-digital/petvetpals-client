import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiEllipsisHorizontal, HiEllipsisVertical, HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineTrash, HiPlus } from 'react-icons/hi2';
import { HiOutlinePencilAlt, HiPencilAlt, HiTrash } from 'react-icons/hi';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { Stethoscope, Syringe } from 'lucide-react';
import MedicalHistory from './MedicalHistory';
import Vaccinations from './Vaccinations';
import AddMedicalRecord from './AddUpdateMedicalRecord';
import AllergiesConditions from './AllergiesConditions';
import AddUpdateVaccination from './AddUpdateVaccination';

const HealthRecords = ({ petId }) => {

    const [activeHealthRecordsTab, setActiveHealthRecordTab] = useState("medical-records");

    const [medicalRecordPopup, setMedicalRecordPopup] = useState(false);
    const [vaccinationPopup, setVaccinationPopup] = useState(false);

    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Health Records</h2>
                <div>
                    {activeHealthRecordsTab === 'medical-records' ? (
                        <>
                            <Button onClick={() => setMedicalRecordPopup(true)} variant={'primaryOutline'} classNames={'text-sm'}>
                                <HiPlus className='text-lg' /> Add Medical Record
                            </Button>
                            {medicalRecordPopup && (
                                <ModalPopup isOpen={medicalRecordPopup} onClose={() => setMedicalRecordPopup(false)} title={"Add Medical Record"} icon={<Stethoscope />}>
                                    <AddMedicalRecord petId={petId} onClose={() => setMedicalRecordPopup(false)} />
                                </ModalPopup>
                            )}
                        </>
                    )
                        :
                        activeHealthRecordsTab === 'vaccinations' && (
                            <>
                                <Button onClick={() => setVaccinationPopup(true)} variant={'primaryOutline'} classNames={'text-sm'}>
                                    <HiPlus className='text-lg' /> Add Vaccination
                                </Button>
                                {vaccinationPopup && (
                                    <ModalPopup isOpen={vaccinationPopup} onClose={() => setVaccinationPopup(false)} title={"Add Vaccination"} icon={<Syringe />}>
                                        <AddUpdateVaccination petId={petId} onClose={() => setVaccinationPopup(false)} />
                                    </ModalPopup>
                                )}
                            </>
                        )}
                </div>
            </div>
            <div className="health-records-tabs flex space-x-3 overflow-x-auto whitespace-nowrap max-md:max-w-max bg-gray-50 border border-gray-200 rounded-md p-2 scrollbar-thin scrollbar-thumb-gray-300">
                {[
                    { key: "medical-records", label: "Medical History" },
                    { key: "vaccinations", label: "Vaccinations" },
                    { key: "allergies-conditions", label: "Allergies & Conditions" },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveHealthRecordTab(key)}
                        className={`py-2 px-4 rounded-md font-medium text-sm
                                ${activeHealthRecordsTab === key
                                ? "bg-primary text-white"
                                : "bg-white text-gray-600 hover:bg-[#f6f0f4] hover:text-primary border border-gray-200"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {activeHealthRecordsTab === "medical-records" && (
                <MedicalHistory petId={petId} />
            )}
            {activeHealthRecordsTab === "vaccinations" && (
                <Vaccinations petId={petId} />
            )}
            {activeHealthRecordsTab === "allergies-conditions" && (
                <AllergiesConditions petId={petId} />
            )}
        </div>
    );
};

export default HealthRecords;