import Link from 'next/link';
import {Menu} from 'antd';
import NoNotifications from '../NoNotifications';
import Spinner from 'components/Spinner';
import {
	generateName,
	generateProductName,
	updateNotificationsFn,
} from '../utils';
import {notificationTime} from 'utils';
import {notificationTypes} from 'utils/notificationTypes';
import styles from './index.module.scss';

const notificationsMenu = ({notifications, error, count, dispatch, mutate}) => {
	if (error) {
		return (
			<Menu>
				<Menu.Item
					className={`${styles.menu__item} ${styles['error-menu__item']}`}
					key="error"
				>
					Error getting your notifications
				</Menu.Item>
			</Menu>
		);
	}

	if (!notifications) {
		return (
			<Menu>
				<Menu.Item
					className={styles.menu__item}
					key="loading-notifications"
				>
					<Spinner size="small" />
				</Menu.Item>
			</Menu>
		);
	}

	if (notifications.length === 0) {
		return (
			<Menu>
				<Menu.Item
					className={styles.menu__item}
					key="empty-notifications"
				>
					<NoNotifications />
				</Menu.Item>
			</Menu>
		);
	}

	if (!count) {
		return (
			<Menu>
				<Menu.Item
					className={styles.menu__item}
					key="no-unread-notifications"
				>
					<div className={styles['no-unread-notifications']}>
						<p>You have no new/unread notifications</p>
						<Link href="/account/kreator/notifications">
							<a className={styles.link}>See Notifications</a>
						</Link>
					</div>
				</Menu.Item>
			</Menu>
		);
	}

	const handleClick = (notification) => {
		if (!notification.is_read) {
			updateNotificationsFn(notification.id, dispatch, mutate);
		}
	};

	const renderNotifications = [];

	for (let i = 0; i < notifications.length; i++) {
		if (renderNotifications.length === 6) break;

		const notification = notifications[i];
		// const type = notification.notification_type;

		// if (!type in notificationTypes) continue;
		// if (notification.is_read) continue;

		// const name = generateName(notification.name, type);
		// const productName = generateProductName(
		// 	notification.product_name,
		// 	type
		// );

		const jsx = (
			<Menu.Item
				className={`${styles.menu__item} ${styles['data-menu__item']}`}
				key={notification.id}
			>
				<Link href="/account/kreator/notifications">
					<a onClick={() => handleClick(notification)}>
						<p className={styles.bold}>{notification?.content}</p>
						<p>{notificationTime(notification.created_at)}</p>
					</a>
				</Link>
			</Menu.Item>
		);

		renderNotifications.push(jsx);
	}

	return <Menu className={styles.menu_container}>{renderNotifications}</Menu>;
};

export default notificationsMenu;
