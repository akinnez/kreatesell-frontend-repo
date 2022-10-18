import {useEffect, useState} from 'react';

import {Table} from 'antd';
// import { Table } from './Table'
import {DownloadIcon, RightArrow} from 'utils';
import styles from './TicketsTable.module.scss';
import Image from 'next/image';
// import { Pagination } from "antd";
import {useRouter} from 'next/router';

const tableHeader = [
	{
		title: 'Ticket ID',
		dataIndex: 'ticket_id',
	},

	{
		title: 'Subject',
		dataIndex: 'subject',
	},
	{
		title: 'Department',
		dataIndex: 'department',
	},
	{
		title: 'Date',
		dataIndex: 'date_created',
	},

	{
		title: 'Status',
		dataIndex: 'status',
	},
	{
		title: 'Actions',
		dataIndex: 'actions',
	},
];
const TicketTable = ({tickets, handlePaginationChange, page}) => {
	const router = useRouter();

	const [productData, setProductData] = useState([]);
	const [productName, setProductName] = useState('');
	const [startDate, setStartDate] = useState('');
	const [productStatusId, setProductStatusId] = useState('');
	const [endDate, setEndDate] = useState('');

	return (
		<div className={styles.ticketsContainer}>
			{/* <div className={styles.ticketsTopSection}>
        <div className={styles.ticketsTopSectionInner}>
          <div className="text-primary-blue  font-semibold text-xs pr-2">
            View All Ticket
          </div>
          <RightArrow color="#0072EF" />
        </div>
        {tickets?.length && (
          <div className={styles.ticketsTopSectionInner}>
            <div className="text-primary-blue  font-semibold text-xs pr-2">
              Export Data in CSV
            </div>
            <Image src={DownloadIcon} alt="" />
          </div>
        )}
      </div> */}

			<div>
				<Table
					columns={tableHeader}
					loading={false}
					dataSource={[]}
					scroll={{x: 1000}}
					size="large"
				/>
			</div>
		</div>
	);
};

export default TicketTable;
