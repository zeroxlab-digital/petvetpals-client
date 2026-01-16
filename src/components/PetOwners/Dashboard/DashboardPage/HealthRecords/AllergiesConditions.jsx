import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { Stethoscope } from 'lucide-react';
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import AddAllergyCondition from './AddAllergyCondition';
import { useDeleteAllergyConditionMutation, useGetAllergiesConditionsQuery } from '@/redux/services/petApi';
import { displayValue } from '@/utils/displayValue';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { toast } from 'react-toastify';

const AllergiesConditions = ({ petId }) => {

    const [allergyPopup, setAllergyPopup] = useState(false);
    const [conditionPopup, setConditionPopup] = useState(false);

    const { data, isLoading, refetch } = useGetAllergiesConditionsQuery({ petId });
    const allergies = data?.allergiesConditions?.filter(item => item.type === 'allergy') || [];
    const conditions = data?.allergiesConditions?.filter(item => item.type === 'condition') || [];

    const [deleteAllergyCondition, { }] = useDeleteAllergyConditionMutation();
    const handleDelete = async (id, type) => {
        if (window.confirm(`Are you sure you want to delete this ${type}`))
            try {
                const res = await deleteAllergyCondition({ id, type }).unwrap();
                if (res.success) {
                    refetch();
                    if (type === 'allergy') {
                        toast.success('Allergy deleted successfully', { autoClose: 1000 });
                    } else {
                        toast.success('Condition deleted successfully', { autoClose: 1000 });
                    }
                }
            } catch (err) {
                console.error("Error deleting allergy/condition:", err);
            }
    }

    if (isLoading) return <PetSpinner />;

    return (
        <div className="bg-white rounded-md border p-4">
            <div className="space-y-5">

                {/* Allergies */}
                <div>
                    <h4 className="font-semibold mb-4">Known Allergies</h4>
                    <ul className="space-y-3 mb-5">
                        {allergies.length === 0 && <p className="text-gray-500 text-sm">No known allergies.</p>}
                        {allergies.map((allergy, index) => (
                            <li key={index} className="border p-3 rounded-md flex items-center justify-between">
                                <div>
                                    <h6 className="font-semibold text-sm flex items-center gap-2 mb-2">{displayValue(allergy.name)}
                                        <span className={`${allergy.severity === 'mild' ? 'bg-yellow-400 bg-opacity-15 border border-yellow-400 text-yellow-400' : allergy.severity === 'moderate' ? 'bg-yellow-600 bg-opacity-20 border border-yellow-600 text-yellow-600' : 'bg-red-400 bg-opacity-15 border border-red-400 text-red-400'} text-xs rounded-full font-normal px-2`}>{allergy.severity || 'N/A'}</span>
                                    </h6>
                                    <p className="text-gray-700 text-sm">{displayValue(allergy.description)}</p>
                                    <span className="text-gray-600 text-sm">{allergy.diagnosedDate && new Date(allergy.diagnosedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</span>
                                </div>
                                <div className="flex item-center gap-1 max-sm:gap-0">
                                    {/* <Button size="small"><HiOutlinePencilAlt className="text-blue-400 hover:text-blue-500 duration-150 text-2xl" /></Button> */}
                                    <Button onClick={() => handleDelete(allergy._id, "allergy")} size="small"><HiOutlineTrash className="text-red-400 hover:text-red-500 duration-150 text-2xl" /></Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Button
                        onClick={() => setAllergyPopup(true)}
                        variant="primary"
                        size="small"
                        classNames="text-sm border !px-3 !py-1.5 rounded-full font-medium flex items-center gap-1"
                    >
                        <HiPlus className="" /> Add Allergy
                    </Button>

                    {allergyPopup && (
                        <ModalPopup
                            isOpen={allergyPopup}
                            onClose={() => setAllergyPopup(false)}
                            title="Add Allergy"
                            icon={<Stethoscope />}
                        >
                            <AddAllergyCondition
                                petId={petId}
                                type="allergy"
                                onClose={() => {
                                    setAllergyPopup(false);
                                    refetch();
                                }}
                            />
                        </ModalPopup>
                    )}
                </div>

                <hr />

                {/* Medical Conditions */}
                <div>
                    <h4 className="font-semibold mb-4">Medical Conditions</h4>
                    <ul className="space-y-3 mb-5">
                        {conditions.length === 0 && <p className="text-gray-500 text-sm">No medical conditions recorded.</p>}
                        {conditions.map((condition, index) => (
                            <li key={index} className="border p-3 rounded-md flex items-center justify-between">
                                <div>
                                    <h6 className="font-semibold text-sm flex items-center gap-2 mb-2">{displayValue(condition.name)}
                                        <span className={`${condition.severity === 'mild' ? 'bg-yellow-400 bg-opacity-15 border border-yellow-400 text-yellow-400' : condition.severity === 'moderate' ? 'bg-yellow-600 bg-opacity-20 border border-yellow-400 text-yellow-600' : 'bg-red-400 bg-opacity-15 border border-red-400 text-red-400'} text-xs rounded-full font-normal px-2`}>{condition.severity || 'N/A'}</span>
                                    </h6>
                                    <p className="text-gray-700 text-sm">{displayValue(condition.description)}</p>
                                    <span className="text-gray-600 text-sm">{condition.diagnosedDate && new Date(condition.diagnosedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</span>
                                </div>
                                <div className="flex item-center gap-1 max-sm:gap-0">
                                    {/* <Button size="small"><HiOutlinePencilAlt className="text-blue-400 hover:text-blue-500 duration-150 text-2xl" /></Button> */}
                                    <Button onClick={() => handleDelete(condition._id, "condition")} size="small"><HiOutlineTrash className="text-red-400 hover:text-red-500 duration-150 text-2xl" /></Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Button
                        onClick={() => setConditionPopup(true)}
                        variant="primary"
                        size="small"
                        classNames="text-sm border !px-3 !py-1.5 rounded-full font-medium flex items-center gap-1"
                    >
                        <HiPlus className="" /> Add Condition
                    </Button>

                    {conditionPopup && (
                        <ModalPopup
                            isOpen={conditionPopup}
                            onClose={() => setConditionPopup(false)}
                            title="Add Condition"
                            icon={<Stethoscope />}
                        >
                            <AddAllergyCondition
                                petId={petId}
                                type="condition"
                                onClose={() => {
                                    setConditionPopup(false);
                                    refetch();
                                }}
                            />
                        </ModalPopup>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllergiesConditions;
