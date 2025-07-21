import React, { useEffect, useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiEllipsisHorizontal, HiPlus, HiPencil, HiTrash, HiOutlineTrash, HiSparkles, HiClock } from 'react-icons/hi2';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import axios from 'axios';
import { useGetMedicationsQuery } from '@/redux/services/petApi';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import TinySpinner from '@/components/Common/Loader/TinySpinner';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import AddMedication from './AddMedication';
import { MessageCircle } from 'lucide-react';
import { LuPill } from 'react-icons/lu';
import ScheduleMedication from './ScheduleMedication';

const Medications = ({ petId }) => {
    const [activeTab, setActiveTab] = useState("current-medications");

    // const medications = [
    //     {
    //         id: 1,
    //         name: "Heartworm Prevention",
    //         dosage: "1 tablet",
    //         frequency: "Monthly",
    //         nextDue: "2024-03-15",
    //         instructions: "Give with food",
    //         remainingDoses: 5,
    //     },
    //     {
    //         id: 2,
    //         name: "Joint Supplement",
    //         dosage: "2 tablets",
    //         frequency: "Daily",
    //         nextDue: "2024-02-28",
    //         instructions: "Morning and evening with meals",
    //         remainingDoses: 14,
    //     },
    //     {
    //         id: 3,
    //         name: "Flea & Tick",
    //         dosage: "1 application",
    //         frequency: "Monthly",
    //         nextDue: "2024-03-10",
    //         instructions: "Apply to back of neck",
    //         remainingDoses: 2,
    //     },
    // ];

    const [scheduledDoses, setScheduledDoses] = useState([
        {
            id: 101,
            medicationName: "Heartworm Prevention",
            date: "2024-03-15",
            timeOfDay: "Morning",
            dosage: "1 tablet",
            instructions: "Give with food",
            isGiven: false
        }
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        medicationName: '',
        date: '',
        timeOfDay: '',
        dosage: '',
        instructions: '',
    });

    const openForm = (data = null) => {
        if (data) {
            setFormData(data);
        } else {
            setFormData({ id: null, medicationName: '', date: '', timeOfDay: '', dosage: '', instructions: '' });
        }
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            setScheduledDoses(prev => prev.map(dose => dose.id === formData.id ? { ...formData, isGiven: dose.isGiven } : dose));
        } else {
            const newId = Date.now();
            setScheduledDoses(prev => [...prev, { ...formData, id: newId, isGiven: false }]);
        }
        closeForm();
    };

    const handleDelete = (id) => {
        setScheduledDoses(prev => prev.filter(d => d.id !== id));
    };

    const toggleGiven = (id) => {
        setScheduledDoses(prev => prev.map(d => d.id === id ? { ...d, isGiven: !d.isGiven } : d));
    };

    const { data, isLoading, error } = useGetMedicationsQuery({ petId });
    const [medications, setMedications] = useState([]);
    useEffect(() => {
        try {
            if (data?.success) {
                setMedications(data.medications);
            }
        } catch (error) {
            console.error("Error fetching medications:", error);
        }
    }, [data]);

    // Filter out the medications that are currently ongoing vs not
    const ongoingMedications = medications.filter(med => med.is_ongoing === true);
    const notOngoingMedications = medications.filter(med => med.is_ongoing === false);

    const [openPopup, setOpenPopup] = useState(false);

    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Medications & Treatment</h2>
                {activeTab === 'schedule-reminders' && (
                    <>
                        <Button onClick={() => setOpenPopup(true)} variant={'primaryOutline'} classNames={'text-sm'}>
                            <HiPlus className='text-lg' /> Add to Schedule
                        </Button>
                        <ModalPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} title={"Schedule Medication"} icon={<HiClock />}>
                            <ScheduleMedication onClose={() => setOpenPopup(false)} />
                        </ModalPopup>
                    </>
                )}
                {activeTab === 'current-medications' && (
                    <>
                        <Button onClick={() => setOpenPopup(true)} variant={'primaryOutline'} classNames={'text-sm'}>
                            <HiPlus className='text-lg' /> Add Medication
                        </Button>
                        <ModalPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} title={"Add Medication"} icon={<LuPill />}>
                            <AddMedication onClose={() => setOpenPopup(false)} />
                        </ModalPopup>
                    </>
                )}
            </div>

            <div className='health-records-tabs flex space-x-5 overflow-x-auto border-b'>
                {[
                    { key: "current-medications", label: "Current Medications" },
                    { key: "medication-history", label: "Medication History" },
                    { key: "schedule-reminders", label: "Schedule & Reminders" },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.key
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ---------------- Current Medications ---------------- */}
            {activeTab === "current-medications" && (
                isLoading ? (
                    <div><PetSpinner /></div>
                )
                    :
                    ongoingMedications.length > 0 ?
                        (
                            <div className='border rounded-md bg-white overflow-x-auto'>
                                <table className="w-full border-collapse p-5">
                                    <thead>
                                        <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                            <th className="p-5">Medication</th>
                                            <th className="p-5">Dosage</th>
                                            <th className="p-5">Frequency</th>
                                            <th className="p-5">Next Due</th>
                                            <th className="p-5">Remaining</th>
                                            <th className="p-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ongoingMedications.map((med, index) => (
                                            <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                                <td className="p-5 text-sm">{med.medication || 'N/A'}</td>
                                                <td className="p-5 text-sm">{med.dosage || 'N/A'}</td>
                                                <td className="p-5 text-sm">{med.frequency || 'N/A'}</td>
                                                <td className="p-5 text-sm">{new Date(med.next_due).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</td>
                                                <td className="p-5 text-sm">{med.remaining || 'N/A'}</td>
                                                <td className="p-5 text-sm flex justify-end"><HiEllipsisHorizontal className='text-xl' /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                        :
                        (
                            <div>
                                No Medications Found!
                            </div>
                        )
            )}

            {/* ---------------- Medication History ---------------- */}
            {activeTab === "medication-history" && (
                isLoading ? (
                    <div>
                        <PetSpinner />
                    </div>
                ) :
                    notOngoingMedications.length > 0 ? (
                        <div className='border rounded-md bg-white overflow-x-auto'>
                            <table className="w-full border-collapse p-5">
                                <thead>
                                    <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                        <th className="p-5">Medication</th>
                                        <th className="p-5">Dosage</th>
                                        <th className="p-5">Frequency</th>
                                        <th className="p-5">Start Date</th>
                                        <th className="p-5">End Date</th>
                                        <th className="p-5">Reason</th>
                                        <th className="p-5 text-right">Prescribed By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notOngoingMedications.map((med, index) => (
                                        <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                            <td className="p-5 text-sm">{med.medication}</td>
                                            <td className="p-5 text-sm">{med.dosage}</td>
                                            <td className="p-5 text-sm">{med.frequency}</td>
                                            <td className="p-5 text-sm">{new Date(med.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</td>
                                            <td className="p-5 text-sm">{new Date(med.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</td>
                                            <td className="p-5 text-sm">{med.reason || 'N/A'}</td>
                                            <td className="p-5 text-sm flex justify-end">{med.prescribed_by.fullName || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            No Medication History Found!
                        </div>
                    )
            )}

            {/* ---------------- Schedule & Reminders ---------------- */}
            {activeTab === "schedule-reminders" && (
                <div className='border rounded-md bg-white overflow-x-auto'>
                    <table className="w-full border-collapse p-5">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                <th className="p-5">Date</th>
                                <th className="p-5">Time</th>
                                <th className="p-5">Medication</th>
                                <th className="p-5">Dosage</th>
                                <th className="p-5">Instructions</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduledDoses.map(dose => (
                                <tr key={dose.id} className="border-b last:border-none hover:bg-gray-50">
                                    <td className="p-5 text-sm">{dose.date}</td>
                                    <td className="p-5 text-sm">{dose.timeOfDay}</td>
                                    <td className="p-5 text-sm">{dose.medicationName}</td>
                                    <td className="p-5 text-sm">{dose.dosage}</td>
                                    <td className="p-5 text-sm">{dose.instructions}</td>
                                    <td className="p-5 text-sm flex justify-end space-x-4">
                                        <button
                                            onClick={() => toggleGiven(dose.id)}
                                            className={`px-3 py-1 text-xs rounded-full font-medium ${dose.isGiven ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {dose.isGiven ? 'Given' : 'Mark as Given'}
                                        </button>
                                        <button onClick={() => openForm(dose)}>
                                            <HiOutlinePencilAlt className='text-blue-500 hover:text-blue-600 text-2xl' />
                                        </button>
                                        <button onClick={() => handleDelete(dose.id)}>
                                            <HiOutlineTrash className='text-red-500 hover:text-red-600 text-2xl' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ---------------- Form Modal ---------------- */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">{formData.id ? "Edit" : "Add"} Schedule</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Medication Name"
                                value={formData.medicationName}
                                onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Dosage"
                                value={formData.dosage}
                                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                            />
                            <input
                                type="date"
                                className="w-full border px-3 py-2 rounded"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Time of Day (e.g. Morning, Evening)"
                                value={formData.timeOfDay}
                                onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                            />
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Instructions"
                                value={formData.instructions}
                                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                            />
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    {formData.id ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Medications;