import React, { useState, useEffect } from 'react';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { Switch } from '@mui/material';
import { useAddMedScheduleReminderMutation, useUpdateMedScheduleReminderMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';

const ScheduleMedication = ({ onClose, ongoingMedications, petId, schedule = null, refetch }) => {
    const isEdit = Boolean(schedule);

    const [formData, setFormData] = useState({
        medId: '',
        frequency: '',
        starting_date: '',
        end_date: '',
        reminder_time: '',
        remind_before: '10',
        reminder_methods: [],
        repeat_reminder: false,
    });

    const [addMedScheduleReminder, { isLoading: isAdding }] = useAddMedScheduleReminderMutation();
    const [updateMedScheduleReminder, { isLoading: isUpdating }] = useUpdateMedScheduleReminderMutation();

    useEffect(() => {
        if (isEdit && schedule) {
            setFormData({
                medId: schedule.medId || ongoingMedications?.[0]?._id || '',
                frequency: schedule.frequency || '',
                starting_date: schedule.starting_date?.split('T')[0] || '',
                end_date: schedule.end_date?.split('T')[0] || '',
                reminder_time: schedule.reminder_time || '',
                remind_before: schedule.remind_before || '10',
                reminder_methods: schedule.reminder_methods || [],
                repeat_reminder: schedule.repeat_reminder || false,
            });
        }
    }, [schedule, isEdit, ongoingMedications]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleMethodToggle = (method) => {
        const updated = formData.reminder_methods.includes(method)
            ? formData.reminder_methods.filter((m) => m !== method)
            : [...formData.reminder_methods, method];
        handleChange('reminder_methods', updated);
    };

    const handleSubmitSchedule = async (e) => {
        e.preventDefault();
        try {
            if (!formData.medId) {
                toast.error("Please select a medication");
                return;
            }

            if (isEdit) {
                const res = await updateMedScheduleReminder({
                    scheduleId: schedule._id,
                    scheduleData: formData
                }).unwrap();
                if (res.success) {
                    toast.success("Schedule updated!", { autoClose: 1000 });
                    onClose();
                    refetch?.();
                }
            } else {
                const res = await addMedScheduleReminder({ petId, formData }).unwrap();
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
        <div>
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
                            { label: 'Twice Weekly', value: 'twice_weekly' },
                            { label: 'Once Monthly', value: 'once_monthly' }
                        ]}
                        onChange={(e) => handleChange('frequency', e.target.value)}
                    />
                </div>

                {/* Start and End Dates */}
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

                {/* Reminder Time */}
                <div>
                    <Label htmlFor="time">Reminder time</Label>
                    <Input
                        id="time"
                        type="time"
                        value={formData.reminder_time}
                        onChange={(e) => handleChange('reminder_time', e.target.value)}
                    />
                </div>

                {/* Reminder Settings */}
                <div className="space-y-3 mt-5">
                    <h3 className="text-base font-semibold text-gray-900">Reminder Settings</h3>

                    <div>
                        <Label htmlFor="reminderMinutes">Remind me</Label>
                        <SelectOptions
                            id="reminderMinutes"
                            value={formData.remind_before}
                            options={[
                                { label: 'At dose time', value: '0' },
                                { label: '5 minutes before', value: '5' },
                                { label: '10 minutes before', value: '10' },
                                { label: '15 minutes before', value: '15' },
                                { label: '30 minutes before', value: '30' },
                                { label: '1 hour before', value: '60' }
                            ]}
                            onChange={(e) => handleChange('remind_before', e.target.value)}
                        />
                    </div>

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

                {/* Footer Actions */}
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
        </div>
    );
};

export default ScheduleMedication;
