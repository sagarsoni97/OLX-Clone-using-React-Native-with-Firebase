import PushNotification from 'react-native-push-notification';

const showNotifications = (title, message) => {
    PushNotification.localNotification({
        title: title,
        message : message,
    });
};

const handleSchedualNotification = (title, message) => {
    PushNotification.localNotificationSchedule({
        title: title,
        message : message,
        date : new Date(Date.now() + 5+1000),    
    })
};

const handleCancel = () => {
    PushNotification.cancelAllLocalNotifications();
};

export { showNotifications, handleSchedualNotification, handleCancel };