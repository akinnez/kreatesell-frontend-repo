import Image from "next/image";
import Head from "next/head";
import { useSelector } from "react-redux";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import ProfilePageError from "components/ProfilePageError";
import ProfilePageLoading from "components/ProfilePageLoading";
import SingleNotification from "components/notifications/SingleNotification";
import useUnreadNotificationsCount from "hooks/useUnreadNotificationsCount";
import NotificationPlaceholder from "public/images/notifications.svg";
import styles from "public/css/Notifications.module.scss";

const InAppNotification = () => {
  const { notifications, error } = useSelector(state => state.notification);

  const count = useUnreadNotificationsCount(notifications);

  if (error) {
    return (
      <ProfilePageError
        errorMsg="Error getting your notifications"
        title="Notifications"
      />
    );
  }

  if (!notifications) return <ProfilePageLoading title="Notifications" />;

  return (
    <ProfileLayout>
      <Head>
        <title>KreateSell | Notifications</title>
      </Head>
      <header className={styles.header}>
        <span>
          <BackButton />
        </span>
        <div>
          <h2>Notifications</h2>
          <p>
            This is where you keep track of what&#39;s happening in your store.
          </p>
        </div>
      </header>
      <section>
        <div className={styles.wrapper}>
          <SingleNotification notifications={notifications} />
          <aside>
            <div className={styles.image}>
              <Image
                src={NotificationPlaceholder}
                alt="Notification placeholder"
              />
            </div>
            {count > 0 && <p>You have some unread notifications</p>}
          </aside>
        </div>
      </section>
    </ProfileLayout>
  );
};

export default InAppNotification;
