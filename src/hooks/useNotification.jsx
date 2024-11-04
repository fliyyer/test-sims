import { useState, useEffect } from 'react';

const useNotification = (duration = 3000) => {
    const [notification, setNotification] = useState({
        message: '',
        type: '',
        show: false,
    });

    const notify = (message, type) => {
        setNotification({ message, type, show: true });
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, show: false }));
    };

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                closeNotification();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [notification.show, duration]);

    return { notification, notify, closeNotification };
};

export default useNotification;
