import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

const PetProfileModal = ({ modalType, setModalType }) => {

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [])

    const options = ['Cat', 'Dog', 'Rabbit', 'Bird', 'Other']

    const handleAddPet = () => {
        setModalType(null);
    }
    
    const handleUpdatePet = () => {
        setModalType(null);
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
                                    <Label htmlFor="petsname">Pets Name</Label>
                                    <Input type="text" id="petsname" placeholder="Enter your pet's name" classNames="py-2 w-full" />
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className=''>
                                        <Label htmlFor="type">Pet Type</Label>
                                        <SelectOptions options={options} />
                                    </div>
                                    <div className=''>
                                        <Label htmlFor="type">Gender</Label>
                                        <SelectOptions options={["male", "female"]} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className='w-full'>
                                        <Label htmlFor="age">Age</Label>
                                        <Input type="number" id="age" placeholder="Enter your pet's age" classNames="py-2 w-full" />
                                    </div>
                                    <div className='w-full'>
                                        <Label htmlFor="weight">Weight (lbs)</Label>
                                        <Input type="number" id="weight" placeholder="Enter your pet's weight" classNames="py-2 w-full" />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <Label htmlFor="breed">Breed</Label>
                                    <Input type="text" id="breed" placeholder="Enter your pet's breed" classNames="py-2 w-full" />
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
                                    <Label htmlFor="petsname">Pets Name</Label>
                                    <Input type="text" id="petsname" placeholder="Enter your pet's name" classNames="py-2 w-full" />
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className=''>
                                        <Label htmlFor="type">Pet Type</Label>
                                        <SelectOptions options={options} />
                                    </div>
                                    <div className=''>
                                        <Label htmlFor="type">Gender</Label>
                                        <SelectOptions options={["male", "female"]} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mb-5'>
                                    <div className='w-full'>
                                        <Label htmlFor="age">Age</Label>
                                        <Input type="number" id="age" placeholder="Enter your pet's age" classNames="py-2 w-full" />
                                    </div>
                                    <div className='w-full'>
                                        <Label htmlFor="weight">Weight (lbs)</Label>
                                        <Input type="number" id="weight" placeholder="Enter your pet's weight" classNames="py-2 w-full" />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <Label htmlFor="breed">Breed</Label>
                                    <Input type="text" id="breed" placeholder="Enter your pet's breed" classNames="py-2 w-full" />
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