import {useSelector, useDispatch} from 'react-redux';
import {useSWRConfig} from 'swr';
import {Dropdown, Button, Badge, Menu} from 'antd';
import useUnreadNotificationsCount from 'hooks/useUnreadNotificationsCount';
import notificationsMenu from '../notificationsMenu';
import {Bell} from '../../IconPack';
import styles from './index.module.scss';

const NotificationsDropdown = () => {
	const {mutate} = useSWRConfig();
	const {notifications, error} = useSelector((state) => state.notification); 
	const dispatch = useDispatch();

	const count = useUnreadNotificationsCount(notifications);

	return (
		<Dropdown
			overlay={notificationsMenu({  
				notifications,
				error,
				count,
				dispatch,
				mutate,
			})}
			trigger={['click', 'hover']}
			arrow
		>
			<div>
				<Badge
					className={styles.badge}
					count={count}
					color="#f5222d"
					overflowCount={10}
					offset={count > 10 ? [5, 5] : [-2, 5]}
				>
					<Button type="text" shape="circle" icon={<Bell />} />
				</Badge>
			</div>
		</Dropdown>
	);
};

export default NotificationsDropdown;
