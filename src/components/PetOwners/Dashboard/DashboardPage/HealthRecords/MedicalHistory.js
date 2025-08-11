import Actions from '@/components/Common/Actions/Actions';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { useDeleteMedicalHistoryMutation, useGetMedicalHistoryQuery } from '@/redux/services/petApi';
import { displayValue } from '@/utils/displayValue';
import { Clock, Download, PawPrint, Stethoscope } from 'lucide-react';
import React, { useState } from 'react';
import { HiOutlinePencilAlt, HiPencilAlt } from 'react-icons/hi';
import { HiEllipsisVertical, HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import AddUpdateMedicalRecord from './AddUpdateMedicalRecord';
import MedicalRecordDetails from './MedicalRecordDetails';

const MedicalHistory = ({ petId }) => {
  const { data, isLoading } = useGetMedicalHistoryQuery({ petId });
  const medicalHistory = data?.medicalHistory || [];
  const [deleteMedicalHistory] = useDeleteMedicalHistoryMutation();
  const [viewMedicalHistory, setViewMedicalHistory] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const handleView = (record) => setViewMedicalHistory(record);
  const handleEdit = (record) => setEditModal(record);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medical history?')) {
      try {
        await deleteMedicalHistory({ medicalHistoryId: id }).unwrap();
        toast.success('Medical history deleted successfully!', { autoClose: 1000 });
      } catch {
        toast.error('Error deleting this record!', { autoClose: 1000 });
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-48">
        <PetSpinner />
      </div>
    );
  if (medicalHistory.length < 1)
    return (
      <div className="text-center py-10 text-gray-500">
        <Stethoscope className="mx-auto h-12 w-12 mb-4 text-gray-400" />
        <p className="text-lg font-medium">No Medical History Found!</p>
        <p className="text-sm">Add a new record to get started</p>
      </div>
    );

  return (
    <section className="">
      {/* MOBILE: Cards */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {medicalHistory.map((record, idx) => {
          return (
            <article
              key={idx}
              tabIndex={0}
              className="bg-white border border-gray-200 border-opacity-30 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:shadow-xl duration-200"
            >
              <header className="flex justify-between items-center mb-5">
                <time
                  dateTime={record.date}
                  className={`flex items-center gap-2 font-semibold text-sm text-primary`}
                >
                  <Clock size={16} />
                  {new Date(record.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span
                  className={`select-none rounded-full px-3 py-.5 font-semibold text-sm border border-gray-300 bg-gray-50 text-indigo-600`}
                >
                  {displayValue(record.type)}
                </span>
              </header>

              <main className="flex-grow text-gray-900">
                <h3 className="text-base font-semibold truncate mb-0.5">{displayValue(record.vet.fullName)}</h3>
                <p className="uppercase text-xs font-semibold tracking-wider text-gray-600 mb-5 select-none">Doctor</p>

                <section className="mb-5 space-y-3 max-h-max">
                  <div>
                    <h4 className="text-sm font-semibold mb-0.5 select-none">Diagnosis</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">{displayValue(record.diagnosis)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-0.5 select-none">Treatment</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">{displayValue(record.treatment)}</p>
                  </div>
                </section>
              </main>

              <footer className="flex justify-between items-center text-gray-700 select-none">
                <div className="flex items-center gap-2">
                  <HiOutlineDocumentText size={20} />
                  <span className="font-semibold tracking-wide text-sm">Files</span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      //   toast.info('Downloading files...');
                    }}
                    aria-label="Download medical record files"
                    className="rounded-full p-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition shadow"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>

                  <Actions
                    actions={[
                      {
                        label: 'View Details',
                        icon: <HiOutlineInformationCircle className="text-indigo-600" />,
                        onClick: () => handleView(record),
                      },
                      {
                        label: 'Edit',
                        icon: <HiOutlinePencilAlt className="text-indigo-600" />,
                        onClick: () => handleEdit(record),
                      },
                      {
                        label: 'Delete',
                        icon: <HiOutlineTrash className="text-red-600" />,
                        onClick: () => handleDelete(record._id),
                      },
                    ]}
                  >
                    <HiEllipsisVertical size={28} />
                  </Actions>
                </div>
              </footer>
            </article>
          );
        })}
      </div>

      {/* DESKTOP/TABLET: Original Table */}
      <div className="hidden md:block h-screen border rounded-md bg-white overflow-x-auto">
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
          <tbody>
            {medicalHistory.map((record, index) => (
              <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                <td className="px-5 py-3 text-sm">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-5 py-3 text-sm">{displayValue(record.type)}</td>
                <td className="px-5 py-3 text-sm">{displayValue(record.vet.fullName)}</td>
                <td className="px-5 py-3 text-sm">{displayValue(record.diagnosis)}</td>
                <td className="px-5 py-3 text-sm">{displayValue(record.treatment)}</td>
                <td className="px-5 py-3 text-sm">
                  <HiOutlineDocumentText className="text-base" />
                </td>
                <td className="px-5 py-3 text-sm flex gap-1 justify-end">
                  <span className="relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center">
                    <Download size={16} className="text-gray-800" />
                  </span>
                  <span className="relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center">
                    <HiEllipsisVertical className="text-xl text-gray-800" />
                    <Actions
                      actions={[
                        {
                          label: 'View Details',
                          icon: <HiOutlineInformationCircle />,
                          onClick: () => handleView(record),
                        },
                        {
                          label: 'Edit',
                          icon: <HiOutlinePencilAlt />,
                          onClick: () => handleEdit(record),
                        },
                        {
                          label: 'Delete',
                          icon: <HiOutlineTrash />,
                          onClick: () => handleDelete(record._id),
                        },
                      ]}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {editModal && (
        <ModalPopup isOpen={editModal} onClose={() => setEditModal(null)} title="Edit Medical History" icon={<HiPencilAlt />}>
          <AddUpdateMedicalRecord petId={petId} onClose={() => setEditModal(null)} record={editModal} />
        </ModalPopup>
      )}
      {viewMedicalHistory && (
        <ModalPopup isOpen={viewMedicalHistory} onClose={() => setViewMedicalHistory(null)} title="Medical Record Details" icon={<Stethoscope />}>
          <MedicalRecordDetails medicalRecord={viewMedicalHistory} onClose={() => setViewMedicalHistory(null)} />
        </ModalPopup>
      )}
    </section>
  );
};

export default MedicalHistory;
