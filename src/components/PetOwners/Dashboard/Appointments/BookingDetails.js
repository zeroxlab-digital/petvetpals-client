import Label from '@/components/Common/Form/Label';
import Input from '@/components/Common/Form/Input';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import useFetchPets from '../../../../../hooks/useFetchPets';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';

const BookingDetails = ({ apptId, setBookingState }) => {
    console.log("appointment id from details:", apptId);
    const [petDetailsOption, setPetDetailsOption] = useState("selector");
    const { pets, isLoading } = useFetchPets();
    const [selectedPet, setSelectedPet] = useState(null);

    const [consultation_purpose, set_consultation_purpose] = useState({
        pet: selectedPet,
        purpose: ""
    });
    useEffect(() => {
        set_consultation_purpose({
            pet: selectedPet,
            purpose: consultation_purpose.purpose || null
        })
    }, [consultation_purpose.purpose, selectedPet])

    const handleContinue = async () => {
        if (!selectedPet) {
            return alert("To continue, you must select a pet or add manually!")
        }
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/api/appointment/update-appointment/${apptId}`, consultation_purpose, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log(res);
            if (res.status === 200) {
                setBookingState('payment-details')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [petProfile, setPetProfile] = useState({
        type: '',
        name: '',
        image: null,
        age: 0,
        breed: '',
        gender: '',
        weight: 0,
    })

    const handleManualPetAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/pet/add-pet`, petProfile, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log(res);
            if (res.status === 200) {
                setPetDetailsOption("selector")
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
    if(isLoading) {
        return <PetSpinner />
    }
    return (
        <div className=''>
            <div className='md:w-3/4 mx-auto'>
                <div className=' flex items-center justify-between gap-5 mb-5'>
                    <button onClick={() => setPetDetailsOption("selector")} className={`${petDetailsOption === "selector" ? "bg-primary text-white" : ""} border w-full h-11 font-semibold`}>Select Pet</button>
                    <button onClick={() => setPetDetailsOption("manual")} className={`${petDetailsOption === "manual" ? "bg-primary text-white" : ""} border w-full h-11 font-semibold`}>Add new</button>
                </div>
            </div>
            {
                petDetailsOption === "selector" ?
                    <div className="flex flex-col mt-10">
                        <ul className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-5 ">
                            {pets.map(pet => (
                                <li key={pet._id} onClick={() => setSelectedPet(pet)} className={`${selectedPet?._id === pet._id ? "border-green-500 bg-gray-200 bg-opacity-20" : ""} border rounded-md cursor-pointer`}>
                                    <Image
                                        src={pet.image || "/images/cat-cute.jpg"}
                                        alt="pet's-img"
                                        width={200}
                                        height={200}
                                        className={`object-cover w-full rounded-md rounded-b-none`}
                                    />
                                    <p className="text-center font-semibold text-gray-700 p-3">{pet.name}</p>
                                </li>
                            ))}
                        </ul>
                        <div className='mt-10'>
                            <Label htmlFor="purpose">Purpose of consultation</Label>
                            <Textarea classNames="w-full" id="purpose" name="purpose" onChange={(e) => set_consultation_purpose({ ...consultation_purpose, purpose: e.target.value })} placeholder="Type the symptoms or reason for visit..." />
                        </div>
                        <button
                            onClick={handleContinue}
                            className="mt-5 bg-primary rounded-full text-white cursor-pointer py-3 w-full"
                        >
                            Continue to pay
                        </button>
                    </div>
                    :
                    <div className='text-left'>
                        <form onSubmit={handleManualPetAdd} className='mt-7'>
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
                                    <SelectOptions options={["male", "female"]}
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
                            <input type="submit" value="Add New Pet" className={`bg-primary rounded-full text-white cursor-pointer py-3 w-full mt-5 `} />
                        </form>
                    </div>
            }
        </div>
    );
};

export default BookingDetails;