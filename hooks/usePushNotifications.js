"use client";

import { useEffect } from "react";
import axios from "axios";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
};

const usePushNotifications = () => {
    useEffect(() => {
        const subscribeUserToPush = async () => {
            if (!("serviceWorker" in navigator)) return;

            const registration = await navigator.serviceWorker.ready;

            // Check for existing subscription
            let subscription = await registration.pushManager.getSubscription();

            const permission = await Notification.requestPermission();
            if (permission !== "granted") return;

            if (!subscription) {
                // Subscribe if not yet
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
                });
                console.log("New subscription created:", subscription);
            } else {
                console.log("Existing subscription found:", subscription);
            }

            // Send subscription to backend (always)
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/push/subscribe`,
                    subscription,
                    { withCredentials: true }
                );
                console.log("Subscription saved to backend successfully.");
            } catch (err) {
                console.error("Failed to save subscription:", err);
            }
        };

        subscribeUserToPush();
    }, []);
};

export default usePushNotifications;
