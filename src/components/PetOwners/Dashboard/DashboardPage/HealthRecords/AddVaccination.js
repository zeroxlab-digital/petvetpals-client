import React, { useEffect, useState } from 'react';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useAddVaccinationMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddVaccination = ({ petId, onClose }) => {
    const [providers, setProviders] = useState([]);
    const [addVaccination, { isLoading }] = useAddVaccinationMutation();

    const [vaccinationData, setVaccinationData] = useState({
        vaccine: '',
        date_given: new Date().toISOString().split('T')[0],
        next_due: '',
        status: '',
        provider: '',
        notes: ''
    });

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/vet/all-vets`);
                if (res.status === 200) {
                    setProviders(res.data.vets);
                }
            } catch (err) {
                console.error("Failed to load providers", err);
            }
        };
        fetchProviders();
    }, []);

    const notify = (message, type) => {
        toast(message, { type, autoClose: 1000 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addVaccination({
                petId,
                vaccinationData
            }).unwrap();

            if (res.success) {
                notify('Vaccination added successfully!', 'success');
                setVaccinationData({
                    vaccine: '',
                    date_given: new Date().toISOString().split('T')[0],
                    next_due: '',
                    status: '',
                    provider: '',
                    notes: ''
                });
                onClose();
            }
        } catch (err) {
            console.error("Error adding vaccination:", err);
            notify("Failed to add vaccination", "error");
        }
    };

    const [providerType, setProviderType] = useState("vet");


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
                    <div>
                        <Label htmlFor="vaccine">Vaccine Name</Label>
                        <Input
                            id="vaccine"
                            type="text"
                            placeholder="e.g. Rabies"
                            required
                            value={vaccinationData.vaccine}
                            onChange={(e) => setVaccinationData({ ...vaccinationData, vaccine: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="date_given">Date Given</Label>
                        <Input
                            id="date_given"
                            type="date"
                            value={vaccinationData.date_given}
                            onChange={(e) => setVaccinationData({ ...vaccinationData, date_given: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="next_due">Next Due Date</Label>
                        <Input
                            id="next_due"
                            type="date"
                            value={vaccinationData.next_due}
                            onChange={(e) => setVaccinationData({ ...vaccinationData, next_due: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <SelectOptions
                            id="status"
                            name="status"
                            options={[
                                { label: 'Completed', value: 'completed' },
                                { label: 'Upcoming', value: 'upcoming' },
                                { label: 'Missed', value: 'missed' }
                            ]}
                            onChange={(e) => setVaccinationData({ ...vaccinationData, status: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="providerType">Provider type</Label>
                        <SelectOptions
                            id="providerType"
                            name="providerType"
                            options={[
                                { label: 'Vet', value: 'vet' },
                                { label: 'Pharmacist', value: 'pharmacist' },
                                { label: 'Clinic', value: 'clinic' },
                                { label: 'Hospital', value: 'hospital' },
                                { label: 'Other', value: 'other' }
                            ]}
                            // default={ {label: 'Vet', value: 'vet'} }
                            onChange={(e) => setProviderType(e.target.value)}
                        />
                    </div>
                    {providerType === "vet" ?
                        <>
                            <div>
                                <Label htmlFor="provider">Vet</Label>
                                <SelectOptions
                                    id="provider"
                                    name="provider"
                                    options={providers.map((p) => ({
                                        label: p.fullName,
                                        value: p._id
                                    }))}
                                    onChange={(e) => setVaccinationData({ ...vaccinationData, provider: e.target.value })}
                                />
                            </div>
                        </>
                        :
                        <div>
                            <Label htmlFor="specify">Specify</Label>
                            <Input
                                id="specify"
                                name="specify"
                                placeholder="e.g. Local Clinic"
                                // onChange={(e) => setVaccinationData({ ...vaccinationData, status: e.target.value })}
                            />
                        </div>
                    }
                </div>

                <div className='mt-4'>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Any special notes about the vaccination"
                        value={vaccinationData.notes}
                        onChange={(e) => setVaccinationData({ ...vaccinationData, notes: e.target.value })}
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
                        disabled={!vaccinationData.provider}
                        className={`bg-primary text-white w-40 h-11 text-center rounded-md hover:bg-primaryHover duration-200 ${!vaccinationData.provider ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Saving...' : 'Add Vaccination'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddVaccination;
