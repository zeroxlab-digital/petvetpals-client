import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useAddMedicationMutation } from '@/redux/services/petApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddMedication = ({ onClose, petId }) => {
    const [vets, setVets] = useState([]);
    useEffect(() => {
        const fetchAllVets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/vet/all-vets`, {});
                if (response.status === 200) {
                    setVets(response.data.vets);
                }
            } catch (error) {
                console.error("Error fetching vets:", error);
            }
        }
        fetchAllVets();
    }, []);
    const [medicationData, setMedicationData] = useState({
        medication: '',
        dosage: '',
        frequency: '',
        start_date: new Date().toISOString().split('T')[0], // Default to today's date
        timeOfDay: '',
        prescribed_by: '',
        reason: '',
        instructions: ''
    });
    const [addMedication, { isLoading, isError, isSuccess }] = useAddMedicationMutation();
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    }
    const handleSubmitMedication = async (e) => {
        e.preventDefault();
        try {
            const res = await addMedication({
                petId,
                medicationData
            }).unwrap();
            if (res.success) {
                notify("Medication added successfully!", "success");
                onClose();
                setMedicationData({
                    medication: '',
                    dosage: '',
                    frequency: '',
                    start_date: new Date().toISOString().split('T')[0],
                    timeOfDay: '',
                    prescribed_by: '',
                    reason: '',
                    instructions: ''
                })
            }
        } catch (error) {
            console.error("Error adding medication:", error);
        }
    };
    return (
        <div>
            <form onSubmit={(e) => handleSubmitMedication(e)} className=''>
                <div>
                    <Label htmlFor="medication">Medication</Label>
                    <Input id="medication" type="text" placeholder="Medication name" name="medication"
                        onChange={(e) => setMedicationData({ ...medicationData, medication: e.target.value })}
                    />
                </div>
                <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1 my-3'>
                    <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input id="dosage" type="text" placeholder="Medication dosage" name="dosage"
                            onChange={(e) => setMedicationData({ ...medicationData, dosage: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input id="frequency" type="text" placeholder="e.g. Daily, Weekly, Monthly" name="frequency"
                            onChange={(e) => setMedicationData({ ...medicationData, frequency: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="startDate">Medication start date</Label>
                        <Input id="startDate" type="date" placeholder="Date of start" name="startDate"
                            onChange={(e) => setMedicationData({ ...medicationData, start_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="timeOfDay">Time of day</Label>
                        <Input id="timeOfDay" type="text" placeholder="e.g. Morning, Afternoon, Evening" name="timeOfDay"
                            onChange={(e) => setMedicationData({ ...medicationData, timeOfDay: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="prescribedBy">Prescribed by</Label>
                        <SelectOptions
                            id="prescribedBy"
                            options={vets.map(vet => ({
                                label: vet.fullName,
                                value: vet._id
                            }))}
                            name="prescribedBy"
                            onChange={(e) => setMedicationData({ ...medicationData, prescribed_by: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="reason">Reason of medication</Label>
                        <Input id="reason" type="text" placeholder="e.g. Itching" name="reason"
                            onChange={(e) => setMedicationData({ ...medicationData, reason: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Any special instructions for the medication" classNames={'w-full'} name="instructions"
                        onChange={(e) => setMedicationData({ ...medicationData, instructions: e.target.value })}
                    />
                </div>
                <div className='mt-7 flex gap-2 items-center justify-end'>
                    <button onClick={onClose} className='bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'>
                        Cancel
                    </button>
                    <button type="submit" className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover duration-200'>
                        {isLoading ? 'Loading...' : 'Add Medication'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMedication;