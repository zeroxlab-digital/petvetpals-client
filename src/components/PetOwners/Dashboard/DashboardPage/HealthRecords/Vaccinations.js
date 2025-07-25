import Actions from '@/components/Common/Actions/Actions';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { useDeleteVaccinationMutation, useGetVaccinationsQuery } from '@/redux/services/petApi';
import { displayValue } from '@/utils/displayValue';
import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { HiEllipsisVertical, HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const Vaccinations = ({ petId }) => {
    const { data, isLoading, error } = useGetVaccinationsQuery({ petId });
    const [deleteVaccination, { isError }] = useDeleteVaccinationMutation();
    const vaccinations = data?.vaccinations || [];
    const handleView = async (vaccine) => {
        try {
            toast.info("This feature is coming soon!", { autoClose: 1000 })
        } catch (error) {
            console.log(error);
            toast.error("There was an error while trying to edit this!", { autoClose: 1000 })
        }
    }
    const handleEdit = async (id) => {
        try {
            toast.info("This feature is coming soon!", { autoClose: 1000 })
        } catch (error) {
            console.log(error);
            toast.error("There was an error while trying to edit this!", { autoClose: 1000 })
        }
    }
    const handleDelete = async (vaccinationId) => {
        if (window.confirm("Are you sure you want to delete this vaccination?")) {
            try {
                await deleteVaccination({ vaccinationId }).unwrap();
                toast.success("Vaccination deleted successfully.", { autoClose: 1000 });
            } catch (error) {
                console.error("Failed to delete vaccination:", error);
                toast.error("Failed to delete vaccination. Please try again.", { autoClose: 1000 });
            }
        }
    }
    if (isLoading) return <div><PetSpinner /></div>
    if (vaccinations.length < 1) return <div>No vaccination found!</div>
    return (
        <div className='h-screen border rounded-md bg-white overflow-x-auto'>
            <table className="w-full border-collapse ">
                <thead>
                    <tr className="text-left text-xs md:text-sm text-gray-500 border-b">
                        <th className="p-5">Vaccine</th>
                        <th className="p-5">Date Given</th>
                        <th className="p-5">Next Due</th>
                        <th className="p-5">Status</th>
                        <th className="p-5">Provider</th>
                        <th className="p-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {vaccinations.map((vaccine, index) => (
                        <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                            <td className="px-5 py-3 text-sm">{displayValue(vaccine.vaccine)}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(new Date(vaccine.date_given).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }))}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(vaccine.next_due)}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(vaccine.status)}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(vaccine.provider?.fullName)}</td>
                            <td className="px-5 py-3 text-sm flex justify-end">
                                <span className='relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'><HiEllipsisVertical className='text-xl text-gray-800' />
                                    <Actions
                                        actions={[
                                            {
                                                label: "View Details",
                                                icon: <HiOutlineInformationCircle />,
                                                onClick: () => handleView(vaccine),
                                            },
                                            {
                                                label: "Edit",
                                                icon: <HiOutlinePencilAlt />,
                                                onClick: () => handleEdit(vaccine._id),
                                            },
                                            {
                                                label: "Delete",
                                                icon: <HiOutlineTrash />,
                                                onClick: () => handleDelete(vaccine._id),
                                            }
                                        ]}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Vaccinations;