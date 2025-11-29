import React, { useEffect, useState } from 'react';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import { useAddMedicalHistoryMutation, useUpdateMedicalHistoryMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddUpdateMedicalRecord = ({ petId, onClose, record = null }) => {
    const isEdit = Boolean(record);

    const [vets, setVets] = useState([]);

    const [inputValue, setInputValue] = useState("");

    const [showDropdown, setShowDropdown] = useState(false);

    const detectedVetsAndClinics = vets.filter(
        (vet) =>
            vet.fullName.toLowerCase().includes(inputValue.toLowerCase()) ||
            vet.works_at.toLowerCase().includes(inputValue.toLowerCase()) ||
            vet.based_in.toLowerCase().includes(inputValue.toLowerCase())
    );

    const [addMedicalHistory, { isLoading: isAdding }] = useAddMedicalHistoryMutation();
    const [updateMedicalHistory, { isLoading: isUpdating }] = useUpdateMedicalHistoryMutation();

    const initialState = record
        ? {
            type: record.type || '',
            date: record.date?.split('T')[0] || new Date().toISOString().split('T')[0],
            vetOrClinic: record.vetOrClinic || '',
            diagnosis: record.diagnosis || '',
            treatment: record.treatment || '',
            description: record.description || ''
        }
        : {
            type: '',
            date: new Date().toISOString().split('T')[0],
            vetOrClinic: inputValue,
            diagnosis: '',
            treatment: '',
            description: ''
        };

    const [medicalHistoryData, setMedicalHistoryData] = useState(initialState);

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

    const notify = (message, type) => {
        toast(message, { type, autoClose: 1000 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                petId,
                medicalHistoryData
            };

            if (isEdit) {
                const res = await updateMedicalHistory({
                    petId,
                    recordId: record._id,
                    medicalHistoryData
                }).unwrap();
                if (res.success) {
                    notify("Medical record updated successfully!", "success");
                    onClose();
                }
            } else {
                const res = await addMedicalHistory(payload).unwrap();
                if (res.success) {
                    notify("Medical record added successfully!", "success");
                    setMedicalHistoryData(initialState);
                    onClose();
                }
            }
        } catch (err) {
            console.error("Failed to save medical record:", err);
            notify("Failed to save record", "error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
                    <div>
                        <Label htmlFor="type">Record type</Label>
                        <Input
                            id="type"
                            type="text"
                            placeholder="e.g., Check-up, Vaccination, Surgery"
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

                {/* Vet or Clinic Selector */}
                <div className="my-4 relative">
                    <Label htmlFor="vetOrClinic" optional>Vet or Clinic</Label>
                    <div>
                        <input
                            type="text"
                            id="vetOrClinic"
                            placeholder="e.g., Dr. Matthew Anderson, Owachita Pet Clinic"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setMedicalHistoryData({
                                    ...medicalHistoryData,
                                    vetOrClinic: e.target.value,
                                });
                                setShowDropdown(true);
                            }}
                            className="border border-gray-200 px-2 py-2 rounded outline-none placeholder:font-light placeholder:text-sm w-full"
                        />

                        {showDropdown &&
                            detectedVetsAndClinics.length > 0 &&
                            inputValue.length > 0 && (
                                <ul className="absolute top-full left-0 w-full bg-white rounded-lg border shadow-lg mt-2 max-h-56 overflow-auto p-2 z-10">
                                    {detectedVetsAndClinics.map((item, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => {
                                                setInputValue(item.fullName);
                                                setMedicalHistoryData({
                                                    ...medicalHistoryData,
                                                    vetOrClinic: item.fullName,
                                                });
                                                setShowDropdown(false);
                                            }}
                                            className="p-3 cursor-pointer hover:bg-gray-50 duration-200"
                                        >
                                            <h5 className="font-medium text-sm">
                                                {item.fullName}{" "}
                                                <span className="font-normal">
                                                    - {item.degrees?.[0] || "N/A"}
                                                </span>
                                            </h5>
                                            <p className="text-xs text-gray-600">
                                                {item.works_at || "N/A"}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input
                        type="text"
                        id="diagnosis"
                        name="diagnosis"
                        required
                        placeholder="e.g., ear infection, skin allergy, dental disease"
                        value={medicalHistoryData.diagnosis}
                        onChange={(e) =>
                            setMedicalHistoryData({ ...medicalHistoryData, diagnosis: e.target.value })
                        }
                    />
                </div>
                <div className='mt-4'>
                    <Label htmlFor="treatment" optional>Treatment</Label>
                    <Input
                        type="text"
                        id="treatment"
                        name="treatment"
                        placeholder="e.g., prescribed meds, injections, care instructions"
                        value={medicalHistoryData.treatment}
                        onChange={(e) =>
                            setMedicalHistoryData({ ...medicalHistoryData, treatment: e.target.value })
                        }
                    />
                </div>
                <div className='mt-4'>
                    <Label htmlFor="description" optional>Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Write what happened in your own words..."
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
                        className='w-24 max-sm:w-full h-11 text-center bg-transparent border border-red-400 text-red-400 hover:text-white px-4 py-2 rounded-md hover:bg-red-400 duration-200'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!medicalHistoryData.type}
                        className={`bg-primary text-white w-40 max-sm:w-full h-11 text-center rounded-md hover:bg-primaryHover duration-200 ${!medicalHistoryData.type ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {(isAdding || isUpdating) ? 'Saving...' : isEdit ? 'Update Record' : 'Add Record'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUpdateMedicalRecord;
