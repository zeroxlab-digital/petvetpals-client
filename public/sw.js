self.addEventListener('push', function(event) {
    const data = event.data.json();

    const title = data.title || 'Reminder';
    const options = {
        body: data.message,
        icon: '/icons/icon-192x192.png', // optional
        badge: '/icons/badge.png', // optional
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
