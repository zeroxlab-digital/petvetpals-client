import Button from '@/components/Common/Button/Button';
import { useDeleteMedicationMutation, useUpdateMedicationMutation } from '@/redux/services/petApi';
import React from 'react';
import { toast } from 'react-toastify';

const MedicationDetails = ({ med, setViewDetails, setOpenPopup }) => {
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 });
    }
    const [updateMedication, { isLoading, isError, isSuccess }] = useUpdateMedicationMutation();
    const handleMarkComplete = async (medicationId) => {
        try {
            const response = await updateMedication({
                medicationId, medicationData: {
                    is_ongoing: false
                }
            }).unwrap();
            if (response.success) {
                notify("Medication marked as completed successfully", "success");
                setViewDetails(false);
            }
        } catch (error) {
            console.error("Error marking medication as complete:", error);
        }
    };
    const [deleteMedication, { }] = useDeleteMedicationMutation();
    const handleDelete = async (medicationId) => {
        try {
            const response = await deleteMedication({ medicationId }).unwrap();
            if(response.success) {
                notify("Medication history removed successfully", "success");
                setOpenPopup(false);
            }
        } catch (error) {
            console.log("Error deleting medication:", error);
            notify("Failed to delete medication", "error");
        }
    };
    return (
        <>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Dosage</span>
                    <p className=''>{med.dosage || 'N/A'}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Frequency</span>
                    <p>{med.frequency || 'N/A'}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Reason</span>
                    <p>{med.reason || 'N/A'}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Start date</span>
                    <p>{new Date(med.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</p>
                </div>
            </div>
            <div className='my-3'>
                <span className='text-gray-600 font-medium text-sm'>Administration</span>
                {/* <p>{medication.administration}</p> */}
            </div>
            <div>
                <span className='text-gray-600 font-medium text-sm'>Instructions</span>
                <p>{med.instructions || 'N/A'}</p>
            </div>
            <div className='my-3'>
                <span className='text-gray-600 font-medium'>Status</span>
                <p className={`${med.is_ongoing ? 'bg-green-500/10 border border-green-500 text-green-700' : 'bg-yellow-500/10 border border-yellow-500 text-yellow-700'} mt-1 font-semibold rounded-full px-3 text-sm w-max`}>{med.is_ongoing ? 'Ongoing' : 'Completed'}</p>
            </div>
            <div className='flex justify-end'>
                {med.is_ongoing ?
                    <Button onClick={() => handleMarkComplete(med._id)} classNames={'py-2 cursor-pointer text-white rounded bg-primary hover:bg-primaryHover duration-200'}>{isLoading ? 'Loading...' : 'Mark as Completed'}</Button>
                    :
                    <Button onClick={() => handleDelete(med._id)} classNames={'py-2 cursor-pointer text-white rounded bg-red-500 hover:bg-red-600 duration-200'}>{isLoading ? 'Loading...' : 'Remove Medication History'}</Button>
                }
            </div>
        </>
    );
};

export default MedicationDetails;