import { useMemo } from "react";
import { notificationTypes } from "utils/notificationTypes";

const useUnreadNotificationsCount = notifications => {
  const count = useMemo(() => {
    if (!notifications || notifications.length === 0) return 0;

    return notifications.reduce((total, notification) => {
      const typeExists = notification.notification_type in notificationTypes;
      if (!typeExists) return total;

      return notification.is_read === false ? total + 1 : total;
    }, 0);
  }, [notifications]);

  return count;
};

export default useUnreadNotificationsCount;
