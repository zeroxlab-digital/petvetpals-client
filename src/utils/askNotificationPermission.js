export const askNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        console.log('Notification permission granted.');
    } else {
        console.warn('Notification permission denied.');
    }
};
