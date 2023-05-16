import React, {useState, useEffect, useMemo} from 'react';
import Image from 'next/image';

import useSWR from 'swr';
import {Table, Card} from 'antd';
import {format, parseISO} from 'date-fns';

import styles from '../../../../public/css/AllRevenue.module.scss';
import RevenueHeader from 'components/RevenueComponents/header';
import AuthLayout from 'components/authlayout';
import useFilters from 'components/TransactionComponents/useFilters';
import axiosAPI from 'utils/axios';
import {dateString} from 'utils/dateFormat';
import {emptyComponent} from 'components';
import {Cart} from 'utils';

const statusComponent = (item) => {
	const statusTextList = {
		Successful: {
			type: 'successful',
			styles: {
				background: '#F1FCF8',
				borderRadius: '.5rem',
				color: ' #2DC071',
				fontSize: '.85rem',
			},
			contents: '',
		},
		Pending: {
			type: 'pending',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '.85rem',
			},
			contents: '',
		},
		Initiated: {
			type: 'initiated',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '.85rem',
			},
			contents: '',
		},
		Cleared: {
			type: 'cleared',
			styles: {
				background: '#F1FCF8',
				borderRadius: '.5rem',
				color: ' #2DC071',
				fontSize: '.85rem',
			},
			contents: '',
		},
		Failed: {
			type: 'failed',
			styles: {
				background: 'rgba(255, 77, 79, 0.1)',
				borderRadius: '.5rem',
				color: '#F90005',
				fontSize: '.85rem',
			},
			contents: '',
		},
		ChargeBack: {
			type: 'chargeBack',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '.85rem',
			},
			contents: '',
		},
		Refunded: {
			type: 'refunded',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '.85rem',
			},
			contents: '',
		},
		Reversed: {
			type: 'reversed',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '.85rem',
			},
			contents: '',
		},
	};
	let tagStyles = statusTextList[item]?.styles;
	let mainType = statusTextList[item]?.type;
	return (
		<>
			<>
				<div className={styles.tags} style={tagStyles}>
					{mainType?.charAt(0).toUpperCase() + mainType?.slice(1)}
				</div>
			</>
		</>
	);
};
const columns = [
	{
		title: 'Order Id',
		dataIndex: 'order_id',
		width: 120,
	},
	{
		title: 'Product',
		dataIndex: 'products',
		width: 200,
	},
	{
		title: 'transaction_amount',
		render: (_, data) => {
			return (
				<span>{`${data?.currency} ${data?.transaction_amount}`}</span>
			);
		},
		width: 150,
	},
	{
		title: 'Commission',
		dataIndex: 'commission',
		width: 100,
	},
	{
		title: 'Clearance Date',
		dataIndex: 'clearance_date',
		width: 180,
		render: (item) => {
			const time = parseISO(item);

			const formatTime = format(time, 'PPPp');
			const formatDate = format(time, 'PPP');
			return (
				<div className="flex flex-col items-center">
					<div>
						{`${formatDate.split('at')[0]},`}{' '}
						{formatTime.split('at')[1]}
					</div>
				</div>
			);
		},
	},
	{
		title: 'Transaction Status',
		dataIndex: 'status',
		render: (item) => {
			return statusComponent(item);
		},
		width: 150,
	},
];

const exportColumns = [
	{
		label: 'Order Id',
		key: 'order_id',
	},
	{
		label: 'Product',
		key: 'product',
	},
	{
		label: 'Price',
		dateIndex: 'price',
	},
	{
		label: 'Payment Method',
		key: 'payment_method',
	},
	{
		label: 'Date',
		key: 'date_created',
	},
	{
		label: 'Clearance Date',
		key: 'clearance_date',
	},
	{
		label: 'Transaction Status',
		key: 'transaction_status',
	},
];

const tableLocale = {
	emptyText: emptyComponent('No record yet'),
};

const formatNumberToLocaleString = (number) => {
	return number.toLocaleString(undefined, {maximumFractionDigits: 2});
};

const CardComponent = ({data}) => {
	// console.log('data = ', data);
	const formatDateFn = (date) => {
		const time = parseISO(date);
		const formatTime = format(time, 'PPPp');
		const formatDate = format(time, 'PPP');

		return `${formatDate.split('at')[0]},${formatTime.split('at')[1]}`;
	};

	return (
		<div className={styles.mobileCardContainer}>
			<Card className={styles.mobileCard}>
				<p className={styles.date}>{formatDateFn(data.date_created)}</p>
				<div className={styles.statusContainer}>
					<div className={styles.status}>
						{statusComponent(data?.status)}
					</div>
				</div>
				<div className={styles.heading}>
					<h1 className={`${styles.title} flex gap-2`}>
						<Image src={Cart} alt="" />
						{data?.products || ''}
					</h1>
				</div>
				<ul className={styles.orderDetails}>
					<li className={styles.orderDetail}>
						<h1 className={`${styles.key} mb-0`}>Order ID</h1>
						<p className={`${styles.value} mb-0 ml-4 text-right`}>
							{data.order_id}
						</p>
					</li>
					<li className={styles.orderDetail}>
						<h1 className={`${styles.key} mb-0`}>Amount</h1>
						<p className={`${styles.value} mb-0`}>
							{data?.currency}{' '}
							{formatNumberToLocaleString(
								data?.transaction_amount
							)}
						</p>
					</li>
					<li className={styles.orderDetail}>
						<h1 className={`${styles.key} mb-0`}>Commission</h1>
						<p className={`${styles.value} mb-0`}>
							{data?.commission_currency} {data?.commission}
						</p>
					</li>

					<li className={styles.orderDetail}>
						<h1 className={`${styles.key} mb-0`}>Clearance Date</h1>
						<p className={`${styles.value} mb-0`}>
							{formatDateFn(data?.clearance_date)}
						</p>
					</li>
				</ul>
			</Card>
		</div>
	);
};

const Index = () => {
	const [loading, setLoading] = useState(false);
	const [requests, setRequests] = useState({data: [], total: 0});

	const {url, filters, setFilters} = useFilters(
		'v1/kreatesell/store/fetch/revenue/all'
	);
	const {
		data: response,
		error,
		isValidating,
	} = useSWR(url.href, (url) => {
		return axiosAPI.request(
			'get',
			url,
			(res) => {
				setLoading(false);
				setRequests({
					...requests,
					data: res.data.data,
					total: res.data.total_records,
				});
				return res.data;
			},
			(err) => {
				setLoading(false);
				showToast(err.message, 'error');
				return err;
			}
		);
	});

	const memoisedDataForExport = useMemo(() => {
		if (requests.data.length > 0) {
			const formattedData = requests.data.map((dat) => ({
				order_id: dat.order_id || '',
				product: dat?.product || '',
				price: dat?.price || '',
				payment_method: dat?.payment_method || '',
				date_created: dateString(dat?.date_created) || '',
				clearance_date: dateString(dat?.clearance_date) || '',
				transaction_status: dat?.transaction_status || '',
			}));
			return formattedData;
		}
		return [];
	}, [requests.data]);
	useEffect(() => {
		if (filters.show) {
			handleShowFilter(filters?.show, setFilters);
		}
	}, [filters?.show]);

	const handlePagination = (e) => {
		setFilters((prev) => ({...prev, page: e}));
	};
	return (
		<AuthLayout>
			<div className={styles.transaction__header}>
				Affiliate Transactions
			</div>
			<RevenueHeader
				{...{
					setFilters,
					loading,
					setLoading,
					filters,
					memoisedDataForExport,
					exportColumns,
					response,
				}}
			/>
			<div className={styles.dataSection}>
				<div className={styles.mobile__wrapper}>
					{requests?.data.length === 0
						? emptyComponent('No record yet')
						: requests?.data.map((request) => (
								<CardComponent
									key={request.order_id}
									data={request}
								/>
						  ))}
					{/* TODO: Add pagination for mobile */}
				</div>
				<div className={styles.table__wrapper}>
					<Table
						columns={columns}
						dataSource={requests.data}
						loading={!response && !error}
						locale={tableLocale}
						scroll={{
							x: 1000,
						}}
						pagination={{
							position: ['bottomLeft'],
							onChange: handlePagination,
							total: response?.total_records,
						}}
					/>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Index;
