import HistoryTag from '../components/HistoryTag';
import formatAccountNumber from '../utils/formatAccountNumber';
import dateFormat from 'utils/dateFormat';

const statusColorComponent = (status) => {
	const defaultStyle = {
		borderRadius: '8px',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '0px',
		fontWeight: 400,
		fontSize: '16px',
	};
	const StatusObj = {
		Credit: {
			color: '#2DC071',
			background: '#F1FCF8',
		},
		Debit: {
			color: '#FF4D4F',
			background: 'rgba(255, 77, 79, 0.1)',
		},
		Pending: {
			color: '#FBB500',
			background: 'rgba(255, 214, 102, 0.2)',
		},
	};
	if (!StatusObj[status]) return;
	return <p style={{...StatusObj[status], ...defaultStyle}}>{status}</p>;
};

export const walletColumns = [
	{
		title: 'Amount',
		render: (record) => `${record.currency} ${record.amount}`,
	},
	{
		title: 'Type',
		dataIndex: 'direction',
		render: (record) =>
			record?.toLowerCase() === 'c'
				? statusColorComponent('Credit')
				: statusColorComponent('Debit'),
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
		dataIndex: 'date_created',
		render: (date) => dateFormat(date),
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (status) => <HistoryTag status={status} />,
	},
];
