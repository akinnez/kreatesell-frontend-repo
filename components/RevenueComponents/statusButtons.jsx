import {Button} from 'antd';
import styles from './header.module.scss';

const statusArr = [
	{type: 'All', label: 'All'},
	{type: 'successful', label: 'Successful'},
	{type: 'cleared', label: 'Cleared'},
	{type: 'abandoned', label: 'Abandoned'},
	// {type: 'pending', label: 'Pending clearance'},
	{type: 'failed', label: 'Failed'},
];

const StatusButtons = ({setFilters, filters, setLoading}) => {
	const handleClick = (type) => {
		setFilters({...filters, status: type});
		setLoading(true);
	};

	return (
		<section className={styles.status__btns__section}>
			<div className={styles.status__btns}>
				{statusArr.map(({type, label}) => (
					<div className={styles.status__btn} key={label}>
						<Button
							onClick={() => handleClick(type)}
							type={
								filters.status === type ? 'primary' : 'default'
							}
						>
							{label}
						</Button>
					</div>
				))}
			</div>
		</section>
	);
};

export default StatusButtons;
