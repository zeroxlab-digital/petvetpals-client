import React, { useEffect, useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiPlus, HiOutlineTrash, HiClock, HiOutlineInformationCircle, HiEllipsisVertical, HiOutlineCheckCircle } from 'react-icons/hi2';
import { HiOutlineDownload, HiOutlinePencilAlt } from 'react-icons/hi';
import { useDeleteMedicationMutation, useGetMedicationsQuery, useUpdateMedicationMutation } from '@/redux/services/petApi';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import AddMedication from './AddMedication';
import { LuPill } from 'react-icons/lu';
import ScheduleMedication from './ScheduleMedication';
import Actions from '@/components/Common/Actions/Actions';
import MedicationDetails from './MedicationDetails';
import { toast } from 'react-toastify';
import ScheduleAndReminders from './ScheduleAndReminders';

const Medications = ({ petId }) => {
    const [activeTab, setActiveTab] = useState("current-medications");

    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    }

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
    const [viewDetails, setViewDetails] = useState(false);

    const [selectedMed, setSelectedMed] = useState(null);

    const handleView = (med) => {
        setSelectedMed(med);
        setViewDetails(true);
    };

    const handleEdit = (med) => {
        setEditingMed(med);
        setShowEditModal(true);
    };

    const [deleteMedication, { }] = useDeleteMedicationMutation();
    const handleDelete = async (medicationId) => {
        try {
            const response = await deleteMedication({ medicationId }).unwrap();
            if (response.success) {
                notify("Medication deleted successfully!", "success");
            }
        } catch (error) {
            console.log("Error deleting medication:", error);
            notify("Failed to delete medication", "error");
        }
    };

    const [updateMedication, { isError, isSuccess }] = useUpdateMedicationMutation();
    const handleMarkComplete = async (medicationId) => {
        try {
            console.log(medicationId)
            const response = await updateMedication({
                medicationId, medicationData: {
                    is_ongoing: false
                }
            }).unwrap();
            if (response.success) {
                notify("Medication marked as completed successfully!", "success");
            }
        } catch (error) {
            console.error("Error marking medication as complete:", error);
            notify("Failed to mark medication as completed", "error");
        }
    };

    const [scheduledDoses, setScheduledDoses] = useState([
        {
            id: 101,
            medicationName: "Heartworm Prevention",
            date: "2024-03-15",
            timeOfDay: "Morning",
            dosage: "1 tablet",
            instructions: "Give with food",
            isGiven: false
        },
        {
            id: 102,
            medicationName: "Heartworm Prevention",
            date: "2024-03-15",
            timeOfDay: "Morning",
            dosage: "1 tablet",
            instructions: "Give with food",
            isGiven: false
        },
        {
            id: 103,
            medicationName: "Heartworm Prevention",
            date: "2024-03-15",
            timeOfDay: "Morning",
            dosage: "1 tablet",
            instructions: "Give with food",
            isGiven: false
        },
    ]);

    return (
        <div className='space-y-5 h-screen'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Medications & Treatment</h2>
                {activeTab === 'schedule-reminders' && (
                    <>
                        <div className='flex items-center gap-2'>
                            <Button variant={'primaryOutline'} classNames={'text-sm !hover:bg-gray-200'}>
                                <HiOutlineDownload className='text-lg' /> Export Calendar
                            </Button>
                            <Button onClick={() => setOpenPopup(true)} variant={'primary'} classNames={'text-sm '}>
                                <HiPlus className='text-lg' /> Add to Schedule
                            </Button>
                        </div>
                        <ModalPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} title={"Schedule Medication"} icon={<HiClock />}>
                            <ScheduleMedication onClose={() => setOpenPopup(false)} ongoingMedications={ongoingMedications} />
                        </ModalPopup>
                    </>
                )}
                {activeTab === 'current-medications' && (
                    <>
                        <Button onClick={() => setOpenPopup(true)} variant={'primaryOutline'} classNames={'text-sm'}>
                            <HiPlus className='text-lg' /> Add Medication
                        </Button>
                        <ModalPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} title={"Add Medication"} icon={<LuPill />}>
                            <AddMedication onClose={() => setOpenPopup(false)} petId={petId} />
                        </ModalPopup>
                    </>
                )}
            </div>

            <div className='health-records-tabs flex space-x-5 overflow-x-auto border-b'>
                {[
                    { key: "current-medications", label: "Current Medications" },
                    { key: "schedule-reminders", label: "Schedule & Reminders" },
                    { key: "medication-history", label: "Medication History" }
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
                            <div className='min-h-full border rounded-md bg-white overflow-x-auto'>
                                <table className="w-full border-collapse p-5">
                                    <thead>
                                        <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                            <th className="p-5">Medication</th>
                                            <th className="p-5">Dosage</th>
                                            <th className="p-5">Frequency</th>
                                            <th className="p-5">Next due</th>
                                            <th className="p-5">Remaining</th>
                                            <th className="p-5">Reason</th>
                                            <th className="p-5">Prescribed by</th>
                                            <th className="p-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ongoingMedications.map((med, index) => (
                                            <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                                <td className="px-5 py-3 text-sm">{med.medication || 'N/A'}</td>
                                                <td className="px-5 py-3 text-sm">{med.dosage || 'N/A'}</td>
                                                <td className="px-5 py-3 text-sm">{med.frequency || 'N/A'}</td>
                                                <td className="px-5 py-3 text-sm">{new Date(med.next_due).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</td>
                                                <td className="px-5 py-3 text-sm">{med.remaining || 'N/A'}</td>
                                                <td className="px-5 py-3 text-sm">{med.reason || 'N/A'}</td>
                                                <td className="px-5 py-3 text-sm">{med.prescribed_by.fullName || 'N/A'}</td>
                                                <td className="px-5 py-3 text-sm flex justify-end  "><span className='relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'><HiEllipsisVertical className='text-xl text-gray-800' />
                                                    <Actions
                                                        actions={[
                                                            {
                                                                label: "View Details",
                                                                icon: <HiOutlineInformationCircle />,
                                                                onClick: () => handleView(med),
                                                            },
                                                            {
                                                                label: "Edit",
                                                                icon: <HiOutlinePencilAlt />,
                                                                onClick: () => handleEdit(med),
                                                            },
                                                            {
                                                                label: "Delete",
                                                                icon: <HiOutlineTrash />,
                                                                onClick: () => handleDelete(med._id),
                                                            },
                                                            {
                                                                label: "Mark Completed",
                                                                icon: <HiOutlineCheckCircle />,
                                                                onClick: () => handleMarkComplete(med._id),
                                                            },
                                                        ]}
                                                    />
                                                </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {viewDetails &&
                                    <ModalPopup isOpen={viewDetails} onClose={() => setViewDetails(false)} title={selectedMed.medication + " Medication Details"} icon={<HiOutlineInformationCircle />}>
                                        <MedicationDetails med={selectedMed} setViewDetails={setViewDetails} />
                                    </ModalPopup>
                                }
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
                        <div className='min-h-screen border rounded-md bg-white overflow-x-auto'>
                            <table className="w-full border-collapse p-5">
                                <thead>
                                    <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                        <th className="p-5">Medication</th>
                                        <th className="p-5">Dosage</th>
                                        <th className="p-5">Frequency</th>
                                        <th className="p-5">Start date</th>
                                        <th className="p-5">End date</th>
                                        <th className="p-5">Reason</th>
                                        <th className="p-5">Prescribed by</th>
                                        <th className="p-5 text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notOngoingMedications.map((med, index) => (
                                        <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                            <td className="px-5 py-3 text-sm">{med.medication}</td>
                                            <td className="px-5 py-3 text-sm">{med.dosage}</td>
                                            <td className="px-5 py-3 text-sm">{med.frequency}</td>
                                            <td className="px-5 py-3 text-sm">{new Date(med.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</td>
                                            <td className="px-5 py-3 text-sm">{new Date(med.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</td>
                                            <td className="px-5 py-3 text-sm">{med.reason || 'N/A'}</td>
                                            <td className="px-5 py-3 text-sm">{med.prescribed_by.fullName || 'N/A'}</td>
                                            <td className="px-5 py-3 text-sm flex justify-end"><span onClick={() => { setOpenPopup(true), setSelectedMed(med) }} className='cursor-pointer border hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'><HiOutlineInformationCircle className='text-xl text-gray-800' /></span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {openPopup &&
                                <ModalPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} title={selectedMed.medication + " Medication Details"} icon={<HiOutlineInformationCircle />}>
                                    <MedicationDetails med={selectedMed} setOpenPopup={setOpenPopup} />
                                </ModalPopup>
                            }
                        </div>
                    ) : (
                        <div>
                            No Medication History Found!
                        </div>
                    )
            )}
            {/* ---------------- Schedule & Reminders ---------------- */}
            <ScheduleAndReminders activeTab={activeTab} scheduledDoses={scheduledDoses} />
        </div>
    );
};

export default Medications;