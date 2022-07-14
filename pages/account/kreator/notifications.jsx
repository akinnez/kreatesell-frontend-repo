import Head from "next/head";
import { useSelector } from "react-redux";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import ProfilePageError from "components/ProfilePageError";
import ProfilePageLoading from "components/ProfilePageLoading";
import NotificationsRenderer from "components/notifications/NotificationsRenderer";
import styles from "public/css/Notifications.module.scss";

const InAppNotification = () => {
  const { notifications, error } = useSelector(state => state.notification);

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
        <NotificationsRenderer notifications={notifications} />
      </section>
    </ProfileLayout>
  );
};

export default InAppNotification;
