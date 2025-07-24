import React from 'react';
import Actions from '@/components/Common/Actions/Actions';
import { useDeleteMedScheduledReminderMutation, useGetScheduledRemindersQuery } from '@/redux/services/petApi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { HiEllipsisVertical, HiOutlineCheckCircle, HiOutlineTrash } from 'react-icons/hi2';
import { displayValue } from '@/utils/displayValue';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { toast } from 'react-toastify';

const ScheduleAndReminders = ({ activeTab, petId }) => {
    const { data, isLoading, isError } = useGetScheduledRemindersQuery({ petId });
    const [deleteMedScheduledReminder, {  }] = useDeleteMedScheduledReminderMutation();
    const scheduledMedications = data?.scheduledReminders || [];
    const handleDelete = async (id) => {
        try {
            const res = await deleteMedScheduledReminder({ id});
            toast.success("Reminder deleted successfully!", { autoClose: 1000 });
        } catch(error) {
            console.log(error)
            toast.error("Reminder did not delete!", { autoClose: 1000 });
        }
    }
    if (isLoading) return <div><PetSpinner /></div>
    return (
        <>
            {activeTab === "schedule-reminders" && (
                <div className='h-screen border rounded-md bg-white overflow-x-auto'>
                    <table className="w-full border-collapse p-5">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                <th className="p-5">Medication</th>
                                <th className="p-5">Reminder time</th>
                                <th className="p-5">Dosage</th>
                                <th className="p-5">Date</th>
                                <th className="p-5">Instructions</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduledMedications.map(dose => (
                                <tr key={dose._id} className="border-b last:border-none hover:bg-gray-50">
                                    <td className="p-5 text-sm">{displayValue(dose.medication.medication)}</td>
                                    <td className="p-5 text-sm">{displayValue(dose.reminder_time)} <span className='text-xs text-gray-800'>/ daily</span></td>
                                    <td className="p-5 text-sm">{displayValue(dose.medication.dosage)}</td>
                                    <td className="p-5 text-sm">{new Date(dose.starting_date).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric' })}-{new Date(dose.end_date).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric' })}</td>
                                    <td className="p-5 text-sm">{displayValue(dose.medication.instructions)}</td>
                                    <td className="px-5 py-3 text-sm flex justify-end  "><span className='relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'><HiEllipsisVertical className='text-xl text-gray-800' />
                                        <Actions
                                            actions={[
                                                // {
                                                //     label: "View Details",
                                                //     icon: <HiOutlineInformationCircle />,
                                                //     onClick: () => handleView(med),
                                                // },
                                                {
                                                    label: "Mark as Given",
                                                    icon: <HiOutlineCheckCircle />,
                                                    // onClick: () => handleMarkComplete(med._id),
                                                },
                                                {
                                                    label: "Edit",
                                                    icon: <HiOutlinePencilAlt />,
                                                    // onClick: () => handleEdit(med),
                                                },
                                                {
                                                    label: "Delete",
                                                    icon: <HiOutlineTrash />,
                                                    onClick: () => handleDelete(dose._id),
                                                },

                                            ]}
                                        />
                                    </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ScheduleAndReminders;