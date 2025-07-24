import Actions from '@/components/Common/Actions/Actions';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { useDeleteMedicalHistoryMutation, useGetMedicalHistoryQuery } from '@/redux/services/petApi';
import { displayValue } from '@/utils/displayValue';
import { Download } from 'lucide-react';
import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { HiEllipsisVertical, HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const MedicalHistory = ({ petId }) => {
    const { data, isLoading, error } = useGetMedicalHistoryQuery({ petId });
    const medicalHistory = data?.medicalHistory || [];
    const [deleteMedicalHistory, {}] = useDeleteMedicalHistoryMutation();
    const handleDelete = async (medicalHistoryId) => {
        if(window.confirm("Are you sure you want to delete this medical history?"))
            try {
                await deleteMedicalHistory({medicalHistoryId}).unwrap();
                toast.success("Medical history is deleted successfully!", { autoClose: 1000 });
            } catch (error) {
                console.log(error);
                toast.error("There was an error while deleting this record!", { autoClose: 1000 })
            }
    }
    if (isLoading) return <div><PetSpinner /></div>
    if (medicalHistory.length < 1) return <div>No medical history found!</div>
    return (
        <div className='h-screen border rounded-md bg-white overflow-x-auto'>
            <table className="w-full border-collapse p-5">
                <thead>
                    <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                        <th className="p-5">Date</th>
                        <th className="p-5">Type</th>
                        <th className="p-5">Doctor</th>
                        <th className="p-5">Diagnosis</th>
                        <th className="p-5">Treatment</th>
                        <th className="p-5">Files</th>
                        <th className="p-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {medicalHistory.map((record, index) => (
                        <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                            <td className="px-5 py-3 text-sm">{new Date(record.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(record.type)}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(record.vet.fullName)}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(record.diagnosis)}</td>
                            <td className="px-5 py-3 text-sm">{displayValue(record.treatment)}</td>
                            <td className="px-5 py-3 text-sm">
                                <HiOutlineDocumentText className='text-base' />
                            </td>
                            <td className="px-5 py-3 text-sm flex gap-1 justify-end">
                                <span className='relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'><Download size={16} className=' text-gray-800' /></span>
                                <span className='relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'><HiEllipsisVertical className='text-xl text-gray-800' />
                                    <Actions
                                        actions={[
                                            {
                                                label: "View Details",
                                                icon: <HiOutlineInformationCircle />,
                                                // onClick: () => handleView(med),
                                            },
                                            {
                                                label: "Edit",
                                                icon: <HiOutlinePencilAlt />,
                                                // onClick: () => handleEdit(med),
                                            },
                                            {
                                                label: "Delete",
                                                icon: <HiOutlineTrash />,
                                                onClick: () => handleDelete(record._id),
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

export default MedicalHistory;