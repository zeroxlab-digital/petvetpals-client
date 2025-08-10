import Actions from '@/components/Common/Actions/Actions';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { useDeleteVaccinationMutation, useGetVaccinationsQuery } from '@/redux/services/petApi';
import { displayValue } from '@/utils/displayValue';
import { Syringe, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { HiEllipsisVertical, HiOutlineInformationCircle, HiOutlineTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import AddUpdateVaccination from './AddUpdateVaccination';
import VaccinationDetails from './VaccinationDetails';

const Vaccinations = ({ petId }) => {
  const { data, isLoading } = useGetVaccinationsQuery({ petId });
  const vaccinations = data?.vaccinations || [];
  const [deleteVaccination] = useDeleteVaccinationMutation();

  const [viewVaccination, setViewVaccination] = useState(null);
  const [editVaccination, setEditVaccination] = useState(null);

  const handleView = (vaccine) => setViewVaccination(vaccine);
  const handleEdit = (vaccination) => setEditVaccination(vaccination);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vaccination?')) {
      try {
        await deleteVaccination({ vaccinationId: id }).unwrap();
        toast.success('Vaccination deleted successfully!', { autoClose: 1000 });
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

  if (vaccinations.length < 1)
    return (
      <div className="text-center py-20 text-gray-400 text-xl font-semibold select-none">
        No vaccination found!
      </div>
    );

  return (
    <section>
      {/* MOBILE: Cards */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {vaccinations.map((record, idx) => (
          <article
            key={idx}
            tabIndex={0}
            className="bg-white border border-gray-200 border-opacity-30 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:shadow-xl duration-200"
          >
            <header className="flex justify-between items-center mb-5">
              <time
                dateTime={record.date_given}
                className="flex items-center gap-2 font-semibold text-primary"
              >
                <Clock size={20} />
                {new Date(record.date_given).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span className="select-none rounded-full px-3 py-.5 font-semibold border border-gray-300 bg-gray-50 text-indigo-600">
                {displayValue(record.status)}
              </span>
            </header>

            <main className="flex-grow text-gray-900">
              <h3 className="text-xl font-semibold truncate mb-1">{displayValue(record.vaccine)}</h3>
              <p className="uppercase text-xs font-semibold tracking-wider text-gray-600 mb-5 select-none">
                Vaccine
              </p>

              <section className="mb-5 space-y-3 max-h-max">
                <div>
                  <h4 className="text-md font-semibold mb-1 select-none">Next Due</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {displayValue(
                      new Date(record.next_due).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-1 select-none">Provider</h4>
                  <p className="text-gray-700 leading-relaxed">{displayValue(record.provider?.fullName)}</p>
                </div>
              </section>
            </main>

            <footer className="flex justify-between items-center text-gray-700 select-none">
              <div className="flex items-center gap-3">
                <Syringe size={24} />
                <span className="font-semibold tracking-wide text-lg">Vaccination</span>
              </div>

              <div className="flex items-center gap-4">
                {/* You can add a download button here if needed */}
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
        ))}
      </div>

      {/* DESKTOP/TABLET: Original Table */}
      <div className="hidden md:block h-screen border rounded-md bg-white overflow-x-auto">
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
          <tbody>
            {vaccinations.map((record, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="px-5 py-3 text-sm">{displayValue(record.vaccine)}</td>
                <td className="px-5 py-3 text-sm">
                  {displayValue(
                    new Date(record.date_given).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                      day: 'numeric',
                    })
                  )}
                </td>
                <td className="px-5 py-3 text-sm">
                  {displayValue(
                    new Date(record.next_due).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                      day: 'numeric',
                    })
                  )}
                </td>
                <td className="px-5 py-3 text-sm">{displayValue(record.status)}</td>
                <td className="px-5 py-3 text-sm">{displayValue(record.provider?.fullName)}</td>
                <td className="px-5 py-3 text-sm flex justify-end gap-1">
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
      {editVaccination && (
        <ModalPopup
          isOpen={editVaccination}
          onClose={() => setEditVaccination(null)}
          title="Edit Vaccination"
          icon={<Syringe />}
        >
          <AddUpdateVaccination
            petId={petId}
            onClose={() => setEditVaccination(null)}
            vaccination={editVaccination}
          />
        </ModalPopup>
      )}
      {viewVaccination && (
        <ModalPopup
          isOpen={viewVaccination}
          onClose={() => setViewVaccination(null)}
          title="Vaccination Details"
          icon={<Syringe />}
        >
          <VaccinationDetails
            vaccination={viewVaccination}
            onClose={() => setViewVaccination(null)}
          />
        </ModalPopup>
      )}
    </section>
  );
};

export default Vaccinations;
