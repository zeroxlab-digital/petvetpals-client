import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiEllipsisHorizontal, HiEllipsisVertical, HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineTrash, HiPlus } from 'react-icons/hi2';
import { HiOutlinePencilAlt, HiPencilAlt, HiTrash } from 'react-icons/hi';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { Stethoscope, Syringe } from 'lucide-react';
import MedicalHistory from './MedicalHistory';
import Vaccinations from './Vaccinations';
import AddMedicalRecord from './AddMedicalRecord';
import AddVaccination from './AddVaccination';

const HealthRecords = ({ petId }) => {
    const allergies = [
        { title: "Chicken", description: "Food allergy - Causes mild skin irritation" },
        { title: "Certain Grasses", description: "Environmental - Seasonal symptoms" },
    ]
    const medical_conditions = [
        { title: "Mild Hip Dysplasia", description: "Diagnosed on 2023-05-10 - Managed with supplements" }
    ]
    const [activeHealthRecordsTab, setActiveHealthRecordTab] = useState("medical-records");

    const [medicalRecordPopup, setMedicalRecordPopup] = useState(false);
    const [vaccinationPopup, setVaccinationPopup] = useState(false);
    const [allergyPopup, setAllergyPopup] = useState(false);
    const [conditionPopup, setConditionPopup] = useState(false);
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
                                        <AddVaccination petId={petId} onClose={() => setVaccinationPopup(false)} />
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
                <div className='bg-white rounded-md border p-4'>
                    <h2 className='text-xl mb-1 font-medium'>Allergies & Medical Conditions</h2>
                    <p className='text-gray-600 text-sm'>Manage your pet&apos;s allergies and ongoing conditions</p>
                    <div className='mt-8 space-y-5'>
                        <div>
                            <h4 className='font-medium mb-2'>Known Allergies</h4>
                            <ul className='space-y-3 mb-5'>
                                {allergies.map((allergy, index) => <li key={index} className='border p-3 rounded-md flex items-center justify-between'>
                                    <div>
                                        <h6 className='font-semibold text-sm'>{allergy.title}</h6>
                                        <p className='text-gray-600 text-sm'>{allergy.description}</p>
                                    </div>
                                    <div className='flex item-center gap-2 max-sm:gap-0'>
                                        <Button size={'small'}><HiOutlinePencilAlt className='text-primary text-xl' /></Button>
                                        <Button size={'small'}><HiOutlineTrash className='text-primary text-xl' /></Button>
                                    </div>
                                </li>)}
                            </ul>
                            <Button onClick={() => setAllergyPopup(true)} variant={'primary'} size={'small'} classNames={'text-sm border !px-3 !py-2 rounded-md font-medium'}><HiPlus className='text-lg' /> Add Allergy</Button>
                            {allergyPopup && (
                                <ModalPopup isOpen={allergyPopup} onClose={() => setAllergyPopup(false)} title={"Add Allergy"} icon={<Stethoscope />}>

                                </ModalPopup>
                            )}
                        </div>
                        <hr />
                        <div>
                            <h4 className='font-medium mb-2'>Medical Conditions</h4>
                            <ul className='space-y-3 mb-5'>
                                {medical_conditions.map((condition, index) => <li key={index} className='border p-3 rounded-md flex items-center justify-between'>
                                    <div>
                                        <h6 className='font-semibold text-sm'>{condition.title}</h6>
                                        <p className='text-gray-600 text-sm'>{condition.description}</p>
                                    </div>
                                    <div className='flex item-center gap-2 max-sm:gap-0'>
                                        <Button size={'small'}><HiOutlinePencilAlt className='text-primary text-xl' /></Button>
                                        <Button size={'small'}><HiOutlineTrash className='text-primary text-xl' /></Button>
                                    </div>
                                </li>)}
                            </ul>
                            <Button onClick={() => setConditionPopup(true)} variant={'primary'} size={'small'} classNames={'text-sm border !px-3 !py-2 rounded-md font-medium'}><HiPlus className='text-lg' /> Add Condition</Button>
                            {conditionPopup && (
                                <ModalPopup isOpen={conditionPopup} onClose={() => setConditionPopup(false)} title={"Add Condition"} icon={<Stethoscope />}>

                                </ModalPopup>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HealthRecords;