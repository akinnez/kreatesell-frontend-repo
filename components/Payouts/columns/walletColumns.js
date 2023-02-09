import HistoryTag from '../components/HistoryTag';
import formatAccountNumber from '../utils/formatAccountNumber';
import dateFormat from 'utils/dateFormat';

export const walletColumns = [
	{
		title: 'Amount',
		render: (record) => `${record.currency} ${record.amount}`,
	},
	{
		title: 'Type',
		dataIndex: 'direction',
		render: (record) =>
			record?.toLowerCase() === 'c' ? 'Credit' : 'Debit',
	},
	{
		title: 'Description',
		dataIndex: 'remarks',
		// render: (record) =>
		// 	`${record.bank_name} (${formatAccountNumber(record.bank_account)})`,
		render: (record) => record,
	},
	{
		title: 'Withdrawal Date',
		dataIndex: 'withdrawal_date',
		render: (date) => dateFormat(date),
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (status) => <HistoryTag status={status} />,
	},
];
