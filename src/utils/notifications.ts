interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

export const sendNotification = async ({ title, body, icon = "/favicon.ico" }: NotificationOptions) => {
  // Check if notifications are supported
  if (!("Notification" in window)) {
    console.error("This browser does not support notifications");
    return false;
  }

  // Check if notification settings exist in localStorage
  const settings = localStorage.getItem('notificationSettings');
  const notificationSettings = settings ? JSON.parse(settings) : {
    paymentReceived: true,
    paymentSent: true,
    lowBalance: true,
    securityAlerts: true
  };

  // Check if the specific type of notification is enabled
  const notificationType = title.toLowerCase().includes('payment received') ? 'paymentReceived' 
    : title.toLowerCase().includes('payment sent') ? 'paymentSent'
    : title.toLowerCase().includes('balance') ? 'lowBalance'
    : 'securityAlerts';

  if (!notificationSettings[notificationType]) {
    return false;
  }

  // Request permission if not granted
  if (Notification.permission !== "granted") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return false;
    }
  }

  // Send notification
  try {
    new Notification(title, {
      body,
      icon
    });
    return true;
  } catch (error) {
    console.error("Error sending notification:", error);
    return false;
  }
};