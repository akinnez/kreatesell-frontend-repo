import React from 'react';
import dayjs from 'dayjs';
import styles from './RecentChargeBack.module.scss';
import {ErrorDiv, SuccessDiv, PendingDiv} from './ChargeBackCenter';
const dummy = [
	{
		email: 'example@gmail.com',
		date: new Date(),
		status: 'won',
	},
	{
		email: 'example2@gmail.com',
		date: new Date(),
		status: 'won',
	},
	{
		email: 'example@gmail.com',
		date: new Date(),
		status: 'lose',
	},
	{
		email: 'example@gmail.com',
		date: new Date(),
		status: 'pending',
	},
];
const RecentChargeBackTable = ({chargebacks}) => {
	return (
		<div>
			<h4 className={styles.tableHeading}>Chargeback Requests</h4>
			<table className={styles.table}>
				<thead className={styles.tableHead}>
					<tr className={styles.tableRow}>
						<th>Customer</th>
						<th>Due Date</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{chargebacks &&
						chargebacks?.length &&
						chargebacks?.slice(0, 12)?.map((item, i) => (
							<tr key={i} className={styles.trow}>
								<td className={styles.td}>
									{item?.customer_email}
								</td>
								<td>
									{dayjs(new Date(item?.due_date)).format(
										'MMM, DD YYYY'
									)}
								</td>
								<td>
									{item?.status.toLowerCase() ===
									'pending' ? (
										<PendingDiv />
									) : item?.status.toLowerCase() === 'won' ? (
										<SuccessDiv />
									) : (
										<ErrorDiv />
									)}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default RecentChargeBackTable;
