import React, { useEffect, useState } from 'react';
import Actions from '@/components/Common/Actions/Actions';
import {
  useDeleteMedScheduledReminderMutation,
  useGetScheduledRemindersQuery,
} from '@/redux/services/petApi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import {
  HiEllipsisVertical,
  HiOutlineCheckCircle,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { displayValue } from '@/utils/displayValue';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { toast } from 'react-toastify';

const ScheduleAndReminders = ({ activeTab, petId }) => {
  const { data, isLoading } = useGetScheduledRemindersQuery({ petId });
  const [deleteMedScheduledReminder, {}] = useDeleteMedScheduledReminderMutation();
  const scheduledMedications = React.useMemo(() => data?.scheduledReminders || [], [data]);

  const [countdowns, setCountdowns] = useState({});

  const getDoseStatus = (dose) => {
    const now = new Date();
    const [hours, minutes] = dose.reminder_time.split(':').map(Number);
    const reminderDate = new Date(now);
    reminderDate.setHours(hours, minutes, 0, 0);

    const timeDiffMs = reminderDate - now;
    const isPast = now > reminderDate;
    const withinOneHour = timeDiffMs > 0 && timeDiffMs <= 3600000;
    const moreThan3Hours = timeDiffMs > 3 * 3600000;

    if (isPast) {
      return dose.isGiven ? 'given' : 'overdue';
    } else if (withinOneHour) {
      return 'countdown';
    } else if (moreThan3Hours) {
      return 'upcoming';
    } else {
      return 'pending';
    }
  };

  const formatCountdown = (targetTime) => {
    const diff = targetTime - new Date();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = {};

      scheduledMedications.forEach((dose) => {
        const status = getDoseStatus(dose);
        if (status === 'countdown') {
          const now = new Date();
          const [hours, minutes] = dose.reminder_time.split(':').map(Number);
          const reminderDate = new Date(now);
          reminderDate.setHours(hours, minutes, 0, 0);

          const countdownStr = formatCountdown(reminderDate);
          if (countdownStr) {
            updatedCountdowns[dose._id] = `${countdownStr.slice(2)} until ${dose.medication.medication}`;
          }
        }
      });

      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [scheduledMedications]);

  const handleDelete = async (id) => {
    try {
      await deleteMedScheduledReminder({ id });
      toast.success('Reminder deleted successfully!', { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      toast.error('Reminder did not delete!', { autoClose: 1000 });
    }
  };

  if (isLoading) return <div><PetSpinner /></div>;

  return (
    activeTab === 'schedule-reminders' && (
      <div className='h-screen border rounded-md bg-white overflow-x-auto'>
        <table className='w-full border-collapse p-5'>
          <thead>
            <tr className='text-left text-xs md:text-sm text-gray-500 border-b'>
              <th className='p-5'>Medication</th>
              <th className='p-5'>Reminder time</th>
              <th className='p-5'>Dosage</th>
              <th className='p-5'>Date</th>
              <th className='p-5'>Instructions</th>
              <th className='p-5 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scheduledMedications.map((dose) => {
              const status = getDoseStatus(dose);
              const [hours, minutes] = dose.reminder_time.split(':').map(Number);
              const reminderDate = new Date();
              reminderDate.setHours(hours, minutes, 0, 0);

              const bgColor =
                status === 'given'
                  ? 'bg-green-400 bg-opacity-15 hover:bg-opacity-20'
                  : status === 'overdue'
                  ? 'bg-red-400 bg-opacity-15 hover:bg-opacity-20'
                  : '';

              const badge = (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full 
                    ${status === 'given' ? 'bg-green-200 text-green-800' : ''}
                    ${status === 'overdue' ? 'bg-red-200 text-red-800' : ''}
                    ${status === 'upcoming' ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {status === 'given' && 'Given'}
                  {status === 'overdue' && 'Overdue'}
                  {status === 'upcoming' && 'Upcoming'}
                </span>
              );

              return (
                <tr key={dose._id} className={`${bgColor} border-b last:border-none`}>
                  <td className='p-5 text-sm'>{displayValue(dose.medication.medication)}</td>
                  <td className='p-5 text-sm'>
                    {displayValue(dose.reminder_time)} <span className='text-xs text-gray-800'>/ daily</span>
                    {badge}
                    {status === 'countdown' && (
                      <div className='text-xs text-gray-600 mt-1'>{countdowns[dose._id]}</div>
                    )}
                  </td>
                  <td className='p-5 text-sm'>{displayValue(dose.medication.dosage)}</td>
                  <td className='p-5 text-sm'>
                    {new Date(dose.starting_date).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: 'numeric',
                    })}
                    -
                    {new Date(dose.end_date).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: 'numeric',
                    })}
                  </td>
                  <td className='p-5 text-sm'>{displayValue(dose.medication.instructions)}</td>
                  <td className='px-5 py-3 text-sm flex justify-end'>
                    <span className='relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center'>
                      <HiEllipsisVertical className='text-xl text-gray-800' />
                      <Actions
                        actions={[
                          {
                            label: 'Mark as Given',
                            icon: <HiOutlineCheckCircle />,
                            // onClick: () => handleMarkComplete(dose._id),
                          },
                          {
                            label: 'Edit',
                            icon: <HiOutlinePencilAlt />,
                            // onClick: () => handleEdit(dose),
                          },
                          {
                            label: 'Delete',
                            icon: <HiOutlineTrash />,
                            onClick: () => handleDelete(dose._id),
                          },
                        ]}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default ScheduleAndReminders;
