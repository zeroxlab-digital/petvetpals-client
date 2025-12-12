import React, { useEffect, useState } from 'react';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/Form/SelectOptions';
import { toast } from 'react-toastify';
import { useAddAllergyConditionMutation } from '@/redux/services/petApi';

const AddAllergyCondition = ({ petId, type = 'allergy', onClose }) => {
    const [addAllergyCondition, { isLoading }] = useAddAllergyConditionMutation();

    const [data, setData] = useState({
        name: '',
        severity: '',
        diagnosedDate: null,
        description: null
    });

    const notify = (message, type) => {
        toast(message, { type, autoClose: 1000 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...data,
                type // either 'allergy' or 'condition'
            };
            const res = await addAllergyCondition({ petId, data: payload }).unwrap();
            if (res.success) {
                notify(`${type === 'allergy' ? 'Allergy' : 'Condition'} added successfully`, 'success');
                setData({
                    name: '',
                    severity: '',
                    diagnosedDate: new Date().toISOString().split('T')[0],
                    description: ''
                });
                onClose();
            }
        } catch (err) {
            console.error("Error adding allergy/condition:", err);
            notify("Failed to save", 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <Label htmlFor="name">{type === 'allergy' ? 'Allergy' : 'Condition'}</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder={`e.g. ${type === 'allergy' ? 'Chicken' : 'Hip Dysplasia'}`}
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="severity">Severity</Label>
                <SelectOptions
                    id="severity"
                    options={[
                        { label: 'Mild', value: 'mild' },
                        { label: 'Moderate', value: 'moderate' },
                        { label: 'Severe', value: 'severe' }
                    ]}
                    onChange={(e) => setData({ ...data, severity: e.target.value })}
                />
            </div>

            <div>
                <Label htmlFor="diagnosedDate" optional>Diagnosed date</Label>
                <Input
                    id="diagnosedDate"
                    type="date"
                    value={data.diagnosedDate}
                    onChange={(e) => setData({ ...data, diagnosedDate: e.target.value })}
                />
            </div>

            <div>
                <Label htmlFor="description" optional>Description</Label>
                <Textarea
                    id="description"
                    placeholder={`Details about this ${type}`}
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                />
            </div>

            <div className='mt-6 flex justify-end gap-2'>
                <button
                    type="button"
                    onClick={onClose}
                    className='w-24 h-10 bg-transparent border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded-md duration-150'
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!data.name}
                    className={`bg-primary text-white w-40 h-10 rounded-md hover:bg-primaryHover duration-200 ${!data.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Saving...' : `Add ${type === 'allergy' ? 'Allergy' : 'Condition'}`}
                </button>
            </div>
        </form>
    );
};

export default AddAllergyCondition;
