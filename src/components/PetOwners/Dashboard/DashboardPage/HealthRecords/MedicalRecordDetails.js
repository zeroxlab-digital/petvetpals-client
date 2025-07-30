import Button from '@/components/Common/Button/Button';
import { useDeleteMedicalHistoryMutation } from '@/redux/services/petApi';
import { displayValue } from '@/utils/displayValue';
import React from 'react';
import { toast } from 'react-toastify';

const MedicalRecordDetails = ({ medicalRecord, onClose }) => {
    const { type, diagnosis, treatment, date, description, vet, file } = medicalRecord || {};
    const [deleteMedicalHistory, { isLoading, error }] = useDeleteMedicalHistoryMutation()
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this medical history?"))
            try {
                await deleteMedicalHistory({ medicalHistoryId: id }).unwrap();
                toast.success("Medical history is deleted successfully!", { autoClose: 1000 });
            } catch (error) {
                console.log(error);
                toast.error("There was an error while deleting this record!", { autoClose: 1000 })
            } finally {
                onClose();
            }
    }
    return (
        <>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Type</span>
                    <p className=''>{displayValue(type)}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Diagnosis</span>
                    <p>{displayValue(diagnosis)}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Treatment</span>
                    <p>{displayValue(treatment)}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Date</span>
                    <p>{new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</p>
                </div>
            </div>
            <div className='my-3'>
                <span className='text-gray-600 font-medium text-sm'>Vet</span>
                <p>{displayValue(vet.fullName)}</p>
            </div>
            <div>
                <span className='text-gray-600 font-medium text-sm'>Description</span>
                <p>{displayValue(description)}</p>
            </div>
            <Button onClick={() => handleDelete(medicalRecord._id)} classNames={'mt-5 py-2 cursor-pointer text-white rounded-md bg-red-500 hover:bg-red-600 duration-200'}>{isLoading ? 'Loading...' : 'Delete Record'}</Button>
        </>
    );
};

export default MedicalRecordDetails;