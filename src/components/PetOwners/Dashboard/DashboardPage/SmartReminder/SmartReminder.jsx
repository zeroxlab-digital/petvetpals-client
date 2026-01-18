import React, { useState } from 'react';
import { Bell, CalendarClock, ChevronDown, ChevronUp, Plus, Smartphone } from 'lucide-react';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import AddReminderModal from './AddReminderModal';
import Button from '@/components/Common/Button/Button';
import { useDeleteReminderMutation, useGetRemindersQuery, useMarkGivenReminderMutation } from '@/redux/services/reminderApi';
import { toast } from 'react-toastify';
import Reminder from './Reminder';

const SmartReminder = ({ selectedPet }) => {

    const [showReminders, setShowReminders] = useState(false)

    const { data, isLoading: remindersLoading, error } = useGetRemindersQuery();
    const reminders = data?.reminders || [];
    console.log("reminders:", reminders);

    const [markGivenReminder, { isLoading: markLoading, error: markError }] = useMarkGivenReminderMutation();
    const handleMarkGivenReminder = async (reminderId, timeIndex) => {
        try {
            console.log("markGivenReminder called with:", reminderId, timeIndex);
            const res = await markGivenReminder({ reminderId, timeIndex }).unwrap();
            console.log(res);
            toast.success("Reminder marked as given", { autoClose: 2000 });
        } catch (error) {
            console.log(error);
            toast.error("Failed to mark reminder as given. Please try again.", { autoClose: 2000 });
        }
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 text-center">
                        <Smartphone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">
                            {reminders.length}
                        </div>
                        <div className="text-sm text-gray-600">Active Reminders</div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 text-center">
                        <CalendarClock className="h-8 w-8 text-primary mx-auto mb-2" />
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
                </div>

                <>
                    {showReminders && (
                        <div
                            className="space-y-3 mt-6"
                        >
                            {reminders?.map((reminder) => (
                                <Reminder
                                    key={reminder._id}
                                    reminder={reminder}
                                    // onToggle={toggleReminder}
                                    onMarkGiven={handleMarkGivenReminder}
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