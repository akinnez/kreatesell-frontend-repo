import React, {useState, useEffect, useMemo} from 'react';

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

const statusComponent = (item) => {
	const statusTextList = {
		Successful: {
			type: 'successful',
			styles: {
				background: '#F1FCF8',
				borderRadius: '.5rem',
				color: ' #2DC071',
				fontSize: '1rem',
			},
			contents: '',
		},
		Pending: {
			type: 'pending',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '1rem',
			},
			contents: '',
		},
		Initiated: {
			type: 'initiated',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '1rem',
			},
			contents: '',
		},
		Cleared: {
			type: 'cleared',
			styles: {
				background: '#F1FCF8',
				borderRadius: '.5rem',
				color: ' #2DC071',
				fontSize: '1rem',
			},
			contents: '',
		},
		Failed: {
			type: 'failed',
			styles: {
				background: 'rgba(255, 77, 79, 0.1)',
				borderRadius: '.5rem',
				color: '#F90005',
				fontSize: '1rem',
			},
			contents: '',
		},
		ChargeBack: {
			type: 'chargeBack',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '1rem',
			},
			contents: '',
		},
		Refunded: {
			type: 'refunded',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '1rem',
			},
			contents: '',
		},
		Reversed: {
			type: 'reversed',
			styles: {
				background: 'rgba(0, 0, 0, 0.05)',
				borderRadius: '.5rem',
				color: ' #FBB500',
				fontSize: '1rem',
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
	return (
		<div className={styles.mobileCardContainer}>
			<Card className={styles.mobileCard}>
				<p className={styles.date}>{dateString(data.date_created)}</p>
				<div className={styles.statusContainer}>
					<div className={styles.status}>
						{statusComponent(data?.status)}
					</div>
				</div>
				<div className={styles.heading}>
					{/* <Image /> */}
					<h1 className={styles.title}>
						{data?.products || 'UI Design Introduction'}
					</h1>
				</div>
				<ul className={styles.orderDetails}>
					<li className={styles.orderDetail}>
						<h1 className={`${styles.key} mb-0`}>Order ID</h1>
						<p className={`${styles.value} mb-0 ml-4`}>
							{data.order_id}
						</p>
					</li>
					<li className={styles.orderDetail}>
						<h1 className={`${styles.key} mb-0`}>
							Customer Name
						</h1>
						<p className={`${styles.value} mb-0`}>
							{data?.customer_full_name}
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
	return (
		<AuthLayout>
			<div className={styles.transaction__header}>Revenue</div>
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
					/>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Index;
