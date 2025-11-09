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
import ScheduleReminder from './ScheduleReminder';
import { Pill } from 'lucide-react';
import { format, parse } from 'date-fns';

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

const getDoseStatus = (rt) => {
    // console.warn("Reminder time object", rt);

    if (!rt || typeof rt.time !== 'string') return 'invalid';

    const now = new Date();

    const [hours, minutes] = rt.time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'invalid';

    const reminderDate = new Date();
    reminderDate.setHours(hours, minutes, 0, 0);

    const diff = reminderDate - now;

    if (rt.is_given) return 'given';
    if (now > reminderDate) return 'overdue';
    if (diff <= 3600000) return 'countdown';
    if (diff <= 3 * 3600000) return 'pending';
    return 'upcoming';
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
    const { data, isLoading, refetch } = useGetScheduledRemindersQuery({ petId });
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

    const handleMarkGiven = async (id, index) => {
        try {
            await markGivenMedScheduledReminder({ id, index }).unwrap();
            toast.success("Marked as given!", { autoClose: 1000 });
        } catch (error) {
            console.error(error);
            toast.error("Failed to mark as given.", { autoClose: 1000 });
        }
    };

    const [editReminder, setEditReminder] = useState(null);
    const handleEdit = async (reminder) => {
        console.log(reminder)
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

    useEffect(() => {
        const refetchInterval = setInterval(() => {
            refetch(); // from useGetScheduledRemindersQuery
        }, 1 * 60 * 1000); // every 1 minutes

        return () => clearInterval(refetchInterval);
    }, [refetch]);


    // console.log("med reminders:", scheduledMedications)

    if (isLoading) return <PetSpinner />;

    return (
        <div className="space-y-5 h-screen">
            {scheduledMedications.length > 0 ? (
                <>
                    {/* MOBILE CARDS */}
                    <div className="md:hidden grid grid-cols-1 gap-6">
                        {scheduledMedications.map((dose) => {
                            const status = getDoseStatus(dose);
                            const badgeColor = {
                                given: "bg-green-200 text-green-800",
                                overdue: "bg-red-200 text-red-800",
                                upcoming: "bg-blue-100 text-blue-700",
                                pending: "bg-yellow-100 text-yellow-800",
                                countdown: "bg-purple-100 text-purple-800",
                            }[status];

                            const badgeLabel = {
                                given: "Given",
                                overdue: "Overdue",
                                upcoming: "Upcoming",
                                pending: "Soon",
                                countdown: "Almost Time",
                            }[status];

                            const bgColor = {
                                given: "bg-green-400 bg-opacity-15 hover:bg-opacity-20",
                                overdue: "bg-red-400 bg-opacity-15 hover:bg-opacity-20",
                            }[status] || "";

                            return (
                                <article
                                    key={dose._id}
                                    tabIndex={0}
                                    className={`bg-white border border-opacity-30 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl duration-200 ${bgColor}`}
                                >
                                    <header className="flex flex-row justify-between items-center p-5 bg-primary rounded-t-2xl text-white">
                                        <div>
                                            <h3 className="text-lg font-semibold truncate mb-1">
                                                {displayValue(dose?.medication?.medication)}
                                            </h3>
                                            <p className="uppercase text-xs font-semibold tracking-wider text-gray-200 select-none">
                                                {displayValue(dose?.medication?.dosage)} -{" "}
                                                {dose.frequency || "Daily"}
                                            </p>
                                        </div>
                                        <span
                                            onClick={() => handleEdit(dose)}
                                            className="cursor-pointer border rounded-md w-9 h-9 flex items-center justify-center"
                                        >
                                            <HiOutlinePencilAlt className="text-xl text-white" />
                                        </span>
                                    </header>

                                    <main className="flex-grow text-gray-900 p-5 space-y-3">
                                        <div>
                                            <h4 className="text-sm font-semibold mb-0.5 select-none">
                                                Reminder Times
                                            </h4>
                                            <div className="space-y-1">
                                                {dose.reminder_times?.map((rt, idx) => {

                                                    const formattedTime = format(
                                                        parse(rt.time, "HH:mm", new Date()),
                                                        "hh:mm a"
                                                    );


                                                    const status = getDoseStatus(rt);
                                                    if (status === "invalid") return null;
                                                    const badgeColor = {
                                                        given: "bg-green-200 text-green-800",
                                                        overdue: "bg-red-200 text-red-800",
                                                        upcoming: "bg-blue-100 text-blue-700",
                                                        pending: "bg-yellow-100 text-yellow-800",
                                                        countdown: "bg-purple-100 text-purple-800",
                                                    }[status];

                                                    const badgeLabel = {
                                                        given: "Given",
                                                        overdue: "Overdue",
                                                        upcoming: "Upcoming",
                                                        pending: "Soon",
                                                        countdown: "Almost",
                                                    }[status];

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center justify-between gap-2"
                                                        >
                                                            <span>{formattedTime}</span>
                                                            <span
                                                                className={`text-xs px-2 py-0.5 rounded-full ${badgeColor}`}
                                                            >
                                                                {badgeLabel}
                                                            </span>
                                                            {status !== "given" && (
                                                                <button
                                                                    onClick={() => handleMarkGiven(dose._id, idx)}
                                                                    className="text-xs text-blue-600 underline hover:text-blue-800"
                                                                >
                                                                    Mark as Given
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold mb-0.5 select-none">
                                                Next Reminder
                                            </h4>
                                            <div>
                                                {(() => {
                                                    const now = new Date();
                                                    const frequency = dose.frequency || "once_daily";

                                                    const intervalDays = {
                                                        once_daily: 1,
                                                        twice_daily: 1,
                                                        every_other_day: 2,
                                                        once_weekly: 7,
                                                        biweekly: 14,
                                                        once_monthly: 30,
                                                    }[frequency] || 1;

                                                    const reminderInstances = [];

                                                    for (let i = -60; i <= 60; i++) {
                                                        const baseDate = new Date(dose.starting_date);
                                                        baseDate.setDate(baseDate.getDate() + i * intervalDays);

                                                        for (const rt of dose.reminder_times || []) {
                                                            const [h, m] = rt.time.split(":").map(Number);
                                                            const reminderDate = new Date(baseDate);
                                                            reminderDate.setHours(h, m, 0, 0);

                                                            if (
                                                                reminderDate >= new Date(dose.starting_date) &&
                                                                (!dose.end_date || reminderDate <= new Date(dose.end_date))
                                                            ) {
                                                                reminderInstances.push(reminderDate);
                                                            }
                                                        }
                                                    }

                                                    const sorted = reminderInstances.sort((a, b) => a - b);
                                                    let lastReminder = null;
                                                    let nextReminder = null;
                                                    for (const d of sorted) {
                                                        if (d <= now) lastReminder = d;
                                                        if (d > now && !nextReminder) nextReminder = d;
                                                    }

                                                    if (!lastReminder) lastReminder = sorted[0];
                                                    if (!nextReminder) nextReminder = sorted[sorted.length - 1];

                                                    const total = nextReminder - lastReminder;
                                                    const elapsed = now - lastReminder;
                                                    const percent =
                                                        total > 0
                                                            ? Math.min(100, Math.max(0, (elapsed / total) * 100)).toFixed(1)
                                                            : 0;

                                                    return (
                                                        <div className="space-y-1">
                                                            <div className="text-xs text-gray-700 font-medium">
                                                                {nextReminder?.toLocaleString("en-US", {
                                                                    month: "2-digit",
                                                                    day: "2-digit",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                })}
                                                            </div>
                                                            <div className="text-xs text-gray-600">
                                                                {countdowns[dose._id] || "Upcoming"}
                                                            </div>
                                                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                                                                <div
                                                                    className="h-full bg-blue-500 transition-all duration-300"
                                                                    style={{ width: `${percent}%` }}
                                                                />
                                                            </div>
                                                            <div className="text-[10px] text-right text-gray-500">
                                                                {percent}% of this cycle passed
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold mb-0.5 select-none">Date</h4>
                                            <p className="text-gray-700 leading-relaxed">
                                                {new Date(dose?.starting_date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    timeZone: "UTC"
                                                })}{" "}
                                                -{" "}
                                                {new Date(dose?.end_date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    timeZone: "UTC"
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold mb-0.5 select-none">
                                                Instructions
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">
                                                {displayValue(dose?.medication?.instructions)}
                                            </p>
                                        </div>
                                    </main>

                                    <footer className="px-5 py-3 flex justify-end">
                                        <span className="relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center">
                                            <HiEllipsisVertical className="text-xl text-gray-800" />
                                            <Actions
                                                actions={[
                                                    ...dose.reminder_times.map((rt, i) => ({
                                                        label: rt.is_given
                                                            ? `Reminder ${i + 1} (Given)`
                                                            : `Mark Time ${i + 1} as Given`,
                                                        icon: <HiOutlineCheckCircle />,
                                                        disabled: rt.is_given,
                                                        onClick: () => handleMarkGiven(dose._id, i),
                                                    })),
                                                    {
                                                        label: "Edit Reminder",
                                                        icon: <HiOutlinePencilAlt />,
                                                        onClick: () => handleEdit(dose),
                                                    },
                                                    {
                                                        label: "Delete Reminder",
                                                        icon: <HiOutlineTrash />,
                                                        onClick: () => handleDelete(dose._id),
                                                    },
                                                ]}
                                            />
                                        </span>
                                    </footer>

                                    {editReminder && (
                                        <ModalPopup
                                            isOpen={editReminder}
                                            onClose={() => setEditReminder(null)}
                                            title={"Edit Reminder"}
                                            icon={<HiOutlinePencilAlt />}
                                        >
                                            <ScheduleReminder
                                                petId={petId}
                                                ongoingMedications={ongoingMedications}
                                                onClose={() => setEditReminder(null)}
                                                schedule={editReminder}
                                            />
                                        </ModalPopup>
                                    )}
                                </article>
                            );
                        })}
                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block min-h-full border rounded-md bg-white overflow-x-auto">
                        <table className="w-full border-collapse p-5">
                            <thead>
                                <tr className="text-left text-xs md:text-sm text-gray-500 border-b">
                                    <th className="p-5">Medication</th>
                                    <th className="p-5">Reminder time</th>
                                    <th className="p-5">Dosage</th>
                                    <th className="p-5">Next reminder</th>
                                    <th className="p-5">Date</th>
                                    <th className="p-5">Instructions</th>
                                    <th className="p-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduledMedications.map((dose) => {
                                    const status = getDoseStatus(dose);
                                    const badgeColor = {
                                        given: "bg-green-200 text-green-800",
                                        overdue: "bg-red-200 text-red-800",
                                        upcoming: "bg-blue-100 text-blue-700",
                                        pending: "bg-yellow-100 text-yellow-800",
                                        countdown: "bg-purple-100 text-purple-800",
                                    }[status];

                                    const badgeLabel = {
                                        given: "Given",
                                        overdue: "Overdue",
                                        upcoming: "Upcoming",
                                        pending: "Soon",
                                        countdown: "Almost Time",
                                    }[status];

                                    const bgColor = {
                                        given: "bg-green-400 bg-opacity-15 hover:bg-opacity-20",
                                        overdue: "bg-red-400 bg-opacity-15 hover:bg-opacity-20",
                                    }[status] || "";

                                    return (
                                        <tr
                                            key={dose._id}
                                            className={`${bgColor} border-b last:border-none hover:bg-gray-50`}
                                        >
                                            <td className="p-5 text-sm">
                                                {displayValue(dose?.medication?.medication)}
                                            </td>
                                            <td className="p-5 text-sm space-y-1">
                                                {dose.reminder_times?.map((rt, idx) => {

                                                    const formattedTime = format(
                                                        parse(rt.time, "HH:mm", new Date()),
                                                        "hh:mm a"
                                                    );


                                                    const status = getDoseStatus(rt);
                                                    if (status === "invalid") return null;
                                                    const badgeColor = {
                                                        given: "bg-green-200 text-green-800",
                                                        overdue: "bg-red-200 text-red-800",
                                                        upcoming: "bg-blue-100 text-blue-700",
                                                        pending: "bg-yellow-100 text-yellow-800",
                                                        countdown: "bg-purple-100 text-purple-800",
                                                    }[status];

                                                    const badgeLabel = {
                                                        given: "Given",
                                                        overdue: "Overdue",
                                                        upcoming: "Upcoming",
                                                        pending: "Soon",
                                                        countdown: "Almost",
                                                    }[status];

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center justify-between gap-2"
                                                        >
                                                            <span>{formattedTime}</span>
                                                            <span
                                                                className={`text-xs px-2 py-0.5 rounded-full ${badgeColor}`}
                                                            >
                                                                {badgeLabel}
                                                            </span>
                                                            {status !== "given" && (
                                                                <button
                                                                    onClick={() => handleMarkGiven(dose._id, idx)}
                                                                    className="text-xs text-blue-600 underline hover:text-blue-800"
                                                                >
                                                                    Mark as Given
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </td>
                                            <td className="p-5 text-sm">
                                                {displayValue(dose?.medication?.dosage)}
                                            </td>
                                            <td className="p-5 text-sm">
                                                {(() => {
                                                    const now = new Date();
                                                    const frequency = dose.frequency || "once_daily";

                                                    const intervalDays = {
                                                        once_daily: 1,
                                                        twice_daily: 1,
                                                        every_other_day: 2,
                                                        once_weekly: 7,
                                                        biweekly: 14,
                                                        once_monthly: 30,
                                                    }[frequency] || 1;

                                                    const reminderInstances = [];

                                                    for (let i = -60; i <= 60; i++) {
                                                        const baseDate = new Date(dose.starting_date);
                                                        baseDate.setDate(baseDate.getDate() + i * intervalDays);

                                                        for (const rt of dose.reminder_times || []) {
                                                            const [h, m] = rt.time.split(":").map(Number);
                                                            const reminderDate = new Date(baseDate);
                                                            reminderDate.setHours(h, m, 0, 0);

                                                            if (
                                                                reminderDate >= new Date(dose.starting_date) &&
                                                                (!dose.end_date || reminderDate <= new Date(dose.end_date))
                                                            ) {
                                                                reminderInstances.push(reminderDate);
                                                            }
                                                        }
                                                    }

                                                    const sorted = reminderInstances.sort((a, b) => a - b);
                                                    let lastReminder = null;
                                                    let nextReminder = null;
                                                    for (const d of sorted) {
                                                        if (d <= now) lastReminder = d;
                                                        if (d > now && !nextReminder) nextReminder = d;
                                                    }

                                                    if (!lastReminder) lastReminder = sorted[0];
                                                    if (!nextReminder) nextReminder = sorted[sorted.length - 1];

                                                    const total = nextReminder - lastReminder;
                                                    const elapsed = now - lastReminder;
                                                    const percent =
                                                        total > 0
                                                            ? Math.min(100, Math.max(0, (elapsed / total) * 100)).toFixed(1)
                                                            : 0;

                                                    return (
                                                        <div className="space-y-1">
                                                            <div className="text-xs text-gray-700 font-medium">
                                                                {nextReminder?.toLocaleString("en-US", {
                                                                    month: "2-digit",
                                                                    day: "2-digit",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                })}
                                                            </div>
                                                            <div className="text-xs text-gray-600">
                                                                {countdowns[dose._id] || "Upcoming"}
                                                            </div>
                                                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                                                                <div
                                                                    className="h-full bg-blue-500 transition-all duration-300"
                                                                    style={{ width: `${percent}%` }}
                                                                />
                                                            </div>
                                                            <div className="text-[10px] text-right text-gray-500">
                                                                {percent}% of this cycle passed
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                            <td className="p-5 text-sm">
                                                {new Date(dose?.starting_date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    timeZone: "UTC"
                                                })}{" "}
                                                -{" "}
                                                {new Date(dose?.end_date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    timeZone: "UTC"
                                                })}
                                            </td>
                                            <td className="p-5 text-sm">
                                                {displayValue(dose?.medication?.instructions)}
                                            </td>
                                            <td className="px-5 py-3 text-sm flex justify-end">
                                                <span className="relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center">
                                                    <HiEllipsisVertical className="text-xl text-gray-800" />
                                                    <Actions
                                                        actions={[
                                                            ...dose.reminder_times.map((rt, i) => ({
                                                                label: rt.is_given
                                                                    ? `Reminder ${i + 1} (Given)`
                                                                    : `Mark Time ${i + 1} as Given`,
                                                                icon: <HiOutlineCheckCircle />,
                                                                disabled: rt.is_given,
                                                                onClick: () => handleMarkGiven(dose._id, i),
                                                            })),
                                                            {
                                                                label: "Edit Reminder",
                                                                icon: <HiOutlinePencilAlt />,
                                                                onClick: () => handleEdit(dose),
                                                            },
                                                            {
                                                                label: "Delete Reminder",
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
                        {editReminder && (
                            <ModalPopup
                                isOpen={editReminder}
                                onClose={() => setEditReminder(null)}
                                title={"Edit Reminder"}
                                icon={<HiOutlinePencilAlt />}
                            >
                                <ScheduleReminder
                                    petId={petId}
                                    ongoingMedications={ongoingMedications}
                                    onClose={() => setEditReminder(null)}
                                    schedule={editReminder}
                                />
                            </ModalPopup>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    <Pill className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Reminders Set!</p>
                    <p className="text-sm">Add a new reminder to get started.</p>
                </div>
            )}
        </div>

    );
};

export default ScheduledReminders;
