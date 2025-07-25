import React, { useEffect, useState } from 'react';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useAddMedicalHistoryMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddMedicalRecord = ({ petId, onClose }) => {
    const [vets, setVets] = useState([]);
    const [addMedicalHistory, { isLoading }] = useAddMedicalHistoryMutation();

    const [medicalHistoryData, setMedicalHistoryData] = useState({
        type: '',
        date: new Date().toISOString().split('T')[0],
        vetId: '',
        diagnosis: '',
        treatment: '',
        description: '',
    });
    console.log(medicalHistoryData.vetId)

    const notify = (message, type) => {
        toast(message, { type, autoClose: 1000 });
    };

    useEffect(() => {
        const fetchAllVets = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/vet/all-vets`);
                if (res.status === 200) setVets(res.data.vets);
            } catch (err) {
                console.error("Error fetching vets:", err);
            }
        };
        fetchAllVets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(petId);
            const res = await addMedicalHistory({
                petId,
                medicalHistoryData
            }).unwrap();

            if (res.success) {
                notify("Medical record added successfully!", "success");
                setMedicalHistoryData({
                    type: '',
                    date: new Date().toISOString().split('T')[0],
                    vetId: '',
                    diagnosis: '',
                    treatment: '',
                    description: ''
                });
                onClose();
            }
        } catch (err) {
            console.error("Failed to add medical record:", err);
            notify("Failed to add record", "error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
                    <div>
                        <Label htmlFor="type">Record Type</Label>
                        <Input
                            id="type"
                            type="text"
                            placeholder="e.g. Surgery, Check-up"
                            required
                            value={medicalHistoryData.type}
                            onChange={(e) =>
                                setMedicalHistoryData({ ...medicalHistoryData, type: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            required
                            value={medicalHistoryData.date}
                            onChange={(e) =>
                                setMedicalHistoryData({ ...medicalHistoryData, date: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className='my-4'>
                    <Label htmlFor="vet">Vet</Label>
                    <SelectOptions
                        id="vet"
                        name="vet"
                        options={vets.map((vet) => ({
                            label: vet.fullName,
                            value: vet._id
                        }))}
                        onChange={(e) =>
                            setMedicalHistoryData({ ...medicalHistoryData, vetId: e.target.value })
                        }
                    />
                </div>
                <div className=''>
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input
                        type="text"
                        id="diagnosis"
                        name="diagnosis"
                        placeholder="Describe the diagnosis"
                        value={medicalHistoryData.diagnosis}
                        onChange={(e) =>
                            setMedicalHistoryData({ ...medicalHistoryData, diagnosis: e.target.value })
                        }
                    />
                </div>
                <div className='mt-4'>
                    <Label htmlFor="treatment">Treatment</Label>
                    <Input
                        type="text"
                        id="treatment"
                        name="treatment"
                        placeholder="Describe the treatment"
                        value={medicalHistoryData.treatment}
                        onChange={(e) =>
                            setMedicalHistoryData({ ...medicalHistoryData, treatment: e.target.value })
                        }
                    />
                </div>
                <div className='mt-4'>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe the medical record"
                        value={medicalHistoryData.description}
                        onChange={(e) =>
                            setMedicalHistoryData({ ...medicalHistoryData, description: e.target.value })
                        }
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
                        disabled={!medicalHistoryData.vetId}
                        className={`bg-primary text-white w-40 h-11 text-center rounded-md hover:bg-primaryHover duration-200 ${!medicalHistoryData.vetId ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Saving...' : 'Add Record'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMedicalRecord;
