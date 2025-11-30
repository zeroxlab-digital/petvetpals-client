import Button from '@/components/Common/Button/Button';
import TinySpinner from '@/components/Common/Loader/TinySpinner';
import { useDeleteVaccinationMutation } from '@/redux/services/petApi';
import { displayValue } from '@/utils/displayValue';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

const VaccinationDetails = ({ vaccination, onClose }) => {
    const { _id, vaccine, provider, date_given, next_due, status, notes } = vaccination || {};
    const [deleteVaccination, { isLoading, error }] = useDeleteVaccinationMutation()
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this medical history?"))
            try {
                await deleteVaccination({ vaccinationId: id }).unwrap();
                toast.success("Vaccination deleted successfully!", { autoClose: 1000 });
            } catch (error) {
                console.log(error);
                toast.error("There was an error while deleting this vaccination!", { autoClose: 1000 })
            } finally {
                onClose();
            }
    }
    return (
        <div>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Vaccine</span>
                    <p className=''>{displayValue(vaccine)}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Provider</span>
                    <p>{displayValue(provider)}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Date given</span>
                    <p>{new Date(date_given).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</p>
                </div>
                <div>
                    <span className='text-gray-600 font-medium text-sm'>Next due</span>
                    <p>{new Date(next_due).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) || 'N/A'}</p>
                </div>
            </div>
            <div className='my-3'>
                <span className='text-gray-600 font-medium text-sm'>Status</span>
                <p className="w-fit select-none rounded-full px-3 py-.5 font-semibold text-sm border border-gray-300 bg-gray-50 text-indigo-600">
                    {displayValue(status)}
                </p>
            </div>
            <div>
                <span className='text-gray-600 font-medium text-sm'>Notes</span>
                <p>{displayValue(notes)}</p>
            </div>
            <Button onClick={() => handleDelete(_id)} classNames={'mt-5 py-2 cursor-pointer font-medium text-white text-sm rounded-lg bg-red-500 hover:bg-red-600/90 duration-200'}><Trash size={14} className='' /> {isLoading ? <TinySpinner /> : 'Delete vaccine'}</Button>
        </div>
    );
};

export default VaccinationDetails;