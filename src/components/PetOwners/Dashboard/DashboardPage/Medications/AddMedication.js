import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddMedication = ({ onClose }) => {
    const [vets, setVets] = useState([]);
    useEffect(() => {
        const fetchAllVets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/vet/all-vets`, {});
                console.log(response);
                if (response.status === 200) {
                    setVets(response.data.vets);
                }
            } catch (error) {
                console.error("Error fetching vets:", error);
            }
        }
        fetchAllVets();
    }, []);
    const handleSubmitMedication = (e) => {
        e.preventDefault();
        onClose();
        // Handle medication submission logic here
    };
    return (
        <div>
            <form onSubmit={(e) => handleSubmitMedication(e)} className=''>
                <div>
                    <Label htmlFor="medication">Medication</Label>
                    <Input id="medication" type="text" placeholder="Medication name" />
                </div>
                <div className='grid grid-cols-2 gap-3 max-md:grid-cols-1 my-3'>
                    <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input id="dosage" type="text" placeholder="Medication dosage"></Input>
                    </div>
                    <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input id="frequency" type="text" placeholder="e.g. Daily, Weekly, Monthly"></Input>
                    </div>
                    <div>
                        <Label htmlFor="startDate">Medication start date</Label>
                        <Input id="startDate" type="date" placeholder="Date of start" />
                    </div>
                    <div>
                        <Label htmlFor="timeOfDay">Time of day</Label>
                        <Input id="timeOfDay" type="text" placeholder="e.g. Morning, Afternoon, Evening"></Input>
                    </div>
                    <div>
                        <Label htmlFor="prescribedBy">Prescribed by</Label>
                        <SelectOptions
                            id="prescribedBy"
                            options={vets.map(vet => vet.fullName)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="reason">Reason of medication</Label>
                        <Input id="reason" type="text" placeholder="e.g. Itching"></Input>
                    </div>
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea id="instructions" placeholder="Any special instructions for the medication" classNames={'w-full'} />
                </div>
                <div className='mt-7 flex gap-2 items-center justify-end'>
                    <button onClick={onClose} className='bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'>
                        Cancel
                    </button>
                    <button type="submit" className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover duration-200'>
                        Add Medication
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMedication;