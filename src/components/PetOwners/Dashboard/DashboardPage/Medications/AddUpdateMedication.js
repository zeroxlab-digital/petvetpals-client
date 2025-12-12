import Input from '@/components/Common/Form/Input';
import InputSelector from '@/components/Common/Form/InputSelector';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useAddMedicationMutation, useUpdateMedicationMutation } from '@/redux/services/petApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddUpdateMedication = ({ onClose, petId, medication = null }) => {
    const isEdit = Boolean(medication);

    const [addMedication, { isLoading: isAdding }] = useAddMedicationMutation();
    const [updateMedication, { isLoading: isUpdating }] = useUpdateMedicationMutation();

    const initialState = medication
        ? {
            medication: medication.medication || '',
            dosage: medication.dosage || '',
            frequency: medication.frequency || '',
            start_date: medication.start_date?.split('T')[0] || new Date().toISOString().split('T')[0],
            end_date: medication.end_date?.split('T')[0] || '',
            timeOfDay: medication.time_of_day || '',
            instructions: medication.instructions || ''
        }
        : {
            medication: '',
            dosage: '',
            frequency: '',
            start_date: '',
            end_date: '',
            timeOfDay: '',
            instructions: ''
        };

    const [medicationData, setMedicationData] = useState(initialState);

    const notify = (message, type) => {
        toast(message, { type, autoClose: 1000 });
    };

    const handleSubmitMedication = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                const res = await updateMedication({
                    petId,
                    medicationId: medication._id,
                    medicationData
                }).unwrap();
                if (res.success) {
                    notify("Medication updated successfully!", "success");
                    onClose();
                }
            } else {
                const res = await addMedication({
                    petId,
                    medicationData
                }).unwrap();
                if (res.success) {
                    notify("Medication added successfully!", "success");
                    setMedicationData(initialState);
                    onClose();
                }
            }
        } catch (error) {
            console.error("Error saving medication:", error);
            notify("Error saving medication", "error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmitMedication}>
                <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1'>
                    <div>
                        <Label htmlFor="medication">Medication</Label>
                        <Input
                            id="medication"
                            type="text"
                            placeholder="Medication name"
                            name="medication"
                            required
                            value={medicationData.medication}
                            onChange={(e) => setMedicationData({ ...medicationData, medication: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="dosage" optional>Dosage</Label>
                        <Input
                            id="dosage"
                            type="text"
                            placeholder="e.g., 1 tablet, 5 ml"
                            name="dosage"
                            required
                            value={medicationData.dosage}
                            onChange={(e) => setMedicationData({ ...medicationData, dosage: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <SelectOptions
                            id="frequency"
                            value={medicationData.frequency}
                            required
                            options={[
                                { label: 'Once Daily', value: 'once_daily' },
                                { label: 'Twice Daily', value: 'twice_daily' },
                                { label: 'Every Other Day', value: 'every_other_day' },
                                { label: 'Once Weekly', value: 'once_weekly' },
                                { label: 'Bi-Weekly', value: 'twice_weekly' },
                                { label: 'Once Monthly', value: 'once_monthly' }
                            ]}
                            onChange={(e) => setMedicationData({ ...medicationData, frequency: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label htmlFor="timeOfDay" optional>Time of day</Label>
                        <Input
                            id="timeOfDay"
                            type="text"
                            placeholder="e.g. Morning, Afternoon, Evening"
                            name="timeOfDay"
                            value={medicationData.timeOfDay}
                            onChange={(e) => setMedicationData({ ...medicationData, timeOfDay: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="startDate">Start date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            name="startDate"
                            required
                            value={medicationData.start_date}
                            onChange={(e) => setMedicationData({ ...medicationData, start_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="endDate" optional>End date</Label>
                        <Input
                            id="endDate"
                            type="date"
                            name="endDate"
                            value={medicationData.end_date}
                            onChange={(e) => setMedicationData({ ...medicationData, end_date: e.target.value })}
                        />
                    </div>
                </div>

                <div className='mt-3'>
                    <Label htmlFor="instructions" optional>Instructions</Label>
                    <Textarea
                        id="instructions"
                        placeholder="Any special instructions for the medication"
                        classNames={'w-full'}
                        name="instructions"
                        value={medicationData.instructions}
                        onChange={(e) => setMedicationData({ ...medicationData, instructions: e.target.value })}
                    />
                </div>
                <div className='mt-7 flex gap-2 items-center justify-end'>
                    <button
                        type="button"
                        onClick={onClose}
                        className='w-24 h-11 text-center bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`bg-primary text-white w-40 h-11 text-center rounded-md hover:bg-primaryHover duration-200 ${!medicationData.medication || !medicationData.frequency ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!medicationData.medication || !medicationData.frequency}
                    >
                        {(isAdding || isUpdating) ? 'Saving...' : isEdit ? 'Update Medication' : 'Add Medication'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUpdateMedication;
