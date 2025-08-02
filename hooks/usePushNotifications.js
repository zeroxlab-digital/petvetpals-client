"use client";
import { useEffect } from "react";
import axios from "axios";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const usePushNotifications = () => {
    useEffect(() => {
        const subscribeUserToPush = async () => {
            if (!("serviceWorker" in navigator)) return;
            const registration = await navigator.serviceWorker.ready;

            const existingSubscription = await registration.pushManager.getSubscription();
            if (existingSubscription) return; // Already subscribed

            const permission = await Notification.requestPermission();
            if (permission !== "granted") return;

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
            });

            // Send to backend to save
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/push/subscribe`, subscription, {
                withCredentials: true,
            });

            console.log("User is subscribed to push:", subscription);
        };

        subscribeUserToPush();
    }, []);
};

export default usePushNotifications;
