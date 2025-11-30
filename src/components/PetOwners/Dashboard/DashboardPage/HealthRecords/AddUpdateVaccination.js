import React, { useEffect, useState } from 'react';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useAddVaccinationMutation, useUpdateVaccinationMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddUpdateVaccination = ({ petId, onClose, vaccination = null }) => {
    const isEdit = Boolean(vaccination);

    const [providers, setProviders] = useState([]);

    const [inputValue, setInputValue] = useState("");

    const [showDropdown, setShowDropdown] = useState(false);

    const detectedProviders = providers.filter(
        (provider) =>
            provider.fullName.toLowerCase().includes(inputValue.toLowerCase()) ||
            provider.works_at.toLowerCase().includes(inputValue.toLowerCase()) ||
            provider.based_in.toLowerCase().includes(inputValue.toLowerCase())
    );

    const [addVaccination, { isLoading: isAdding }] = useAddVaccinationMutation();
    const [updateVaccination, { isLoading: isUpdating }] = useUpdateVaccinationMutation();

    const [providerType, setProviderType] = useState(vaccination?.providerType || 'vet');
    const [customProvider, setCustomProvider] = useState(
        vaccination?.providerType && vaccination.providerType !== 'vet' ? vaccination.provider || '' : ''
    );

    const initialData = vaccination
        ? {
            vaccine: vaccination.vaccine || '',
            date_given: vaccination.date_given?.split('T')[0] || '',
            next_due: vaccination.next_due?.split('T')[0] || '',
            // status: vaccination.status || '',
            provider: vaccination.provider || '',
            notes: vaccination.notes || ''
        }
        : {
            vaccine: '',
            date_given: new Date().toISOString().split('T')[0],
            next_due: '',
            // status: '',
            provider: inputValue,
            notes: ''
        };

    const [vaccinationData, setVaccinationData] = useState(initialData);

    useEffect(() => {
        const intervals = {
            Rabies: 365,
            DHPP: 365,
            Bordetella: 180,
            Leptospirosis: 365,
            Influenza: 365,
            FVRCP: 365,
            FeLV: 365,
            Lyme: 365
        };

        const days = intervals[vaccinationData.vaccine];
        if (!days) return;

        const givenDate = new Date(vaccinationData.date_given);
        const nextDue = new Date(givenDate);
        nextDue.setDate(givenDate.getDate() + days);

        const nextDueStr = nextDue.toISOString().split("T")[0];

        if (vaccinationData.next_due !== nextDueStr) {
            setVaccinationData(prev => ({
                ...prev,
                next_due: nextDueStr
            }));
        }
    }, [vaccinationData.vaccine, vaccinationData.date_given, vaccinationData.next_due]);

    console.log("vaccinationData:", vaccinationData);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/vet/all-vets`);
                if (res.status === 200) {
                    setProviders(res.data.vets);
                }
            } catch (err) {
                console.error('Failed to load providers', err);
            }
        };
        fetchProviders();
    }, []);

    const notify = (message, type) => {
        toast(message, { type, autoClose: 1000 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...vaccinationData,
            provider: providerType === 'vet' ? vaccinationData.provider : customProvider,
            providerType
        };

        try {
            if (isEdit) {
                const res = await updateVaccination({
                    petId,
                    vaccinationId: vaccination._id,
                    vaccinationData: payload
                }).unwrap();
                if (res.success) {
                    notify('Vaccination updated successfully!', 'success');
                    onClose();
                }
            } else {
                const res = await addVaccination({ petId, vaccinationData: payload }).unwrap();
                if (res.success) {
                    notify('Vaccination added successfully!', 'success');
                    setVaccinationData(initialData);
                    onClose();
                }
            }
        } catch (err) {
            console.error('Error saving vaccination:', err);
            notify('Failed to save vaccination', 'error');
        }
    };

    const isSubmitDisabled =
        // providerType === 'vet' ? !vaccinationData.provider : !customProvider;
        vaccinationData.vaccine === '' || !vaccinationData.date_given;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor='vaccine'>Vaccination</Label>
                    <SelectOptions
                        id='vaccine'
                        name='vaccine'
                        options={[
                            { label: 'Rabies', value: 'Rabies' },
                            { label: 'DHPP', value: 'DHPP' },
                            { label: 'Bordetella', value: 'Bordetella' },
                            { label: 'Leptospirosis', value: 'Leptospirosis' },
                            { label: 'Influenza', value: 'Influenza' },
                            { label: 'FVRCP', value: 'FVRCP' },
                            { label: 'FeLV', value: 'FeLV' },
                            { label: 'Lyme', value: 'Lyme' },
                            { label: 'Other', value: 'Other' }
                        ]}
                        placeholder='Select vaccine'
                        value={vaccinationData.vaccine}
                        onChange={(e) =>
                            setVaccinationData({ ...vaccinationData, vaccine: e.target.value })
                        }
                    />
                </div>
                <div className='grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1'>
                    <div>
                        <Label htmlFor='date_given'>Date given</Label>
                        <Input
                            id='date_given'
                            type='date'
                            value={vaccinationData.date_given}
                            onChange={(e) =>
                                setVaccinationData({ ...vaccinationData, date_given: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor='next_due' optional>Next due</Label>
                        <Input
                            id='next_due'
                            type='date'
                            value={vaccinationData.next_due}
                            onChange={(e) =>
                                setVaccinationData({ ...vaccinationData, next_due: e.target.value })
                            }
                        />
                    </div>
                    {/* <div>
                        <Label htmlFor='status'>Status</Label>
                        <SelectOptions
                            id='status'
                            name='status'
                            options={[
                                { label: 'Up-to-date', value: 'up-to-date' },
                                { label: 'Due', value: 'due' },
                                { label: 'Overdue', value: 'overdue' }
                            ]}
                            placeholder='Select Status'
                            value={vaccinationData.status}
                            onChange={(e) =>
                                setVaccinationData({ ...vaccinationData, status: e.target.value })
                            }
                        />
                    </div> */}
                </div>


                {/* Vet or Clinic Selector */}
                <div className="relative mt-4">
                    <Label htmlFor="provider" optional>Provider</Label>
                    <div>
                        <input
                            type="text"
                            id="provider"
                            placeholder="Vet, Clinic, Hospital, Pet Shelter"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setVaccinationData({
                                    ...vaccinationData,
                                    provider: e.target.value,
                                });
                                setShowDropdown(true);
                            }}
                            className="border border-gray-200 px-2 py-2 rounded outline-none placeholder:font-light placeholder:text-sm w-full"
                        />

                        {showDropdown &&
                            detectedProviders.length > 0 &&
                            inputValue.length > 0 && (
                                <ul className="absolute top-full left-0 w-full bg-white rounded-lg border shadow-lg mt-2 max-h-56 overflow-auto p-2 z-10">
                                    {detectedProviders.map((item, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => {
                                                setInputValue(item.fullName);
                                                setVaccinationData({
                                                    ...vaccinationData,
                                                    provider: item.fullName,
                                                });
                                                setShowDropdown(false);
                                            }}
                                            className="p-2 cursor-pointer hover:bg-gray-50 duration-100"
                                        >
                                            <h5 className="font-medium text-sm">
                                                {item.fullName}{" "}
                                                {/* <span className="font-normal">
                                                        - {item.degrees?.[0] || "N/A"}
                                                    </span> */}
                                            </h5>
                                            <p className="text-xs text-gray-600">
                                                {item.degrees?.[0] || "N/A"}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </div>
                </div>

                <div className='mt-4'>
                    <Label htmlFor='notes' optional>Notes</Label>
                    <Textarea
                        id='notes'
                        name='notes'
                        placeholder='Any special notes about the vaccination'
                        value={vaccinationData.notes}
                        onChange={(e) =>
                            setVaccinationData({ ...vaccinationData, notes: e.target.value })
                        }
                    />
                </div>

                <div className='mt-7 flex gap-2 items-center justify-end'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='w-24 h-11 text-center bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={isSubmitDisabled}
                        className={`bg-primary text-white w-40 h-11 text-center rounded-md hover:bg-primaryHover duration-200 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isAdding || isUpdating
                            ? 'Saving...'
                            : isEdit
                                ? 'Update Vaccination'
                                : 'Add Vaccination'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUpdateVaccination;
