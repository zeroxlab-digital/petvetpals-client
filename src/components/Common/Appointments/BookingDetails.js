import Button from '@/components/Common/Button/Button';
import Label from '@/components/Common/Form/Label';
import Input from '@/components/Common/Form/Input';
import Textarea from '@/components/Common/Form/Textarea';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import { useState } from 'react';
import useFetchPets from '../../../../hooks/useFetchPets';
import Image from 'next/image';

const BookingDetails = ({ setBookingState }) => {
    const [petDetailsOption, setPetDetailsOption] = useState("selector");
    const pets = useFetchPets();
    const [selectedPet, setSelectedPet] = useState(pets[0]);
    console.log(selectedPet);
    return (
        <div className=''>
            <div className='w-3/4 mx-auto'>
                <div className=' flex items-center justify-between gap-5 mb-5'>
                    <button onClick={() => setPetDetailsOption("selector")} className={`${petDetailsOption === "selector" ? "bg-primary text-white" : ""} border w-full h-11 font-semibold`}>Select Pet</button>
                    <button onClick={() => setPetDetailsOption("manual")} className={`${petDetailsOption === "manual" ? "bg-primary text-white" : ""} border w-full h-11 font-semibold`}>Add new</button>
                </div>
            </div>
            {
                petDetailsOption === "selector" ?
                    <div className="flex flex-col mt-20">
                        <ul className="flex justify-center gap-5 ">
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
                        <button
                            onClick={() => setBookingState('payment-details')}
                            className="mt-20 bg-primary rounded-full text-white cursor-pointer py-3 w-full"
                        >
                            Continue to pay
                        </button>
                    </div>


                    :
                    <div className='text-left'>
                        <form onSubmit={() => setBookingState('payment-details')} className='mt-7'>
                            <div className='mb-5'>
                                <Label htmlFor="petsname">Pets Name</Label>
                                <Input type="text" id="petsname" placeholder="Enter your pet's name" classNames="py-2 w-full" />
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
                                <Label htmlFor="type">Pet Type</Label>
                                <SelectOptions options={['Cat', 'Dog', 'Rabbit', 'Bird', 'Other']} />
                            </div>
                            <div className='mb-5'>
                                <Label htmlFor="breed">Breed</Label>
                                <Input type="text" id="breed" placeholder="Enter your pet's breed" classNames="py-2 w-full" />
                            </div>
                            <div>
                                <Label htmlFor="symptoms">Symptoms</Label>
                                <Textarea classNames="w-full" id="symptoms" placeholder="Type the symptoms or reason for visit..." />
                            </div>
                            <input type="submit" value="Continue to pay" className={`bg-primary rounded-full text-white cursor-pointer py-3 w-full mt-5 `} />
                        </form>
                    </div>
            }
        </div>
    );
};

export default BookingDetails;