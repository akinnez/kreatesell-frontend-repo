import dateFormat from 'utils/dateFormat';
import formatNumber from 'utils/formatNumber';

export const payoutsColumns = [
	{title: 'Product', dataIndex: 'product', width: 200},
	{title: 'Customer Name', dataIndex: 'customer_fullname', width: 150},
	{title: 'Customer Email', dataIndex: 'customer_email_address'},
	{
		title: 'Amount',
		render: (record) =>
			`${record.currency} ${Number(record.amount).toFixed(2)}`,
	},
	{
		title: 'Transaction Date',
		dataIndex: 'transaction_date',
		render: (transactionDate) => dateFormat(transactionDate),
	},
	{
		title: 'Settlement Date',
		dataIndex: 'settlement_date',
		render: (settlementDate) => dateFormat(settlementDate),
	},
];
