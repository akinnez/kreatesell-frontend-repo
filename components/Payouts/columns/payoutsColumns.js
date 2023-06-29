import Image from 'next/image';

import {Tooltip} from 'antd';

import {RenderIf, EarnedAsAffiliateTag} from 'utils';
import dateFormat from 'utils/dateFormat';

export const payoutsColumns = [
	{title: 'Product', dataIndex: 'product', width: 200},
	{title: 'Customer Name', dataIndex: 'customer_fullname', width: 150},
	{title: 'Customer Email', dataIndex: 'customer_email_address', width: 150},
	{
		title: 'Amount',
		render: (record) => (
			<div className={`flex gap-2`}>
				{`${record.currency} ${Number(record.amount).toFixed(2)}`}
				<RenderIf
					condition={record?.earned_as === 'Earned as Affiliate'}
				>
					<Tooltip
						title="You earned this amount as an affiliate"
						placement="top"
					>
						<div style={{}}>
							<Image
								width={40}
								height={20}
								alt="Earned as Affiliate Tag"
								src={EarnedAsAffiliateTag}
							/>
						</div>
					</Tooltip>
				</RenderIf>
			</div>
		),
		width: 200,
	},
	{
		title: 'Transaction Date',
		dataIndex: 'transaction_date',
		render: (transactionDate) => dateFormat(transactionDate),
		width: 200,
	},
	{
		title: 'Settlement Date',
		dataIndex: 'settlement_date',
		render: (settlementDate) => dateFormat(settlementDate),
		width: 200,
	},
];
