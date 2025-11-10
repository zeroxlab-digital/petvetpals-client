"use client";
import { useDispatch } from 'react-redux';
import { addNotification } from '@/redux/features/notificationSlice';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useUserAuthenticated } from './useUserAuthenticated';

const useReminderNotifications = () => {
    const dispatch = useDispatch();

    // Track shown notifications to avoid duplicates
    const shownReminders = useRef(new Set());
    
    const {isAuthenticated, isLoading: authenticationLoading} = useUserAuthenticated();

    useEffect(() => {
        if(!isAuthenticated) return;
        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/pet/medications/check-med-reminder-notifications`, {
                    withCredentials: true
                });

                const now = new Date();

                if (res?.data?.dueReminders?.length) {
                    res.data.dueReminders.forEach(rem => {
                        const [hour, minute] = rem.reminderTime.split(":").map(Number);

                        const reminderDate = new Date();
                        reminderDate.setHours(hour, minute, 0, 0);

                        const minutesLeft = Math.round((reminderDate - now) / (1000 * 60));
                        const notifId = `${rem.reminderId}-${rem.index}`;

                        // Only show if not already shown
                        if (!shownReminders.current.has(notifId)) {
                            shownReminders.current.add(notifId);

                            dispatch(addNotification({
                                id: notifId,
                                title: `${rem.medication.medication} Reminder`,
                                message: `${rem.pet.name}'s ${rem.medication.medication} is due in ${minutesLeft} minutes at ${rem.reminderTime}.`,
                                timestamp: new Date().toISOString()
                            }));
                        }
                    });
                }
            } catch (error) {
                console.error("Reminder check failed:", error);
            }
        }, 20000); // every 20 seconds

        return () => clearInterval(interval);
    }, [dispatch, isAuthenticated]);
};

export default useReminderNotifications;
