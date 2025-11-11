self.addEventListener('push', function (event) {
    if (!event.data) return; // This will ignore the empty pushes
    const data = event.data.json();

    const title = data.title || "Reminder";
    const options = {
        body: data.message || "",
        icon: data.icon || "/icons/icon-192x192.png",
        badge: data.badge || "/icons/badge.png",
        requireInteraction: data.requireInteraction || true,
        data: data.data || {},
        actions: data.actions || []
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", function (event) {
    const { action } = event;
    const { reminderId, index } = event.notification.data || {};

    if (action === "mark-as-given" && reminderId !== undefined) {
        console.log("self registration scrope:", self.registration.scope);
        event.waitUntil(
            fetch(`/api/pet/medications/markgiven-med-reminder`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: reminderId, index })
            })
                .then(() => {
                    event.notification.close();
                    return self.registration.showNotification("✅ Marked as Given", {
                        body: "Medication has been marked successfully.",
                        icon: "/icons/icon-192x192.png"
                    });
                })
                .catch(() => {
                    return self.registration.showNotification("❌ Failed", {
                        body: "Could not mark medication. Try again.",
                        icon: "/icons/icon-192x192.png"
                    });
                })
        );
    } else if (action === "mark-as-done" && reminderId !== undefined) {
        event.waitUntil(
            fetch(`/api/reminder/markgiven-reminder`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: reminderId, timeIndex: index })
            })
                .then(() => {
                    event.notification.close();
                    return self.registration.showNotification("✅ Marked as Done", {
                        body: "Reminder has been marked successfully.",
                        icon: "/icons/icon-192x192.png"
                    });
                })
                .catch(() => {
                    return self.registration.showNotification("❌ Failed", {
                        body: "Could not mark reminder. Try again.",
                        icon: "/icons/icon-192x192.png"
                    });
                })
        );
    }
    else {
        event.notification.close();
    }
});
