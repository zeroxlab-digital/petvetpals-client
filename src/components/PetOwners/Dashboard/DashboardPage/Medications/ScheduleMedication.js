import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { Switch } from '@mui/material';
import React, { useState } from 'react';

const ScheduleMedication = ({ onClose, ongoingMedications }) => {

    const handleSubmitSchedule = (e) => {
        e.preventDefault();
        onClose();
        // Handle schedule submission logic here
    };

    // Reminders
    // const [reminderEnabled, setReminderEnabled] = useState(true);
    return (
        <div>
            <form onSubmit={(e) => handleSubmitSchedule(e)} className=''>
                <div className='mb-3'>
                    <Label htmlFor="medication">Medication</Label>
                    <SelectOptions
                        id="medication"
                        options={ongoingMedications.map(med => med.medication)}
                    />
                </div>
                <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <SelectOptions
                        id="frequency"
                        options={[
                            { label: 'Once Daily', value: 'once_daily' },
                            { label: 'Twice Daily', value: 'twice_daily' },
                            { label: 'Every Other Day', value: 'every_other_day' },
                            { label: 'Once Weekly', value: 'once_weekly' },
                            { label: 'Twice Weekly', value: 'twice_weekly' },
                            { label: 'Once Monthly', value: 'once_monthly' }
                        ]}
                    />
                </div>
                <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1 my-3'>
                    <div>
                        <Label htmlFor="startDate">Starting date</Label>
                        <Input id="startDate" type="date" placeholder="Date of start"
                        // name="startDate"
                        // onChange={(e) => setMedicationData({ ...medicationData, start_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="endDate">End date (Optional)</Label>
                        <Input id="endDate" type="date" placeholder="Date of end"
                        // name="endDate"
                        // onChange={(e) => setMedicationData({ ...medicationData, end_date: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="time">Reminder time</Label>
                    <Input id="time" type="time" placeholder="Reminder time"
                    // name="reminder_time"
                    // onChange={(e) => setMedicationData({ ...medicationData, reminder_time: e.target.value })}
                    />
                </div>

                {/* Reminder Settings */}
                <div className="space-y-3 mt-5">
                    <h3 className="text-base font-semibold text-gray-900">Reminder Settings</h3>

                    {/* <div className="flex items-center space-x-2">
                        <Switch
                            id="reminderEnabled"
                            // defaultChecked
                            checked={reminderEnabled}
                            onChange={
                                () => setReminderEnabled(!reminderEnabled)
                            }
                        />
                        <Label htmlFor="reminderEnabled">Enable reminders</Label>
                    </div> */}

                    {/* {formData.reminderEnabled && ( */}
                    <>
                        <div>
                            <Label htmlFor="reminderMinutes">Remind me</Label>
                            <SelectOptions
                                id="reminderMinutes"
                                options={[
                                    { label: 'At dose time', value: '0' },
                                    { label: '5 minutes before', value: '5' },
                                    { label: '10 minutes before', value: '10' },
                                    { label: '15 minutes before', value: '15' },
                                    { label: '30 minutes before', value: '30' },
                                    { label: '1 hour before', value: '60' }
                                ]}
                                default={{ label: '10 minutes before', value: '10' }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Reminder methods</Label>
                            <div className="">
                                <div className="flex items-center space-x-1">
                                    <Switch
                                        id="push-reminder"
                                    // checked={formData.reminderMethods.includes("push")}
                                    // onCheckedChange={(checked) => {
                                    //     const methods = checked
                                    //         ? [...formData.reminderMethods, "push"]
                                    //         : formData.reminderMethods.filter((m) => m !== "push")
                                    //     setFormData((prev) => ({ ...prev, reminderMethods: methods }))
                                    // }}
                                    />
                                    <Label htmlFor="push-reminder">Push notifications</Label>
                                </div>
                                {/* <div className="flex items-center space-x-2">
                                        <Switch
                                            id="email-reminder"
                                        checked={formData.reminderMethods.includes("email")}
                                        onCheckedChange={(checked) => {
                                            const methods = checked
                                                ? [...formData.reminderMethods, "email"]
                                                : formData.reminderMethods.filter((m) => m !== "email")
                                            setFormData((prev) => ({ ...prev, reminderMethods: methods }))
                                        }}
                                        />
                                        <Label htmlFor="email-reminder">Email reminders</Label>
                                    </div> */}
                                <div className="flex items-center space-x-1">
                                    <Switch
                                        id="inapp-reminder"
                                    // checked={formData.reminderMethods.includes("inapp")}
                                    // onCheckedChange={(checked) => {
                                    //     const methods = checked
                                    //         ? [...formData.reminderMethods, "inapp"]
                                    //         : formData.reminderMethods.filter((m) => m !== "inapp")
                                    //     setFormData((prev) => ({ ...prev, reminderMethods: methods }))
                                    // }}
                                    />
                                    <Label htmlFor="inapp-reminder">In-app alerts</Label>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-1">
                            <Switch
                                id="repeatReminder"
                            // checked={formData.repeatReminder}
                            // onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, repeatReminder: checked }))}
                            />
                            <Label htmlFor="repeatReminder">Repeat reminder until marked as taken</Label>
                        </div>
                    </>
                    {/* )} */}
                </div>

                {/*
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Any special instructions for the medication" classNames={'w-full'} />
                </div> */}

                <div className='mt-7 flex gap-2 items-center justify-end'>
                    <button onClick={onClose} className='bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'>
                        Cancel
                    </button>
                    <button type="submit" className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover duration-200'>
                        Schedule Medication
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleMedication;