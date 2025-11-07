import React, { useEffect, useState } from 'react';
import { Bell, Calendar, Calendar1, CalendarClock, Check, ChevronDown, ChevronUp, Clock12, Droplets, HeartPulse, Minus, PawPrint, Pill, Plus, Smartphone, Syringe, TrendingUp } from 'lucide-react';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import AddReminderModal from './AddReminderModal';
import Button from '@/components/Common/Button/Button';
import { useDeleteReminderMutation, useGetRemindersQuery } from '@/redux/services/reminderApi';
import { toast } from 'react-toastify';

// Countdown
const getTimeUntil = (reminder) => {
    const baseDateStr = reminder.reminder_date || reminder.starting_date;
    if (!baseDateStr) return null;

    const now = new Date();

    // Remove time part if it exists ('T00:00:00Z')
    const pureDate = baseDateStr.split('T')[0];
    const [year, month, day] = pureDate.split('-').map(Number);

    // Parse safely as local date (no timezone shift)
    const targetDate = new Date(year, month - 1, day);

    // Add reminder time if exists
    const firstTime = reminder.reminder_times?.[0]?.time;
    if (firstTime) {
        const [hours, minutes] = firstTime.split(':').map(Number);
        targetDate.setHours(hours, minutes, 0, 0);
    }

    const diffMs = targetDate - now;
    if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0 };

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    return { days, hours, minutes };
};


// Custom utility function to conditionally join class names
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
}

// Badge component
const Badge = ({ children, variant = "default", className, ...props }) => {
    const variants = {
        default: "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md",
        outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-300",
        success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md",
        danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md",
        info: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md",
        severe: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md animate-pulse",
    }

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide",
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </span>
    )
}

// Reminder Component
const ReminderCard = ({ reminder, onToggle, onDelete }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeUntil(reminder));
    console.log(timeLeft);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeUntil(reminder));
        }, 60000); // update every minute

        return () => clearInterval(interval);
    }, [reminder]);

    const isOverdue = !timeLeft || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0);

    const reminderIcons = {
        Medication: <Pill className="h-4 w-4" />,
        'Vet Appointment': <Calendar className="h-4 w-4" />,
        Vaccination: <Syringe className="h-4 w-4" />,
        Exercise: <HeartPulse className="h-4 w-4" />,
        Hydration: <Droplets className="h-4 w-4" />,
        Other: <PawPrint className="h-4 w-4" />,
    }

    return (
        <div
            className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200",
                isOverdue
                    ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-300"
                    : reminder
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300"
                        : "bg-gray-50 border-gray-200 opacity-60",
            )}
        >
            <div className="flex items-start justify-between max-md:flex-col max-md:gap-4">
                <div className="flex items-start gap-3">
                    <div
                        className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            isOverdue
                                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                : reminder
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                    : "bg-gray-300 text-gray-600",
                        )}
                    >
                        {reminderIcons[reminder.type]}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">{reminder.type || "Reminder title..."}</h3>
                        <p className="text-sm text-gray-600">{reminder.notes || "Notes..."}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className='flex gap-2 items-center font-semibold'><Clock12 size={15} /> {reminder.reminder_times.map(rt => {
                                // return rt.time || '00:00'
                                return new Date(`1970-01-01T${rt.time}`).toLocaleTimeString([], {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                }) || '00:00';
                            })}</span>
                            <p className='flex gap-2 items-center font-semibold capitalize max-sm:hidden'><Calendar1 size={15} />
                                {
                                    reminder.frequency === 'daily_once' ? 'Daily' :
                                        reminder.frequency === 'daily_twice' ? 'Twice Daily' :
                                            reminder.frequency === 'weekly' ? 'Weekly' :
                                                reminder.frequency === 'bi-weekly' ? 'Bi-Weekly' :
                                                    reminder.frequency === 'monthly' ? 'Monthly' : 'One Time'
                                }

                                <span>•</span>

                                {
                                    reminder.frequency === 'one_time' ?
                                        (
                                            new Date(reminder.reminder_date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                // year: 'numeric',
                                                timeZone: 'UTC'
                                            })
                                        )
                                        :
                                        (
                                            `
                                            ${new Date(reminder.starting_date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                // year: 'numeric',
                                                timeZone: 'UTC'
                                            })
                                            }
                                             - 
                                            ${new Date(reminder.end_date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                // year: 'numeric',
                                                timeZone: 'UTC'
                                            })
                                            }
                                            `
                                        )
                                }
                            </p>
                            {isOverdue ? (
                                <Badge variant="danger" className="text-xs">
                                    Overdue
                                </Badge>
                            ) : timeLeft ? (
                                <Badge variant="info" className="text-xs font-medium px-1 py-0.5">
                                    {timeLeft.days > 0 && `${timeLeft.days}d `}{timeLeft.hours}h {timeLeft.minutes}m
                                </Badge>
                            ) : (
                                <Badge variant="success" className="text-xs">
                                    Due now
                                </Badge>
                            )}
                        </div>
                        <p className='flex gap-2 items-center font-semibold capitalize mt-2 text-xs text-gray-500 sm:hidden'><Calendar1 size={15} />
                            {
                                reminder.frequency === 'daily_once' ? 'Daily' :
                                    reminder.frequency === 'daily_twice' ? 'Twice Daily' :
                                        reminder.frequency === 'weekly' ? 'Weekly' :
                                            reminder.frequency === 'bi-weekly' ? 'Bi-Weekly' :
                                                reminder.frequency === 'monthly' ? 'Monthly' : 'One Time'
                            }

                            <span>•</span>

                            {
                                reminder.frequency === 'one_time' ?
                                    (
                                        new Date(reminder.reminder_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            // year: 'numeric',
                                            timeZone: 'UTC'
                                        })
                                    )
                                    :
                                    (
                                        `
                                            ${new Date(reminder.starting_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            // year: 'numeric',
                                            timeZone: 'UTC'
                                        })
                                        }
                                             - 
                                            ${new Date(reminder.end_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            // year: 'numeric',
                                            timeZone: 'UTC'
                                        })
                                        }
                                            `
                                    )
                            }
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onToggle(reminder._id)}
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            reminder
                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                        )}
                    >
                        <Check className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(reminder._id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

const SmartReminder = ({ selectedPet }) => {
    // const mockReminders = [
    //     {
    //         id: "1",
    //         type: "medication",
    //         title: "Give Apoquel",
    //         description: "Daily allergy medication for Buddy",
    //         time: "08:00",
    //         frequency: "daily",
    //         nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    //         active: true,
    //         petId: "1",
    //     },
    //     {
    //         id: "2",
    //         type: "treatment",
    //         title: "Apply medicated shampoo",
    //         description: "Weekly antifungal shampoo treatment",
    //         time: "10:00",
    //         frequency: "weekly",
    //         nextDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    //         active: true,
    //         petId: "1",
    //     },
    //     {
    //         id: "3",
    //         type: "checkup",
    //         title: "Severity assessment",
    //         description: "Rate current itch severity and document progress",
    //         time: "19:00",
    //         frequency: "daily",
    //         nextDue: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    //         active: true,
    //         petId: "1",
    //     },
    // ]
    // const remindersData = selectedPet ? mockReminders.filter((r) => r.petId === selectedPet._id) : []

    const [showReminders, setShowReminders] = useState(false)

    // const [reminders, setReminders] = useState(mockReminders);
    const { data, isLoading: remindersLoading, error } = useGetRemindersQuery();
    const reminders = data?.reminders || [];
    console.log("reminders:", reminders);
    const toggleReminder = (reminderId) => {
        // setReminders((prev) =>
        //     prev.map((reminder) => (reminder.id === reminderId ? { ...reminder, active: !reminder.active } : reminder)),
        // )
    }

    const [deleteReminder, { isLoading: deleteLoading, error: deleteError }] = useDeleteReminderMutation();
    const handleDeleteReminder = async (reminderId) => {
        try {
            await deleteReminder(reminderId).unwrap();
            toast.success("Reminder deleted successfully", { autoClose: 2000 });
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete reminder. Please try again.", { autoClose: 2000 });
        }
    }
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={"bg-white rounded-2xl border"}>
            <div className="flex items-center justify-between space-y-1.5 p-4 rounded-t-2xl border-b border-gray-100">
                <h3 className="flex items-center text-lg font-semibold text-primary">
                    <Bell className="mr-2 h-5 w-5" />
                    Smart Reminder
                </h3>
                <Button variant="primary" size="small" classNames={"text-sm font-medium !gap-1 items-center"} onClick={() => setShowReminders(!showReminders)}>
                    Manage
                    {showReminders ?
                        <ChevronUp className="h-4 w-4" />
                        :
                        <ChevronDown className="h-4 w-4" />
                    }
                </Button>
            </div>
            <div className="pt-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 text-center">
                        <Smartphone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">
                            {reminders.length}
                        </div>
                        <div className="text-sm text-gray-600">Active Reminders</div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 text-center">
                        <CalendarClock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">
                            {
                                reminders.filter(r => {
                                    const today = new Date();
                                    const baseDateStr = r.starting_date || r.reminder_date;
                                    if (!baseDateStr) return false;

                                    // Parse date safely (ignore timezone)
                                    const pureDate = baseDateStr.split('T')[0];
                                    const [year, month, day] = pureDate.split('-').map(Number);
                                    const targetDate = new Date(year, month - 1, day);

                                    const isSameDay =
                                        targetDate.getFullYear() === today.getFullYear() &&
                                        targetDate.getMonth() === today.getMonth() &&
                                        targetDate.getDate() === today.getDate();

                                    return (
                                        isSameDay &&
                                        r.reminder_times?.some(t => !t.is_given && !t.skipped)
                                    );
                                }).length || 0
                            }
                        </div>
                        <div className="text-sm text-gray-600">Due Today</div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 text-center">
                        <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">0%</div>
                        <div className="text-sm text-gray-600">Compliance Rate</div>
                    </div>
                </div>

                <>
                    {showReminders && (
                        <div
                            className="space-y-3 mt-6"
                        >
                            {reminders?.map((reminder) => (
                                <ReminderCard
                                    key={reminder._id}
                                    reminder={reminder}
                                    onToggle={toggleReminder}
                                    onDelete={handleDeleteReminder}
                                />
                            ))}

                            <Button
                                variant="primaryOutline"
                                classNames="w-full bg-transparent border-dashed !mt-5"
                                onClick={() => setShowModal(true)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add New Reminder
                            </Button>
                        </div>
                    )}
                    {showModal && (
                        <ModalPopup isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Reminder" icon={<CalendarClock size={20} />}>
                            <AddReminderModal isOpen={showModal} onClose={() => setShowModal(false)} />
                        </ModalPopup>
                    )}
                </>
            </div>
        </div>
    );
};

export default SmartReminder;