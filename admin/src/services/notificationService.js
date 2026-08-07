export const fetchNotifications = async () => {
    return {
        success: true,
        notifications: [
            { id: 'N101', title: 'New Doctor Onboarded', message: 'Dr. Sarah Wilson joined Cardiology.', date: '15 May 2026' },
            { id: 'N102', title: 'System Maintenance Scheduled', message: 'Server upgrade at 02:00 AM UTC.', date: '14 May 2026' }
        ]
    };
};

export const sendNotification = async (payload) => {
    return { success: true, message: 'Notification broadcasted successfully' };
};
