import React, {useState, useEffect, useMemo} from 'react';
import Image from 'next/image';

import useSWR from 'swr';
import {Table, Tooltip, Popover} from 'antd';

import styles from '../../../../public/css/AllTransactions.module.scss';
import TransactionHeader from 'components/TransactionComponents/header';

import AuthLayout from 'components/authlayout';
import useFilters from 'components/TransactionComponents/useFilters';
import axiosAPI from 'utils/axios';
import {dateString} from 'utils/dateFormat';
import {emptyComponent} from 'components';
import {EyesClosed, handleShowFilter, formatDate} from 'utils';

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
	};
	let tagStyles = statusTextList[item].styles;
	let tooltipContent = statusTextList[item].contents;
	let mainType = statusTextList[item].type;
	return (
		<>
			{tooltipContent ? (
				<Tooltip
					overlayInnerStyle={{fontSize: '10px', textAlign: 'center'}}
					overlayStyle={{
						width: '150px',
						borderRadius: '10px',
						padding: '20px 8px',
					}}
					className="text-xs"
					placement="top"
					title={tooltipContent}
				>
					<div className={styles.tags} style={tagStyles}>
						{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
					</div>
				</Tooltip>
			) : (
				<>
					<div className={styles.tags} style={tagStyles}>
						{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
					</div>
				</>
			)}
		</>
	);
};

const ActionComponent = (
	_,
	{order_id, customer_full_name, customer_email_address}
) => {
	const title = (
		<h1 className={styles.mainHeader}>Customer&apos;s Details</h1>
	);
	const content = (
		<>
			<div className={`${styles.ActionComponentSection}`}>
				<div className={`${styles.title} `}>Reference ID</div>
				<div className={`${styles.subtitle} `}>{order_id}</div>
			</div>
			<div className={`${styles.ActionComponentSection}`}>
				<div className={`${styles.title} `}>Customer Name</div>
				<div className={`${styles.subtitle} `}>
					{customer_full_name}
				</div>
			</div>
			<div className={`${styles.ActionComponentSection}`}>
				<div className={`${styles.title} `}>Email Address</div>
				<div className={`${styles.subtitle} `}>
					{customer_email_address}
				</div>
			</div>
		</>
	);
	return (
		<Popover
			trigger="click"
			placement="bottomRight"
			title={title}
			content={content}
			// overlayStyle={{border: '1px solid red'}}
			overlayInnerStyle={{
				padding: '2rem 1rem',
			}}
		>
			<Image className={styles.icon} src={EyesClosed} alt="" />
		</Popover>
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
		dataIndex: 'product',
		width: 200,
	},
	{
		title: 'Price',
		render: (_, data) => {
			return <span>{`${data?.currency} ${data?.price}`}</span>;
		},
		width: 150,
	},
	{
		title: 'Payment Method',
		dataIndex: 'payment_method',
		width: 100,
	},
	{
		title: 'Date',
		dataIndex: 'date_created',
		render: (dateStr) => dateString(dateStr),
		width: 120,
	},
	{
		title: 'Clearance Date',
		dataIndex: '',
		width: 120,
	},
	{
		title: 'Transaction Status',
		dataIndex: 'transaction_status',
		render: (item) => statusComponent(item),
		width: 150,
	},
	{
		title: 'See Customers Details',
		dataIndex: '',
		width: 120,
		render: (item, all) => ActionComponent(item, all),
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

const Index = () => {
	const [loading, setLoading] = useState(false);
	const [requests, setRequests] = useState({data: [], total: 0});

	const {url, filters, setFilters} = useFilters(
		'v1/kreatesell/store/fetch/transactions/all'
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
				return res;
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
			<TransactionHeader
				{...{
					setFilters,
					loading,
					setLoading,
					filters,
					memoisedDataForExport,
					exportColumns,
				}}
			/>
			<div className={styles.dataSection}>
				<div className={styles.table__wrapper}>
					<Table
						columns={columns}
						dataSource={requests.data}
						loading={!response && !error}
						locale={tableLocale}
					/>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Index;