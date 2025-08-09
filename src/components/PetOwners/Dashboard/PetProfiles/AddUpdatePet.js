'use client';
import FileUpload from '@/components/Common/FileUpload/FileUpload';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import TinySpinner from '@/components/Common/Loader/TinySpinner';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useAddPetMutation, useUpdateAPetMutation } from '@/redux/services/petApi';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddUpdatePet = ({ popup, setPopup }) => {
  const weightHistory = popup.pet?.weight;
  const recentWeight = weightHistory?.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  });
  const isUpdate = popup.type === 'update';
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formState, setFormState] = useState({
    name: isUpdate ? popup.pet?.name || '' : '',
    type: isUpdate ? popup.pet?.type || '' : '',
    age: isUpdate ? popup.pet?.age || '' : '',
    breed: isUpdate ? popup.pet?.breed || '' : '',
    gender: isUpdate ? popup.pet?.gender || '' : '',
    weight: isUpdate ? recentWeight.value || '' : '',
    image: isUpdate ? popup.pet?.image || null : null
  });

  const [addPet, { isLoading: adding }] = useAddPetMutation();
  const [updatePet, { isLoading: updating }] = useUpdateAPetMutation();

  useEffect(() => {
    if (uploadedFile) {
      setFormState((prev) => ({ ...prev, image: uploadedFile }));
    }
  }, [uploadedFile]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const notify = (msg, type = 'success') => {
    toast(msg, { type, autoClose: 1500 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('type', formState.type);
    formData.append('age', formState.age);
    formData.append('breed', formState.breed);
    formData.append('gender', formState.gender);
    formData.append('weight', formState.weight);
    formData.append('image', formState.image);

    try {
      if (isUpdate) {
        if (!popup.pet?._id) return notify('Missing pet ID for update', 'error');
        await updatePet({ id: popup.pet._id, formData }).unwrap();
        notify('Pet updated successfully!');
      } else {
        await addPet(formData).unwrap();
        notify('New pet added!');
      }

      setPopup({ show: false, type: null, pet: null });
    } catch (err) {
      console.error(err);
      notify('Something went wrong', 'error');
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto space-y-5">
      <h3 className="text-lg font-bold text-gray-800">
        {isUpdate ? 'Edit Pet Profile' : 'Add Pet Profile'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="petname">Pet Name</Label>
          <Input
            type="text"
            id="petname"
            value={formState.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="type">Pet Type</Label>
            <SelectOptions
              options={['Cat', 'Dog', 'Other']}
              name="type"
              placeholder={formState.type}
              value={formState.type}
              onChange={(e) => handleChange('type', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <SelectOptions
              options={['Male', 'Female']}
              name="gender"
              placeholder={formState.gender}
              value={formState.gender}
              onChange={(e) => handleChange('gender', e.target.value.toLowerCase())}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="age">Age (years)</Label>
            <Input
              type="number"
              id="age"
              value={formState.age}
              onChange={(e) => handleChange('age', e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              type="number"
              id="weight"
              value={formState.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="breed">Breed</Label>
          <Input
            type="text"
            id="breed"
            value={formState.breed}
            onChange={(e) => handleChange('breed', e.target.value)}
          />
        </div>

        <FileUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => setPopup({ show: false, type: null, pet: null })}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium py-3 px-6 transition-colors duration-200 flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white rounded-lg font-medium py-3 px-6 transition-colors duration-200 flex-1"
          >
            {adding || updating ? <TinySpinner /> : isUpdate ? 'Update Pet' : 'Add Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUpdatePet;
