self.addEventListener('push', function (event) {
    const data = event.data.json();

    const title = data.title || "Reminder";
    const options = {
        body: data.message,
        icon: "/icons/icon-192x192.png",
        badge: "/icons/badge.png",
        requireInteraction: true,
        data: data.data, // Pass the reminderId/index for later use
        actions: data.actions || []
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", function (event) {
    if (event.action === "mark-as-given") {
        const { reminderId, index } = event.notification.data;

        event.waitUntil(
            fetch(`http://localhost:8000/api/pet/medications/markgiven-scheduled-reminder`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
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
            .catch((err) => {
                console.error("Mark as Given failed", err);
                return self.registration.showNotification("❌ Failed", {
                    body: "Could not mark medication. Try again.",
                });
            })
        );
    } else {
        event.notification.close();
    }
});
