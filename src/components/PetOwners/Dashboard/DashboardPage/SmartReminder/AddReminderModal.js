import React, { useState } from 'react';
import { Bell, Check, Droplets, Briefcase, BookOpen } from "lucide-react";
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { Switch } from '@mui/material';
import { askNotificationPermission } from '@/utils/askNotificationPermission';
import Textarea from '@/components/Common/Form/Textarea';

const AddReminderModal = ({ isOpen, onClose }) => {
    // Reminder Time Slots
    const reminder_slots = [
        { label: 'One Time Only', value: 'one_time' },
        { label: 'Daily (Once)', value: 'daily_once' },
        { label: 'Daily (Twice)', value: 'daily_twice' },
        { label: 'Weekly (Once)', value: 'weekly_once' },
        { label: 'Weekly (Twice)', value: 'weekly_twice' },
        { label: 'Monthly (Once)', value: 'monthly_once' }
    ]
    // Universal Reminder Types
    const reminder_types = [
        { value: "vet-appointment", label: "Vet Appointment", icon: Briefcase },
        { value: "task", label: "Task", icon: Check },
        { value: "hydration", label: "Hydration", icon: Droplets },
        { value: "vaccination", label: "Vaccination", icon: BookOpen },
        { value: "other", label: "Other", icon: Bell },
    ];

    const [formData, setFormData] = useState({
        reminderType: '',
        frequency: 'one_time',
        reminder_date: '',
        starting_date: '',
        end_date: '',
        reminder_times: [{ time: '', remind_before: '10' }],
        reminder_methods: [],
        repeat_reminder: false,
        note: ''
    })
    console.log(formData);

    const handleFrequencyChange = (value) => {
        const slots = reminder_slots.find(slot => slot.value === value)?.label.includes('Once') ? 1 : (reminder_slots.find(slot => slot.value === value)?.label.includes('Twice') ? 2 : 1);
        const updatedReminders = Array.from({ length: slots }, (_, i) => ({
            time: formData.reminder_times[i]?.time || '',
            remind_before: formData.reminder_times[i]?.remind_before || '10',
        }));
        setFormData((prev) => ({
            ...prev,
            frequency: value,
            reminder_times: updatedReminders
        }))
    }

    const handleMethodToggle = (method) => {
        const updated = formData.reminder_methods.includes(method)
            ? formData.reminder_methods.filter((m) => m !== method)
            : [...formData.reminder_methods, method];
        if (updated.includes('push')) {
            askNotificationPermission();
        }
        setFormData({ ...formData, reminder_methods: updated });
    };

    const handleSubmitSchedule = () => {
        onClose();
    }
    return (
        <form onSubmit={handleSubmitSchedule}>
            {/* Reminder Type */}
            <div className='mb-3'>
                <Label htmlFor="reminderType">Reminder Type</Label>
                <SelectOptions
                    id="reminderType"
                    value={formData.reminderType}
                    options={reminder_types.map(reminder => ({
                        label: reminder.label,
                        value: reminder.value
                    }))}
                    onChange={(e) => setFormData({ ...formData, reminderType: e.target.value })}
                />
            </div>

            {/* Frequency */}
            <div>
                <Label htmlFor="frequency">Frequency</Label>
                <SelectOptions
                    id="frequency"
                    value={formData.frequency}
                    options={reminder_slots}
                    onChange={(e) => handleFrequencyChange(e.target.value)}
                />
            </div>

            {/* Reminder Date | Start & End Dates */}
            {(formData.frequency !== 'one_time') ?
                (
                    <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1 my-3'>
                        <div>
                            <Label htmlFor="startDate">Starting date</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={formData.starting_date}
                                onChange={(e) => setFormData({ ...formData, starting_date: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="endDate">End date (Optional)</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            />
                        </div>
                    </div>
                )
                :
                (
                    <div className='my-3'>
                        <Label htmlFor="reminderDate">Reminder Date</Label>
                        <Input
                            id="reminderDate"
                            type="date"
                            value={formData.reminder_date}
                            onChange={(e) => setFormData({ ...formData, reminder_date: e.target.value })}
                        />
                    </div>
                )
            }

            {/* Reminder Times */}
            <div className="space-y-3 mt-5">
                <h3 className="text-base font-semibold text-gray-900">Reminder Times</h3>
                {formData.reminder_times.map((reminder, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3 items-end">
                        <div>
                            <Label htmlFor={`reminder_time`}>Reminder Time</Label>
                            <Input
                                id={`reminder_time`}
                                type="time"
                                value={reminder.time}
                                onChange={(e) => {
                                    const updated = formData.reminder_times.map((r, i) =>
                                        i === index ? { ...r, time: e.target.value } : r
                                    );
                                    setFormData({ ...formData, reminder_times: updated });
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`remind_before`}>Remind Before</Label>
                            <SelectOptions
                                id={`remind_before`}
                                value={reminder.remind_before}
                                options={[
                                    { label: 'At dose time', value: '0' },
                                    { label: '5 minutes before', value: '5' },
                                    { label: '10 minutes before', value: '10' },
                                    { label: '15 minutes before', value: '15' },
                                    { label: '30 minutes before', value: '30' },
                                    { label: '1 hour before', value: '60' }
                                ]}
                                onChange={(e) => {
                                    const updated = formData.reminder_times.map((r, i) =>
                                        i === index ? { ...r, remind_before: e.target.value } : r
                                    );
                                    setFormData({ ...formData, reminder_times: updated });
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Reminder Notes */}
            <div className='mt-3'>
                <Label htmlFor="note">Notes</Label>
                <Textarea
                    id="note"
                    type="note"
                    value={formData.note}
                    placeholder={"Add any additional notes or details for the reminder..."}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
            </div>

            {/* Reminder Settings */}
            <div className="space-y-3 mt-5">
                <h3 className="text-base font-semibold text-gray-900">Reminder Settings</h3>

                <div className="space-y-2">
                    <Label>Reminder methods</Label>
                    <div className="flex items-center space-x-1">
                        <Switch
                            id="push-reminder"
                            checked={formData.reminder_methods.includes("push")}
                            onChange={() => handleMethodToggle("push")}
                        />
                        <Label htmlFor="push-reminder">Push notifications</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Switch
                            id="in-app-reminder"
                            checked={formData.reminder_methods.includes("in-app")}
                            onChange={() => handleMethodToggle("in-app")}
                        />
                        <Label htmlFor="in-app-reminder">In-app alerts</Label>
                    </div>
                </div>

                <div className="flex items-center space-x-1">
                    <Switch
                        id="repeat_reminder"
                        checked={formData.repeat_reminder}
                        onChange={() => setFormData({ ...formData, repeat_reminder: !formData.repeat_reminder })}
                    />
                    <Label htmlFor="repeat_reminder">Repeat reminder until marked as done</Label>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className='mt-7 flex gap-2 items-center justify-end'>
                <button
                    type="button"
                    onClick={onClose}
                    className='bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    // disabled={isAdding || isUpdating}
                    className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover duration-200'
                >
                    Schedule Reminder
                    {/* {(isAdding || isUpdating) ? 'Saving...' : isEdit ? 'Update Reminder' : 'Schedule Reminder'} */}
                </button>
            </div>
        </form>
    );
};

export default AddReminderModal;