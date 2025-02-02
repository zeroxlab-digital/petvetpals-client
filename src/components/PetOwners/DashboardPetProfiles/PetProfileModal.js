import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';

const PetProfileModal = ({ modalType, setModalType, petProfile, setPetProfile, updatePet }) => {

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [])

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/pet/add-pet`, petProfile, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.status === 200) {
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
    const handleUpdatePet = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:8000/api/pet/update-pet/${updatePet._id}`, updatePetProfile, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log(res);
            if (res.status === 200) {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[90%] max-w-[50rem]  bg-white shadow-lg rounded-lg overflow-hidden">
                <div className='h-[80%] lg:h-[30rem] overflow-auto hide-scrollbar p-4'>
                    {modalType == "update" ?
                        <div className='text-left'>
                            <h3 className='font-bold text-xl text-gray-800 '>Update Pet Details</h3>
                            <p className='text-gray-600 font-light'>Please udpate the form below with your pets details</p>
                            <form onSubmit={handleUpdatePet} className='mt-7'>
                                <div className='mb-5'>
                                    <Label htmlFor="petsname">Pet Name</Label>
                                    <Input type="text" id="petname" placeholder={updatePet.name} classNames="py-2 w-full"
                                        name="petname"
                                        default={updatePetProfile.name}
                                        onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, name: e.target.value })}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className=''>
                                        <Label htmlFor="type">Pet Type</Label>
                                        <SelectOptions options={['Cat', 'Dog', 'Rabbit', 'Bird', 'Other']}
                                            name="pettype"
                                            default={updatePetProfile.type}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, type: e.target.value })}
                                        />
                                    </div>
                                    <div className=''>
                                        <Label htmlFor="type">Gender</Label>
                                        <SelectOptions options={["Male", "Female"]}
                                            name="gender"
                                            default={updatePetProfile.gender}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, gender: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className='w-full'>
                                        <Label htmlFor="age">Age</Label>
                                        <Input type="number" id="age" placeholder={updatePet.age} classNames="py-2 w-full"
                                            name="age"
                                            default={updatePetProfile.age}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, age: e.target.value })}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <Label htmlFor="weight">Weight (lbs)</Label>
                                        <Input type="number" id="weight" placeholder={updatePet.weight} classNames="py-2 w-full"
                                            name="weight"
                                            default={updatePetProfile.weight}
                                            onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, weight: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <Label htmlFor="breed">Breed</Label>
                                    <Input type="text" id="breed" placeholder={updatePet.breed} classNames="py-2 w-full"
                                        name="breed"
                                        default={updatePetProfile.breed}
                                        onChange={(e) => setUpdatePetProfile({ ...updatePetProfile, breed: e.target.value })}
                                    />
                                </div>
                                <input type="submit" value="UPDATE PET PROFILE" className={`bg-primary rounded-full text-white cursor-pointer py-3 w-full mt-5}`} />
                            </form>
                        </div>
                        :
                        <div className='text-left'>
                            <h3 className='font-bold text-xl text-gray-800 '>Provide Pet Details</h3>
                            <p className='text-gray-600 font-light'>Please fill the form below with your pets details</p>
                            <form onSubmit={handleAddPet} className='mt-7'>
                                <div className='mb-5'>
                                    <Label htmlFor="petsname">Pet Name</Label>
                                    <Input type="text" id="petname" placeholder="Enter your pet's name" classNames="py-2 w-full"
                                        name="petname"
                                        default={petProfile.name}
                                        onChange={(e) => setPetProfile({ ...petProfile, name: e.target.value })}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className=''>
                                        <Label htmlFor="type">Pet Type</Label>
                                        <SelectOptions options={['Cat', 'Dog', 'Rabbit', 'Bird', 'Other']}
                                            name="pettype"
                                            default={petProfile.type}
                                            onChange={(e) => setPetProfile({ ...petProfile, type: e.target.value })}
                                        />
                                    </div>
                                    <div className=''>
                                        <Label htmlFor="type">Gender</Label>
                                        <SelectOptions options={["Male", "Female"]}
                                            name="gender"
                                            default={petProfile.gender}
                                            onChange={(e) => setPetProfile({ ...petProfile, gender: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className='w-full'>
                                        <Label htmlFor="age">Age</Label>
                                        <Input type="number" id="age" placeholder="Enter your pet's age" classNames="py-2 w-full"
                                            name="age"
                                            default={petProfile.age}
                                            onChange={(e) => setPetProfile({ ...petProfile, age: e.target.value })}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <Label htmlFor="weight">Weight (lbs)</Label>
                                        <Input type="number" id="weight" placeholder="Enter your pet's weight" classNames="py-2 w-full"
                                            name="weight"
                                            default={petProfile.weight}
                                            onChange={(e) => setPetProfile({ ...petProfile, weight: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <Label htmlFor="breed">Breed</Label>
                                    <Input type="text" id="breed" placeholder="Enter your pet's breed" classNames="py-2 w-full"
                                        name="breed"
                                        default={petProfile.breed}
                                        onChange={(e) => setPetProfile({ ...petProfile, breed: e.target.value })}
                                    />
                                </div>
                                <input type="submit" value="ADD PET PROFILE" className={`bg-primary rounded-full text-white cursor-pointer py-3 w-full mt-5}`} />
                            </form>
                        </div>
                    }
                </div>
                <button
                    className="absolute sm:top-2 right-2 max-sm:right-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                    onClick={() => setModalType(null)}
                >
                    <HiXMark size={25} />
                </button>
            </div>
        </div>
    );
};

export default PetProfileModal;