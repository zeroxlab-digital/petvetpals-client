import React, { useState, useEffect } from 'react';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { Switch } from '@mui/material';
import { useAddMedScheduleReminderMutation, useUpdateMedScheduleReminderMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';

const getReminderSlots = (frequency) => {
    switch (frequency) {
        case 'once_daily':
        case 'every_other_day':
        case 'once_weekly':
        case 'once_monthly':
            return 1;
        case 'twice_daily':
        case 'twice_weekly':
            return 2;
        default:
            return 1;
    }
};

const ScheduleReminder = ({ onClose, ongoingMedications, petId, schedule = null, refetch }) => {
    const isEdit = Boolean(schedule);

    const [formData, setFormData] = useState({
        medId: '',
        frequency: '',
        starting_date: '',
        end_date: '',
        reminder_times: [{ time: '', remind_before: '10' }],
        reminder_methods: [],
        repeat_reminder: false,
    });

    const [addMedScheduleReminder, { isLoading: isAdding }] = useAddMedScheduleReminderMutation();
    const [updateMedScheduleReminder, { isLoading: isUpdating }] = useUpdateMedScheduleReminderMutation();

    useEffect(() => {
        if (isEdit && schedule) {
            setFormData({
                medId: schedule?.medication._id || '',
                frequency: schedule.frequency || '',
                starting_date: schedule.starting_date?.split('T')[0] || '',
                end_date: schedule.end_date?.split('T')[0] || '',
                reminder_times: schedule.reminder_times || [{ time: '', remind_before: '10' }],
                reminder_methods: schedule.reminder_methods || [],
                repeat_reminder: schedule.repeat_reminder || false,
            });
        }
    }, [isEdit, schedule]);

    useEffect(() => {
        if (!isEdit && formData.medId) {
            const med = ongoingMedications.find(i => i._id === formData.medId);
            if (med) {
                setFormData(prev => ({
                    ...prev,
                    starting_date: med.start_date?.split('T')[0] || '',
                    end_date: med.end_date?.split('T')[0] || '',
                }));
            }
        }
    }, [formData.medId, isEdit, ongoingMedications]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFrequencyChange = (value) => {
        handleChange('frequency', value);
        const slots = getReminderSlots(value);
        const updatedReminders = Array.from({ length: slots }, (_, i) => ({
            time: formData.reminder_times[i]?.time || '',
            remind_before: formData.reminder_times[i]?.remind_before || '10',
        }));
        handleChange('reminder_times', updatedReminders);
    };

    const handleMethodToggle = (method) => {
        const updated = formData.reminder_methods.includes(method)
            ? formData.reminder_methods.filter((m) => m !== method)
            : [...formData.reminder_methods, method];
        handleChange('reminder_methods', updated);
    };

    const handleSubmitSchedule = async (e) => {
        e.preventDefault();

        if (!formData.medId) {
            toast.error("Please select a medication");
            return;
        }

        const payload = {
            ...formData,
            reminder_times: formData.reminder_times.map(r => ({
                time: r.time,
                remind_before: r.remind_before,
            }))
        };

        try {
            if (isEdit) {
                const res = await updateMedScheduleReminder({
                    scheduleId: schedule._id,
                    scheduleData: payload
                }).unwrap();
                if (res.success) {
                    toast.success("Schedule updated!", { autoClose: 1000 });
                    onClose();
                    refetch?.();
                }
            } else {
                const res = await addMedScheduleReminder({ petId, formData: payload }).unwrap();
                if (res.success) {
                    toast.success("Medication scheduled!", { autoClose: 1000 });
                    onClose();
                    refetch?.();
                }
            }
        } catch (err) {
            console.error("Error saving schedule:", err);
            toast.error("Failed to save schedule");
        }
    };

    return (
        <form onSubmit={handleSubmitSchedule}>
            {/* Medication Select */}
            <div className='mb-3'>
                <Label htmlFor="medication">Medication</Label>
                {ongoingMedications?.length > 0 ? (
                    <SelectOptions
                        id="medication"
                        value={formData.medId}
                        options={ongoingMedications.map(med => ({
                            label: med.medication,
                            value: med._id
                        }))}
                        onChange={(e) => handleChange('medId', e.target.value)}
                    />
                ) : (
                    <div className="text-sm text-gray-500">No medications available</div>
                )}
            </div>

            {/* Frequency */}
            <div>
                <Label htmlFor="frequency">Frequency</Label>
                <SelectOptions
                    id="frequency"
                    value={formData.frequency}
                    options={[
                        { label: 'Once Daily', value: 'once_daily' },
                        { label: 'Twice Daily', value: 'twice_daily' },
                        { label: 'Every Other Day', value: 'every_other_day' },
                        { label: 'Once Weekly', value: 'once_weekly' },
                        { label: 'Bi-Weekly', value: 'twice_weekly' },
                        { label: 'Once Monthly', value: 'once_monthly' }
                    ]}
                    onChange={(e) => handleFrequencyChange(e.target.value)}
                />
            </div>

            {/* Start & End Dates */}
            <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1 my-3'>
                <div>
                    <Label htmlFor="startDate">Starting date</Label>
                    <Input
                        id="startDate"
                        type="date"
                        value={formData.starting_date}
                        onChange={(e) => handleChange('starting_date', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="endDate">End date (Optional)</Label>
                    <Input
                        id="endDate"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => handleChange('end_date', e.target.value)}
                    />
                </div>
            </div>

            {/* Reminder Times */}
            <div className="space-y-4 mt-5">
                <h3 className="text-base font-semibold text-gray-900">Reminder Times</h3>
                {formData.reminder_times.map((reminder, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3 items-end">
                        <div>
                            <Label htmlFor={`reminder_time_${index}`}>Reminder Time {index + 1}</Label>
                            <Input
                                id={`reminder_time_${index}`}
                                type="time"
                                value={reminder.time}
                                onChange={(e) => {
                                    const updated = formData.reminder_times.map((r, i) =>
                                        i === index ? { ...r, time: e.target.value } : r
                                    );
                                    handleChange('reminder_times', updated);
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`remind_before_${index}`}>Remind Before</Label>
                            <SelectOptions
                                id={`remind_before_${index}`}
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
                                    handleChange('reminder_times', updated);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Reminder Settings */}
            <div className="space-y-3 mt-7">
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
                        onChange={() => handleChange('repeat_reminder', !formData.repeat_reminder)}
                    />
                    <Label htmlFor="repeat_reminder">Repeat reminder until marked as taken</Label>
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
                    disabled={isAdding || isUpdating}
                    className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover duration-200'
                >
                    {(isAdding || isUpdating) ? 'Saving...' : isEdit ? 'Update Schedule' : 'Schedule Medication'}
                </button>
            </div>
        </form>
    );
};

export default ScheduleReminder;
