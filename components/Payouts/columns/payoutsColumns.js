import {RenderIf} from 'utils';
import dateFormat from 'utils/dateFormat';

export const payoutsColumns = [
	{title: 'Product', dataIndex: 'product', width: 200},
	{title: 'Customer Name', dataIndex: 'customer_fullname', width: 150},
	{title: 'Customer Email', dataIndex: 'customer_email_address', width: 150},
	{
		title: 'Amount',
		render: (record) => (
			<div className={`flex`}>
				{`${record.currency} ${Number(record.amount).toFixed(2)}`}
				<RenderIf
					condition={record?.earned_as === 'Earned as Affiliate'}
				>
					<p
						className={`flex items-center justify-center ml-1`}
						style={{
							background: ' #00B140',
							paddingInline: '.14rem',
							color: '#fff',
							marginBottom: '0',
							fontSize: '9px',
							fontWeight: 700,
							borderRadius: '2px',
						}}
					>
						Earned as an Affiliate
					</p>
				</RenderIf>
			</div>
		),
		width: 300,
	},
	{
		title: 'Transaction Date',
		dataIndex: 'transaction_date',
		render: (transactionDate) => dateFormat(transactionDate),
		width: 130,
	},
	{
		title: 'Settlement Date',
		dataIndex: 'settlement_date',
		render: (settlementDate) => dateFormat(settlementDate),
		width: 130,
	},
];
