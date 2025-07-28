import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useAddMedicationMutation, useUpdateMedicationMutation } from '@/redux/services/petApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddUpdateMedication = ({ onClose, petId, medication = null }) => {
    const isEdit = Boolean(medication);

    const [vets, setVets] = useState([]);

    const [addMedication, { isLoading: isAdding }] = useAddMedicationMutation();
    const [updateMedication, { isLoading: isUpdating }] = useUpdateMedicationMutation();

    const initialState = medication
        ? {
            medication: medication.medication || '',
            dosage: medication.dosage || '',
            frequency: medication.frequency || '',
            start_date: medication.start_date?.split('T')[0] || new Date().toISOString().split('T')[0],
            timeOfDay: medication.timeOfDay || '',
            prescribed_by: medication.prescribed_by || '',
            reason: medication.reason || '',
            instructions: medication.instructions || ''
        }
        : {
            medication: '',
            dosage: '',
            frequency: '',
            start_date: new Date().toISOString().split('T')[0],
            timeOfDay: '',
            prescribed_by: '',
            reason: '',
            instructions: ''
        };

    const [medicationData, setMedicationData] = useState(initialState);

    useEffect(() => {
        const fetchAllVets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/vet/all-vets`);
                if (response.status === 200) {
                    setVets(response.data.vets);
                }
            } catch (error) {
                console.error("Error fetching vets:", error);
            }
        };
        fetchAllVets();
    }, []);

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
                <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1 my-3'>
                    <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input
                            id="dosage"
                            type="text"
                            placeholder="Medication dosage"
                            name="dosage"
                            required
                            value={medicationData.dosage}
                            onChange={(e) => setMedicationData({ ...medicationData, dosage: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input
                            id="frequency"
                            type="text"
                            placeholder="e.g. Daily, Weekly, Monthly"
                            name="frequency"
                            required
                            value={medicationData.frequency}
                            onChange={(e) => setMedicationData({ ...medicationData, frequency: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="startDate">Medication start date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            name="startDate"
                            value={medicationData.start_date}
                            onChange={(e) => setMedicationData({ ...medicationData, start_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="timeOfDay">Time of day</Label>
                        <Input
                            id="timeOfDay"
                            type="text"
                            placeholder="e.g. Morning, Afternoon, Evening"
                            name="timeOfDay"
                            required
                            value={medicationData.timeOfDay}
                            onChange={(e) => setMedicationData({ ...medicationData, timeOfDay: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="prescribedBy">Prescribed by</Label>
                        <SelectOptions
                            id="prescribedBy"
                            name="prescribedBy"
                            options={vets.map(vet => ({
                                label: vet.fullName,
                                value: vet._id
                            }))}
                            value={medicationData.prescribed_by}
                            placeholder={medicationData.prescribed_by.fullName}
                            onChange={(e) => setMedicationData({ ...medicationData, prescribed_by: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="reason">Reason of medication</Label>
                        <Input
                            id="reason"
                            type="text"
                            placeholder="e.g. Itching"
                            name="reason"
                            required
                            value={medicationData.reason}
                            onChange={(e) => setMedicationData({ ...medicationData, reason: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
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
                        className={`bg-primary text-white w-40 h-11 text-center rounded-md hover:bg-primaryHover duration-200 ${!medicationData.prescribed_by ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!medicationData.prescribed_by}
                    >
                        {(isAdding || isUpdating) ? 'Saving...' : isEdit ? 'Update Medication' : 'Add Medication'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUpdateMedication;
