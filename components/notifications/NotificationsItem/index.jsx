import Image from 'next/image';
import {useSWRConfig} from 'swr';
import {useDispatch} from 'react-redux';
import {
	generateName,
	generateProductName,
	updateNotificationsFn,
} from '../utils';
// import {notificationTypes} from 'utils/notificationTypes';
import {notificationTime} from 'utils';
import styles from './index.module.scss';
import {useRouter} from 'next/router';

const NotificationsItem = ({notification}) => {
	const {mutate} = useSWRConfig();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleClick = (notification) => {
		if (!notification.is_read) {
			updateNotificationsFn(notification.id, dispatch, mutate);
		}
		if (
			notification?.notification_type.toLowerCase() ===
			'affiliate request'
		) {
			router.push('/account/affiliate/requests');
			return;
		}
		if (notification?.notification_type.toLowerCase() === 'sales') {
			router.push('/account/sales/transactions');
			return;
		}
	};

	const type = notification.notification_type;
	const name = generateName(notification.name, type);
	const productName = generateProductName(notification.product_name, type);

	return (
		<li
			key={notification.id}
			className={
				notification.is_read
					? `${styles.notification}`
					: `${styles.notification} ${styles['notification--unread']}`
			}
		>
			<button onClick={() => handleClick(notification)}>
				<div className={styles.notification__content}>
					<div className={styles.notification__info}>
						<p>
							{notification?.content || 'Notification content not provided'}
						</p>
						<p>{notificationTime(notification.created_at)}</p>
					</div>
					{notification.product_img && (
						<div className={styles['notification__product-image']}>
							<Image
								src={notification.product_img}
								alt={notification.product_name ?? productName}
								layout="fill"
							/>
						</div>
					)}
				</div>
			</button>
		</li>
	);
};

export default NotificationsItem;
