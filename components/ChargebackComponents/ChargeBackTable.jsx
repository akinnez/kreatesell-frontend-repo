import styles from './ChargeBackTable.module.scss';
import Image from 'next/image';
import {useState} from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import {ErrorDiv, SuccessDiv, PendingDiv} from './ChargeBackCenter';
import {EmptyDataTable} from 'utils';

const headcells = [
	{
		text: 'Payment Reference',
	},
	,
	{
		text: "Customer's Email",
	},
	,
	{
		text: 'Product ',
	},
	,
	{
		text: 'Amount',
	},
	,
	{
		text: 'Transaction Date',
	},
	{
		text: 'Chargeback Due Date',
	},
	{
		text: 'Status',
	},
];

export const ChargeBackTable = (props) => {
	const {data} = props;

	const [openPopOver, setOpenPopOver] = useState(false);
	return (
		<div className={styles.tableContainer}>
			<table className={styles.table}>
				{data && data?.length > 0 && (
					<thead>
						<tr>
							{headcells?.map((item, i) => (
								<th key={i}>{item?.text}</th>
							))}
						</tr>
					</thead>
				)}

				{Boolean(data?.length) && (
					<tbody className="t-body">
						{data?.map((item, i) => (
							<tr key={item?.id || i}>
								<td>{item?.payment_reference}</td>
								<td>{item?.customer_email}</td>
								<td>{item?.product}</td>
								<td>
									{
										<NumberFormat
											value={item?.amount}
											className={styles.price}
											displayType={'text'}
											thousandSeparator={true}
											prefix={'NGN'}
											renderText={(value, props) => (
												<p {...props}>{value}</p>
											)}
										/>
									}
								</td>
								<td>
									{moment(item?.transaction_date).format(
										'DD-MM-YYYY'
									)}
								</td>
								<td>
									{moment(item?.due_date).format(
										'DD-MM-YYYY'
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
				)}
			</table>

			{!Boolean(data?.length) && (
				<div className={styles.emptyDivContainer}>
					<div>
						<Image src={EmptyDataTable} alt="Empty Table" />
						<br />
						<h3>No Data Available</h3>
					</div>
				</div>
			)}
		</div>
	);
};
