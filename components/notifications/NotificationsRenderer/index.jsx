import { memo, useMemo } from 'react';
import Image from 'next/image';
import NoNotifications from 'components/notifications/NoNotifications';
import NotificationsItem from '../NotificationsItem';
import { notificationTypes } from 'utils/notificationTypes';
import useUnreadNotificationsCount from 'hooks/useUnreadNotificationsCount';
import NotificationPlaceholder from 'public/images/notifications.svg';
import styles from './index.module.scss';

const NotificationsRenderer = ({ notifications }) => {
	const count = useUnreadNotificationsCount(notifications);

	const notificationsList = useMemo(() => {
		return notifications.reduce((list, notification) => {
			const type = notification.notification_type;
			const typeExists = type in notificationTypes;
			if (!typeExists) return list;

			const jsx = (
				<NotificationsItem
					key={notification.id}
					notification={notification} 
				/>
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
				<div className={styles.wrapper}>
					<ul className={styles.notifications}>
						{notificationsList}
					</ul>
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
			)}
		</>
	);
};

export default memo(NotificationsRenderer);
