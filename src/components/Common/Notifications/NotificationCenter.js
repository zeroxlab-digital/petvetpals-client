"use client";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeNotification } from '@/redux/features/notificationSlice';

const NotificationCenter = () => {

    const notifications = useSelector(state => state.notifications);
    // console.log(notifications)
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            if (notifications.length > 0) {
                dispatch(removeNotification(notifications[0].id));
            }
        }, 10000); // auto-dismiss after 10s

        return () => clearInterval(interval);
    }, [notifications]);

    return (
        <div className="fixed top-4 right-4 space-y-2 z-50">
            {notifications.map((notif) => (
                <div key={notif.id} className="bg-white border shadow-md p-4 rounded-md text-sm text-gray-800">
                    <strong>{notif.title}</strong>
                    <div>{notif.message}</div>
                </div>
            ))}
        </div>
    );
};

export default NotificationCenter;
