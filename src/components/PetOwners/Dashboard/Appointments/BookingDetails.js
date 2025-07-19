"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { Check, CheckCircle, PawPrint, Plus } from "lucide-react"
import Label from "@/components/Common/Form/Label"
import Input from "@/components/Common/Form/Input"
import Textarea from "@/components/Common/Form/Textarea"
import SelectOptions from "@/components/Common/SelectOptions/SelectOptions"
import useFetchPets from "../../../../../hooks/useFetchPets"
import { PetSpinner } from "@/components/Common/Loader/PetSpinner"
import FileUpload from "@/components/Common/FileUpload/FileUpload"
import { toast } from "react-toastify"

const BookingDetails = ({ apptId, setBookingState, selectedPet, setSelectedPet }) => {
    console.log("appointment id from details:", apptId)
    const [petDetailsOption, setPetDetailsOption] = useState("selector")
    const { pets, isLoading } = useFetchPets()

    const [consultation_purpose, set_consultation_purpose] = useState({
        purpose: "",
    })

    useEffect(() => {
        set_consultation_purpose({
            purpose: consultation_purpose.purpose || null,
        })
    }, [consultation_purpose.purpose, selectedPet])

    const handleContinue = async () => {
        if (!selectedPet) {
            return alert("To continue, you must select a pet or add manually!")
        }
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/appointment/update-appointment/${apptId}`,
                consultation_purpose,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            )
            console.log(res)
            if (res.status === 200) {
                setBookingState("confirmation")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [petProfile, setPetProfile] = useState({
        type: "",
        name: "",
        image: null,
        age: 0,
        breed: "",
        gender: "",
        weight: 0,
    })

    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1500 });
    }

    // File upload states
    const [uploadedFile, setUploadedFile] = useState(null);
    console.log(uploadedFile);

    const handleManualPetAdd = async (e) => {
        e.preventDefault()

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
                // headers: {
                //     "Content-Type": "application/json",
                // },
                withCredentials: true,
            })
            console.log(res)
            if (res.status === 200) {
                notify("Added new pet profile successfully!", "success");
                setPetDetailsOption("selector")
            }
            setPetProfile({
                type: "",
                name: "",
                image: null,
                age: 0,
                breed: "",
                gender: "",
                weight: 0,
            })
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <PetSpinner />
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"><div className="rounded-md bg-primary p-2 text-white"><CheckCircle size={18} /></div> Confirm your appointment</h2>

            <div className="md:w-4/5 mx-auto mb-8">
                <div className="flex items-center justify-between gap-1 max-sm:gap-1 p-1 bg-gray-100 rounded-lg">
                    <button
                        onClick={() => setPetDetailsOption("selector")}
                        className={`${petDetailsOption === "selector"
                            ? "bg-primary text-white shadow-md"
                            : "bg-transparent text-gray-700 hover:bg-gray-200"
                            } 
                            w-full py-2 max-sm:text-sm rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2`}
                    >
                        <PawPrint size={18} />
                        Select Pet
                    </button>
                    <button
                        onClick={() => setPetDetailsOption("manual")}
                        className={`${petDetailsOption === "manual"
                            ? "bg-primary text-white shadow-md"
                            : "bg-transparent text-gray-700 hover:bg-gray-200"
                            } 
                            w-full py-2 max-sm:text-sm rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 max-sm:gap-1`}
                    >
                        <Plus size={18} />
                        Add New Pet
                    </button>
                </div>
            </div>

            {petDetailsOption === "selector" ? (
                <div className="flex flex-col">
                    {pets.length > 0 ? (
                        <div className="mb-8">
                            {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Your Pet</h3> */}
                            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {pets.map((pet) => (
                                    <li
                                        key={pet._id}
                                        onClick={() => setSelectedPet(pet)}
                                        className={`relative border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${selectedPet?._id === pet._id ? "ring-2 ring-[#58294E] ring-offset-2" : "hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="aspect-square relative">
                                            <Image
                                                src={pet.image || "/images/no-image.png"}
                                                alt={`${pet.name}'s photo`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-3 bg-white">
                                            <p className="font-semibold text-sm text-gray-800 text-center">{pet.name}</p>
                                            <p className="text-xs text-gray-500 text-center">{pet.breed || pet.type}</p>
                                        </div>
                                        {selectedPet?._id === pet._id && (
                                            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                                                <Check size={16} />
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="text-center bg-gray-50 rounded-xl p-8 mb-8">
                            <PawPrint size={48} className="mx-auto mb-4 text-gray-400" />
                            <h2 className="text-xl font-bold text-primary mb-2">No pets found</h2>
                            <p className="text-gray-600 mb-4">Add a new pet profile to continue</p>
                            <button
                                onClick={() => setPetDetailsOption("manual")}
                                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Add New Pet
                            </button>
                        </div>
                    )}

                    <div className="mb-6">
                        <div className="mb-3">
                            <Label htmlFor="reason" className="text-gray-800 font-semibold mb-3">
                                Reason for consultation
                            </Label>
                            <SelectOptions
                                options={[
                                    "General health check or follow-up",
                                    "Skin issues or itching",
                                    "Vomiting or diarrhea",
                                    "Limping or minor injuries",
                                    "Behavior or anxiety problems",
                                    "Other concerns"
                                ]}
                                id="reason"
                                name="reason"
                                // default={petProfile.type}
                                // onChange={(e) => setPetProfile({ ...petProfile, type: e.target.value })}
                                className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <Label htmlFor="purpose" className="text-gray-800 font-semibold mb-3">
                                Additional Notes
                            </Label>
                            <Textarea
                                classNames="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                id="purpose"
                                name="purpose"
                                onChange={(e) => set_consultation_purpose({ ...consultation_purpose, purpose: e.target.value })}
                                placeholder="Any additional note for the vet or describe the purpose of consultation..."
                                rows={4}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleContinue}
                        className={`bg-primary hover:bg-primaryHover rounded-lg text-white font-medium py-4 w-full transition-colors duration-200 flex items-center justify-center gap-2 ${selectedPet ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                        disabled={!selectedPet}
                    >
                        Continue to confirm
                    </button>
                </div>
            ) : (
                <div className="">
                    {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Profile</h3> */}
                    <form onSubmit={handleManualPetAdd} className="space-y-5">
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
                                onClick={() => setPetDetailsOption("selector")}
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
            )}
        </div>
    )
}

export default BookingDetails

