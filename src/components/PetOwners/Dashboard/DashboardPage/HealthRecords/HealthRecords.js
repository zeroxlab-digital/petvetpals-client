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
            <div className='health-records-tabs flex space-x-5 overflow-x-auto border-b'>
                <button
                    onClick={() => setActiveHealthRecordTab("medical-records")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "medical-records"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Medical History
                </button>
                <button
                    onClick={() => setActiveHealthRecordTab("vaccinations")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "vaccinations"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Vaccinations
                </button>
                <button
                    onClick={() => setActiveHealthRecordTab("allergies-conditions")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "allergies-conditions"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Allergies & Conditions
                </button>
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