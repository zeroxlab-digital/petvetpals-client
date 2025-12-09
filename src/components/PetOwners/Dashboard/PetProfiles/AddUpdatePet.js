'use client';
import FileUpload from '@/components/Common/FileUpload/FileUpload';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import WeightInput from '@/components/Common/Form/WeightInput';
import Weight from '@/components/Common/Form/WeightInput';
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

  const breeds = [
    "labrador retriever",
    "german shepherd",
    "golden retriever",
    "french bulldog",
    "bulldog",
    "poodle (standard)",
    "poodle (miniature)",
    "poodle (toy)",
    "beagle",
    "rottweiler",
    "yorkshire terrier",
    "boxer",
    "dachshund (standard)",
    "dachshund (miniature)",
    "siberian husky",
    "doberman pinscher",
    "great dane",
    "shih tzu",
    "pomeranian",
    "chihuahua",
    "border collie",
    "australian shepherd",
    "boston terrier",
    "maltese",
    "cocker spaniel",
    "basset hound",
    "pug",
    "staffordshire bull terrier",
    "akita",
    "newfoundland",
    "bernese mountain dog",
    "cavalier king charles spaniel",
    "weimaraner",
    "whippet",
    "american curl",
    "maine coon",
    "persian",
    "siamese",
    "domestic shorthair",
    "ragdoll",
    "sphynx",
    "british shorthair",
    "scottish fold",
    "bengal",
    "norwegian forest cat",
    "abyssinian",
    "oriental shorthair",
    "burmese",
    "manx",
    "turkish angora",
    "exotic shorthair",
    "korat"
  ];
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const breedList = breeds.filter(breed => breed.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <div className="max-h-[80vh] overflow-y-auto space-y-5">

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="petname">Name</Label>
          <Input
            type="text"
            id="petname"
            value={formState.name}
            placeholder={'Enter name'}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label htmlFor="type">Pet type</Label>
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
              placeholder={'e.g., 0.5, 1, 5'}
              onChange={(e) => handleChange('age', e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <WeightInput
            value={formState.weight}
            onChange={(lbs) => handleChange("weight", lbs)}
          />
        </div>

        {/* Breed Selector */}
        <div className="my-4 relative">
          <Label htmlFor="breed" optional>Breed</Label>
          <div>
            <input
              type="text"
              id="breed"
              placeholder="e.g., German Shepher, American Curl"
              value={formState.breed}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleChange('breed', e.target.value,);
                setShowDropdown(true);
              }}
              className="border border-gray-200 px-2 py-2 rounded outline-none placeholder:font-light placeholder:text-sm w-full"
            />

            {showDropdown &&
              breedList.length > 0 &&
              inputValue.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white rounded-lg border shadow-lg mt-2 max-h-56 overflow-auto p-2 z-10">
                  {breedList.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setInputValue(item);
                        handleChange('breed', item,);
                        setShowDropdown(false);
                      }}
                      className="p-3 cursor-pointer hover:bg-gray-50 duration-200"
                    >
                      <h5 className="font-medium text-sm">
                        {item}
                      </h5>
                    </li>
                  ))}
                </ul>
              )}
          </div>
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
