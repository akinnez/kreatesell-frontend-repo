import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import {Table, Card} from 'antd';

import ProfileLayout from 'components/ProfileLayout';
import BackButton from 'components/BackButton';
import styles from '../../../../../public/css/ViewSubscribers.module.scss';
import {ViewSubscribersHeader} from 'components/products/ViewSubscribersFilter';
import useViewMembershipFilters from 'components/affiliates/hooks/useViewMembershipFilters';
import SyncDataToCSV from 'components/DataToCSV/SyncDataToCSV';
import {ShoppingCart} from 'utils';

// TODO: move to its own file
const subscribersColumns = [
	{
		title: 'Product',
		dataIndex: 'product_name',
	},
	{
		title: "Customer's Name",
		dataIndex: 'customer_name',
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: 'Product Price',
		dataIndex: 'product_price',
	},
	{
		title: 'Number of Payments Made',
		dataIndex: 'number_payements_made',
	},
	{
		title: 'Number of Pending Payments',
		dataIndex: 'number_pending_payments',
	},
	{
		title: 'Subscription Start Date',
		dataIndex: 'subscription_start_date',
	},
	{
		title: 'Subscription End Date',
		dataIndex: 'subscription_end_date',
	},
];
export const headCells = [
	{
		title: 'Product',
		dataIndex: 'product_name',
	},
	{
		title: "Customer's Name",
		dataIndex: 'customer_name',
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: 'Product Price',
		dataIndex: 'product_price',
	},
	{
		title: 'Number of Payments Made',
		dataIndex: 'number_payements_made',
	},
	{
		title: 'Number of Pending Payments',
		dataIndex: 'number_pending_payments',
	},
	{
		title: 'Subscription Start Date',
		dataIndex: 'subscription_start_date',
	},
	{
		title: 'Subscription End Date',
		dataIndex: 'subscription_end_date',
	},
];

const rowKey = (record) => record.id;

const CardContainer = () => {
	return (
		<div className={styles.cardContainer}>
			<Card className={styles.card}>
				<div className={styles.dateContainer}>
					<span className={styles.startDate}>
						<span className={styles.dateFiller}>Start Date:</span>
						<p className={styles.date}>Jun 12th 2021, 3:50 PM</p>
					</span>
					<hr />
					<span className={styles.endDate}>
						<span className={styles.dateFiller}>End Date:</span>
						<p>Jun 12th 2021, 3:50 PM</p>
					</span>
				</div>
				<div className={styles.courseTitle}>
					<span>
						<Image src={ShoppingCart} alt="icon" />
					</span>{' '}
					Fundamental of Graphics
				</div>
				<ul className={styles.customerDetails}>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>Customer Name</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							Yusuf Ridwan
						</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>Customer Email</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							yusufridwan@gmail.com
						</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>Product Price</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							NGN 4,565.97
						</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>
							No. of Payments Made
						</h1>
						<p className={`${styles.value} mb-0 ml-4`}>1</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>
							No. of Pending Payments
						</h1>
						<p className={`${styles.value} mb-0 ml-4`}>9</p>
					</li>
				</ul>
			</Card>
		</div>
	);
};

const ViewSubscribers = () => {
	const {url, filters, setFilters} = useViewMembershipFilters(
		'products/get-subscribers'
	);

	const handlePageChange = (page) => {
		setFilters({...filters, page});
	};
	return (
		<ProfileLayout customWidth={true}>
			<Head>
				<title>KreateSell | View Subscribers</title>
			</Head>
			<header className={styles.header}>
				<BackButton />
			</header>
			<div>
				<ViewSubscribersHeader submitCb={setFilters} />

				<div className={styles.exportDiv}>
					<SyncDataToCSV
						data={[]}
						headers={headCells}
						filename="applicants_list"
					/>
				</div>

				<div className={styles.dataSection}>
					<section className={styles.mobileWrapper}>
						<CardContainer />
						<CardContainer />
						<CardContainer />
					</section>
					<section className={styles.tableWrapper}>
						<Table
							dataSource={[]}
							columns={subscribersColumns}
							pagination={{
								position: ['bottomLeft'],
								pageSize: filters.limit,
								current: filters.page,
								total: 0,
								responsive: true,
								onChange: handlePageChange,
							}}
							rowKey={rowKey}
							loading={false}
						/>
					</section>
				</div>
			</div>
		</ProfileLayout>
	);
};

export default ViewSubscribers;
