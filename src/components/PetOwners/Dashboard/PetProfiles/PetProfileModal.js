import FileUpload from '@/components/Common/FileUpload/FileUpload';
import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const PetProfileModal = ({ modalType, setModalType, petProfile, setPetProfile, updatePet }) => {
    console.log("update pet image:", updatePet?.image)
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [])

    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1500 });
    }

    // File upload states
    const [uploadedFile, setUploadedFile] = useState(null);
    console.log("File:", uploadedFile);

    const handleAddPet = async (e) => {
        e.preventDefault();

        // Form data for adding texts and files at the same time
        const formData = new FormData();
        formData.append("type", petProfile.type);
        formData.append("name", petProfile.name);
        formData.append("image", uploadedFile);
        formData.append("age", petProfile.age);
        formData.append("breed", petProfile.breed);
        formData.append("gender", petProfile.gender);
        formData.append("weight", petProfile.weight);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/pet/add-pet`, formData, {
                withCredentials: true
            })
            if (res.status === 200) {
                notify("Added new pet profile!", "success");
                setModalType(null);
            }
            setPetProfile({
                type: '',
                name: '',
                image: null,
                age: 0,
                breed: '',
                gender: '',
                weight: 0,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const [updatePetProfile, setUpdatePetProfile] = useState({
        type: updatePet?.type,
        name: updatePet?.name,
        image: updatePet?.image,
        age: updatePet?.age,
        breed: updatePet?.breed,
        gender: updatePet?.gender,
        weight: updatePet?.weight,
    })

    // Update the image in updatePetProfile when uploadedFile changes
    useEffect(() => {
        if (uploadedFile) {
            setUpdatePetProfile(prevState => ({
                ...prevState,
                image: uploadedFile
            }));
        }
    }, [uploadedFile]);

    console.log("updatePetProfile:", updatePetProfile);

    const handleUpdatePet = async (e) => {
        e.preventDefault();

        // Form data for updating texts and files at the same time
        const formData = new FormData();
        formData.append("type", updatePetProfile.type);
        formData.append("name", updatePetProfile.name);
        formData.append("image", updatePetProfile.image);
        formData.append("age", updatePetProfile.age);
        formData.append("breed", updatePetProfile.breed);
        formData.append("gender", updatePetProfile.gender);
        formData.append("weight", updatePetProfile.weight);
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/api/pet/update-pet/${updatePet._id}`, formData, {
                withCredentials: true
            })
            if (res.status === 200) {
                notify("Updated pet profile successfully!", "success");
                setModalType(null);
            }
            setUpdatePetProfile({
                type: '',
                name: '',
                image: null,
                age: 0,
                breed: '',
                gender: '',
                weight: 0,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="relative w-[95%] max-w-[50rem]  bg-white shadow-lg rounded-lg overflow-hidden">
                <div className='h-[30rem] overflow-auto hide-scrollbar p-4'>
                    {modalType == "update" ?
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-5">Update pet profile</h3>
                            <form onSubmit={handleUpdatePet} className="space-y-5">
                                <div>
                                    <Label htmlFor="petname" className="text-gray-800 font-medium mb-1 block">
                                        Pet Name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="petname"
                                        placeholder={updatePet.name}
                                        classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        name="petname"
                                        default={updatePetProfile.name}
                                        onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <Label htmlFor="type" className="text-gray-800 font-medium mb-1 block">
                                            Pet Type
                                        </Label>
                                        <SelectOptions
                                            options={["Cat", "Dog", "Rabbit", "Bird", "Other"]}
                                            name="pettype"
                                            default={updatePetProfile.type}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, type: e.target.value })}
                                            className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="gender" className="text-gray-800 font-medium mb-1 block">
                                            Gender
                                        </Label>
                                        <SelectOptions
                                            options={["Male", "Female"]}
                                            name="gender"
                                            default={updatePetProfile.gender}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, gender: e.target.value.toLowerCase() })}
                                            className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <Label htmlFor="age" className="text-gray-800 font-medium mb-1 block">
                                            Age (years)
                                        </Label>
                                        <Input
                                            type="number"
                                            id="age"
                                            placeholder={updatePet.age}
                                            classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            name="age"
                                            default={updatePetProfile.age}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, age: e.target.value })}
                                            min="0"
                                            step="0.1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="weight" className="text-gray-800 font-medium mb-1 block">
                                            Weight (lbs)
                                        </Label>
                                        <Input
                                            type="number"
                                            id="weight"
                                            placeholder={updatePet.weight}
                                            classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            name="weight"
                                            default={updatePetProfile.weight}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, weight: e.target.value })}
                                            min="0"
                                            step="0.1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="breed" className="text-gray-800 font-medium mb-1 block">
                                        Breed
                                    </Label>
                                    <Input
                                        type="text"
                                        id="breed"
                                        placeholder={updatePet.breed}
                                        classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        name="breed"
                                        default={updatePetProfile.breed}
                                        onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, breed: e.target.value })}
                                    />
                                </div>

                                <FileUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />

                                <div className="flex gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalType(null)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium py-3 px-6 transition-colors duration-200 flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 text-white rounded-lg font-medium py-3 px-6 transition-colors duration-200 flex-1"
                                    >
                                        Update Pet
                                    </button>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-5">Add a new pet</h3>
                            <form onSubmit={handleAddPet} className="space-y-5">
                                <div>
                                    <Label htmlFor="petname" className="text-gray-800 font-medium mb-1 block">
                                        Pet Name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="petname"
                                        placeholder="Enter your pet's name"
                                        classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        name="petname"
                                        default={petProfile.name}
                                        onChange={(e) => setPetProfile({ ...petProfile, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <Label htmlFor="type" className="text-gray-800 font-medium mb-1 block">
                                            Pet Type
                                        </Label>
                                        <SelectOptions
                                            options={["Cat", "Dog", "Rabbit", "Bird", "Other"]}
                                            name="pettype"
                                            default={petProfile.type}
                                            onChange={(e) => setPetProfile({ ...petProfile, type: e.target.value })}
                                            className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="gender" className="text-gray-800 font-medium mb-1 block">
                                            Gender
                                        </Label>
                                        <SelectOptions
                                            options={["Male", "Female"]}
                                            name="gender"
                                            default={petProfile.gender}
                                            onChange={(e) => setPetProfile({ ...petProfile, gender: e.target.value.toLowerCase() })}
                                            className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <Label htmlFor="age" className="text-gray-800 font-medium mb-1 block">
                                            Age (years)
                                        </Label>
                                        <Input
                                            type="number"
                                            id="age"
                                            placeholder="Enter your pet's age"
                                            classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            name="age"
                                            default={petProfile.age}
                                            onChange={(e) => setPetProfile({ ...petProfile, age: e.target.value })}
                                            min="0"
                                            step="0.1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="weight" className="text-gray-800 font-medium mb-1 block">
                                            Weight (lbs)
                                        </Label>
                                        <Input
                                            type="number"
                                            id="weight"
                                            placeholder="Enter your pet's weight"
                                            classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            name="weight"
                                            default={petProfile.weight}
                                            onChange={(e) => setPetProfile({ ...petProfile, weight: e.target.value })}
                                            min="0"
                                            step="0.1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="breed" className="text-gray-800 font-medium mb-1 block">
                                        Breed
                                    </Label>
                                    <Input
                                        type="text"
                                        id="breed"
                                        placeholder="Enter your pet's breed"
                                        classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        name="breed"
                                        default={petProfile.breed}
                                        onChange={(e) => setPetProfile({ ...petProfile, breed: e.target.value })}
                                    />
                                </div>

                                <FileUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />

                                <div className="flex gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalType(null)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium py-3 px-6 transition-colors duration-200 flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 text-white rounded-lg font-medium py-3 px-6 transition-colors duration-200 flex-1"
                                    >
                                        Add Pet
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
                <button
                    className="absolute top-2 right-2 sm:right-2 sm:top-2 max-sm:right-2 max-sm:top-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-700"
                    onClick={() => setModalType(null)}
                >
                    <HiXMark size={25} />
                </button>
            </div>
        </div>
    );
};

export default PetProfileModal;