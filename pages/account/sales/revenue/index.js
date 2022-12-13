import React, {useState, useEffect, useMemo} from 'react';

import useSWR from 'swr';
import {Table} from 'antd';

import styles from '../../../../public/css/AllRevenue.module.scss';
import RevenueHeader from 'components/RevenueComponents/header';
import AuthLayout from 'components/authlayout';
import useFilters from 'components/TransactionComponents/useFilters';
import axiosAPI from 'utils/axios';
import {dateString} from 'utils/dateFormat';
import {emptyComponent} from 'components';

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
		title: 'Commission',
		dataIndex: 'commission',
		width: 100,
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

			<Table
				columns={columns}
				dataSource={requests.data}
				loading={!response && !error}
				locale={tableLocale}
				scroll={{
					x: 1000,
				}}
			/>
		</AuthLayout>
	);
};

export default Index;
