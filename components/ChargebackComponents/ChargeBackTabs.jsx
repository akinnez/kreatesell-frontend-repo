import {Button} from 'components/button/Button';
import React from 'react';
import styles from './ChargeBackTabs.module.scss';

const tabsTitle = [
	{
		title: 'All',
		tabKey: 'all',
		value: '',
	},
	{
		title: 'Pending',
		tabKey: 'Pending',
		value: 'Pending',
	},
	{
		title: 'Lost',
		tabKey: 'Lost',
		value: 'Lost',
	},
	{
		title: 'Won',
		tabKey: 'Won',
		value: 'Won',
	},
	{
		title: 'Declined',
		tabKey: 'declined',
		value: 'Declined',
	},
];

const ChargeBackTabs = ({status, handleFiterSubmit}) => {
	return (
		<div className={styles.tabContainer}>
			{tabsTitle.map((tab) => (
				<div key={tab.title} className={styles.tabInner}>
					<div
						className={styles.tabButton}
						style={{
							color: status === tab.value ? '#ffffff' : '#000000',
							background:
								status === tab.value
									? '#0072ef'
									: 'transparent',
							border:
								status === tab.value
									? 'none'
									: '1px solid #c9cbd6',
							transition: 'all 0.3s ease-in',
							cursor: 'pointer',
						}}
						onClick={() => {
							handleFiterSubmit(tab.value);
						}}
					>
						{tab.title}
					</div>
				</div>
			))}
		</div>
	);
};

export default ChargeBackTabs;
