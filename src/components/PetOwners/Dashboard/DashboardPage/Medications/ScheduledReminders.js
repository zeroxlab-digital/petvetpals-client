import React, { useEffect, useMemo, useState } from 'react';
import Actions from '@/components/Common/Actions/Actions';
import {
    useDeleteMedScheduledReminderMutation,
    useGetScheduledRemindersQuery,
    useMarkGivenMedScheduledReminderMutation,
} from '@/redux/services/petApi';
import { HiOutlinePencilAlt, HiPencilAlt } from 'react-icons/hi';
import {
    HiClock,
    HiEllipsisVertical,
    HiOutlineCheckCircle,
    HiOutlineTrash,
} from 'react-icons/hi2';
import { displayValue } from '@/utils/displayValue';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { toast } from 'react-toastify';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import ScheduleMedication from './ScheduleMedication';

const getReminderDateTime = (dose) => {
    let hours = 0, minutes = 0;
    if (dose.reminder_times?.length > 0 && dose.reminder_times[0].time) {
        [hours, minutes] = dose.reminder_times[0].time.split(':').map(Number);
    }

    const baseDate = new Date(dose.starting_date);
    baseDate.setHours(hours, minutes, 0, 0);
    return baseDate;
};

const getNextReminderDate = (dose) => {
    const now = new Date();
    const baseDate = new Date(dose.starting_date);

    for (const rt of dose.reminder_times || []) {
        const [hours, minutes] = rt.time.split(':').map(Number);
        const reminderDate = new Date(baseDate);
        reminderDate.setHours(hours, minutes, 0, 0);

        if (reminderDate >= now) return reminderDate;
    }

    return null;
};

const getDoseStatus = (dose) => {
    const now = new Date();
    const reminderDate = getReminderDateTime(dose);
    const diff = reminderDate - now;

    if (now > reminderDate) {
        return dose.is_given ? 'given' : 'overdue';
    } else if (diff <= 3600000) {
        return 'countdown';
    } else if (diff <= 3 * 3600000) {
        return 'pending';
    } else {
        return 'upcoming';
    }
};

const formatCountdown = (targetTime) => {
    const diff = targetTime - new Date();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const ScheduledReminders = ({ petId, ongoingMedications }) => {
    const { data, isLoading } = useGetScheduledRemindersQuery({ petId });
    const [deleteMedScheduledReminder] = useDeleteMedScheduledReminderMutation();
    const [markGivenMedScheduledReminder] = useMarkGivenMedScheduledReminderMutation();

    const scheduledMedications = useMemo(() => data?.scheduledReminders || [], [data]);
    const [countdowns, setCountdowns] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const updates = {};

            scheduledMedications.forEach((dose) => {
                const nextReminder = getNextReminderDate(dose);
                if (nextReminder) {
                    const countdown = formatCountdown(nextReminder);
                    if (countdown) {
                        updates[dose._id] = countdown;
                    }
                }
            });

            setCountdowns(updates);
        }, 1000);

        return () => clearInterval(interval);
    }, [scheduledMedications]);

    const handleMarkGiven = async (id) => {
        try {
            await markGivenMedScheduledReminder({ id });
            toast.success("Medication marked as given!", { autoClose: 1000 });
        } catch (error) {
            toast.error("Could not mark medication as given!", { autoClose: 1000 });
        }
    };

    const [editReminder, setEditReminder] = useState(null);
    const handleEdit = async (reminder) => {
        try {
            setEditReminder(reminder);
        } catch (error) {
            console.log(error);
            toast.error("There was an error while trying to edit this!", { autoClose: 1000 });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this reminder?")) {
            try {
                await deleteMedScheduledReminder({ id });
                toast.success('Reminder deleted successfully!', { autoClose: 1000 });
            } catch (error) {
                toast.error('Reminder did not delete!', { autoClose: 1000 });
            }
        }
    };

    if (isLoading) return <PetSpinner />;

    return (
        <div>
            {scheduledMedications.length > 0 ? (
                <div className='h-screen border rounded-md bg-white overflow-x-auto'>
                    <table className='w-full border-collapse p-5'>
                        <thead>
                            <tr className='text-left text-xs md:text-sm text-gray-500 border-b'>
                                <th className='p-5'>Medication</th>
                                <th className='p-5'>Reminder time</th>
                                <th className='p-5'>Dosage</th>
                                <th className='p-5'>Next reminder</th>
                                <th className='p-5'>Date</th>
                                <th className='p-5'>Instructions</th>
                                <th className='p-5 text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduledMedications.map((dose) => {
                                const status = getDoseStatus(dose);
                                const badgeColor = {
                                    'given': 'bg-green-200 text-green-800',
                                    'overdue': 'bg-red-200 text-red-800',
                                    'upcoming': 'bg-blue-100 text-blue-700',
                                    'pending': 'bg-yellow-100 text-yellow-800',
                                    'countdown': 'bg-purple-100 text-purple-800',
                                }[status];

                                const badgeLabel = {
                                    'given': 'Given',
                                    'overdue': 'Overdue',
                                    'upcoming': 'Upcoming',
                                    'pending': 'Soon',
                                    'countdown': 'Almost Time',
                                }[status];

                                const bgColor = {
                                    'given': 'bg-green-400 bg-opacity-15 hover:bg-opacity-20',
                                    'overdue': 'bg-red-400 bg-opacity-15 hover:bg-opacity-20',
                                }[status] || '';

                                return (
                                    <tr key={dose._id} className={`${bgColor} border-b last:border-none`}>
                                        <td className='p-5 text-sm'>{displayValue(dose?.medication?.medication)}</td>

                                        <td className='p-5 text-sm'>
                                            {dose.reminder_times?.map(rt => rt.time).join(', ')}
                                            <span className='text-xs text-gray-800'> / {dose.reminder_times?.length || 1}x {
                                                dose.frequency === 'every_other_day' ? 'Every Other Day' :
                                                    dose.frequency === 'once_weekly' ? 'Weekly' :
                                                        dose.frequency === 'bi-weekly' ? 'Bi-Weekly' :
                                                            dose.frequency === 'once_monthly' ? 'Monthly' : 'Daily'
                                            }</span>
                                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${badgeColor}`}>
                                                {badgeLabel}
                                            </span>
                                        </td>

                                        <td className='p-5 text-sm'>{displayValue(dose?.medication?.dosage)}</td>

                                        <td className='p-5 text-sm'>
                                            {(() => {
                                                const nextReminder = getNextReminderDate(dose);
                                                if (!nextReminder) {
                                                    return <span className='text-xs text-gray-500'>No upcoming reminder</span>;
                                                }

                                                const baseline = dose.last_reset ? new Date(dose.last_reset) : new Date(dose.starting_date);
                                                const now = new Date();

                                                const totalDuration = nextReminder - baseline;
                                                const elapsed = now - baseline;
                                                const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)).toFixed(1);

                                                return (
                                                    <div className="space-y-1">
                                                        <div className="text-xs text-gray-700 font-medium">
                                                            {nextReminder.toLocaleString('en-US', {
                                                                month: '2-digit',
                                                                day: '2-digit',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            })}
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            {countdowns[dose._id]}
                                                        </div>
                                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                                                            <div
                                                                className="h-full bg-blue-500 transition-all duration-300"
                                                                style={{ width: `${progressPercent}%` }}
                                                            />
                                                        </div>
                                                        <div className="text-[10px] text-right text-gray-500">
                                                            {progressPercent}% of this cycle passed
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </td>

                                        <td className='p-5 text-sm'>{new Date(dose?.starting_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(dose?.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                        <td className='p-5 text-sm'>{displayValue(dose?.medication?.instructions)}</td>

                                        <td className='px-5 py-3 text-sm flex justify-end'>
                                            <span className='relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'>
                                                <HiEllipsisVertical className='text-xl text-gray-800' />
                                                <Actions
                                                    actions={[
                                                        {
                                                            label: 'Mark as Given',
                                                            icon: <HiOutlineCheckCircle />,
                                                            onClick: () => handleMarkGiven(dose._id),
                                                        },
                                                        {
                                                            label: 'Edit Reminder',
                                                            icon: <HiOutlinePencilAlt />,
                                                            onClick: () => handleEdit(dose),
                                                        },
                                                        {
                                                            label: 'Delete Reminder',
                                                            icon: <HiOutlineTrash />,
                                                            onClick: () => handleDelete(dose._id),
                                                        },
                                                    ]}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>No Reminders Set!</div>
            )}

            {editReminder && (
                <ModalPopup
                    isOpen={editReminder}
                    onClose={() => setEditReminder(null)}
                    title={"Edit Reminder"}
                    icon={<HiPencilAlt />}
                >
                    <ScheduleMedication
                        petId={petId}
                        ongoingMedications={ongoingMedications}
                        onClose={() => setEditReminder(null)}
                        schedule={editReminder}
                    />
                </ModalPopup>
            )}
        </div>
    );
};

export default ScheduledReminders;
