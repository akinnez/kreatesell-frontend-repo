import {useEffect} from 'react';

import {Button} from 'antd';
import styles from './header.module.scss';

const statusArr = [
	{type: 'All', label: 'All'},
	{type: 'Successful', label: 'Successful'},
	{type: 'Cleared', label: 'Cleared'},
	{type: 'Cancelled', label: 'Cancelled'},
	{type: 'Failed', label: 'Failed'},
];

const StatusButtons = ({setFilters, filters, setLoading}) => {
	useEffect(() => {
		setFilters((prev) => ({...prev, status: 'Successful'}));
	}, []);

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
