import { useMemo } from "react";
import Image from "next/image";
import NoNotifications from "components/notifications/NoNotifications";
import { generateName, generateProductName } from "../utils";
import { notificationTime } from "utils";
import { notificationTypes } from "utils/notificationTypes";
import styles from "./index.module.scss";

const SingleNotification = ({ notifications }) => {
  const handleClick = id => null;

  const notificationsList = useMemo(() => {
    return notifications.reduce((list, notification) => {
      const type = notification.notification_type;
      const typeExists = type in notificationTypes;

      if (!typeExists) return list;

      const name = generateName(notification.name, type);
      const productName = generateProductName(notification.product_name, type);

      const jsx = (
        <li
          key={notification.id}
          className={
            notification.is_read
              ? `${styles.notification}`
              : `${styles.notification} ${styles["notification--unread"]}`
          }
        >
          <button onClick={() => handleClick(notification.id)}>
            <div className={styles.notification__content}>
              <div className={styles.notification__info}>
                <p>
                  {type === "affiliate request"
                    ? notificationTypes[type](name, productName)
                    : type === "approve affiliate"
                    ? notificationTypes[type](name)
                    : notificationTypes[type]}
                </p>
                <p>{notificationTime(notification.created_at)}</p>
              </div>
              {notification.product_img && (
                <div className={styles["notification__product-image"]}>
                  <Image
                    src={notification.product_img}
                    alt={notification.product_name || "Product Image"}
                    layout="fill"
                  />
                </div>
              )}
            </div>
          </button>
        </li>
      );

      list.push(jsx);
      return list;
    }, []);
  }, [notifications]);

  return (
    <>
      {notificationsList.length === 0 ? (
        <NoNotifications width={200} height={200} />
      ) : (
        <ul className={styles.notifications}>{notificationsList}</ul>
      )}
    </>
  );
};

export default SingleNotification;