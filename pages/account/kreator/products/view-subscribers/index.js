import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Table, Card, Tooltip } from 'antd';

import ProfileLayout from 'components/ProfileLayout';
import BackButton from 'components/BackButton';
import styles from '../../../../../public/css/ViewSubscribers.module.scss';
import { ViewSubscribersHeader } from 'components/products/ViewSubscribersFilter';
import useViewMembershipFilters from 'components/affiliates/hooks/useViewMembershipFilters';
import SyncDataToCSV from 'components/DataToCSV/SyncDataToCSV';
import { ShoppingCart, formatDateAndTime, formatShortDateAndTime, InfinityIcon } from 'utils';
import useSubscribersList from 'services/swrQueryHooks/SubscribersList';

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
		dataIndex: 'customer_email',
	},
	{
		title: 'Product Price',
		dataIndex: 'product_price',
		render: (item, all) => (
			<>
				{all.currency} {item}
			</>
		),
	},
	{
		title: 'Number of Payments Made',
		dataIndex: 'number_of_payment_made',
	},
	{
		title: 'Number of Pending Payments',
		dataIndex: 'number_of_pending_payments',
		render: (value) => {
			if (value <= 0) {
				return (
					<>
						<Tooltip title="The subscriber will be charged until they cancel">
							<Image src={InfinityIcon} alt="icon" />
						</Tooltip>
					</>
				);
			}
			return value;
		}
	},
	{
		title: 'Subscription Start Date',
		dataIndex: 'subscription_start',
		render: (item) => <p>{formatDateAndTime(item)}</p>,
	},
	{
		title: 'Subscription End Date',
		dataIndex: 'subscription_end',
		render: (item) => <p>{formatDateAndTime(item)}</p>,
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

const CardContainer = ({ data }) => {
	return (
		<div className={styles.cardContainer}>
			<Card className={styles.card}>
				<div className={styles.dateContainer}>
					<span className={styles.startDate}>
						<span className={styles.dateFiller}>Start Date:</span>
						<p className={styles.date}>
							{formatShortDateAndTime(data.subscription_start)}
						</p>
					</span>
					<hr />
					<span className={styles.endDate}>
						<span className={styles.dateFiller}>End Date:</span>
						<p>{formatShortDateAndTime(data.subscription_end)}</p>
					</span>
				</div>
				<div className={styles.courseTitle}>
					<span>
						<Image src={ShoppingCart} alt="icon" />
					</span>{' '}
					{data?.product_name}
				</div>
				<ul className={styles.customerDetails}>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>Customer Name</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							{data?.customer_name}
						</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>Customer Email</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							{data?.customer_email}
						</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>Product Price</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							{data?.currency} {data?.product_price}
						</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>
							No. of Payments Made
						</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							{data?.number_of_payment_made}
						</p>
					</li>
					<li className={styles.customerDetail}>
						<h1 className={`${styles.key} mb-0`}>
							No. of Pending Payments
						</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							{data?.number_of_pending_payments}
						</p>
					</li>
				</ul>
			</Card>
		</div>
	);
};

const ViewSubscribers = () => {
	const router = useRouter();

	const { url, filters, setFilters } = useViewMembershipFilters(
		'v1/kreatesell/product/fetch/all/subscribers'
	);

	const {
		loading,
		subscribers,
		subscribersData,
		subscribersError,
		subscribersLoading,
		isValidating,
	} = useSubscribersList(url, !!filters.KreatorProductId);

	const handlePageChange = (page) => {
		setFilters({ ...filters, page });
	};

	useEffect(() => {
		if (router.query.KreatorProductId) {
			setFilters((prev) => ({
				...prev,
				KreatorProductId: router.query.KreatorProductId,
			}));
		}
	}, [router.query.KreatorProductId]);

	// if (subscribersLoading) return <>Loading...</>;
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
						{subscribers?.data?.map((dt, idx) => (
							<CardContainer key={idx} data={dt} />
						))}
					</section>
					<section className={styles.tableWrapper}>
						<Table
							dataSource={subscribers?.data || []}
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
							loading={subscribersLoading || isValidating}
						/>
					</section>
				</div>
			</div>
		</ProfileLayout>
	);
};

export default ViewSubscribers;
