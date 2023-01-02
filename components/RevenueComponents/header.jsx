import React, {useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';

import {DatePicker, Select, Form, Input, Row, Col} from 'antd';
import moment from 'moment';

import {Button} from '../form-input';
import StatusButtons from './statusButtons';
import styles from './header.module.scss';
import SyncDataToCSV from 'components/DataToCSV/SyncDataToCSV';
import {StatsCard} from 'components/RevenueComponents/StatsCard';

const TransactionHeader = ({
	setFilters,
	loading,
	setLoading,
	filters,
	memoisedDataForExport,
	exportColumns,
	response,
}) => {
	const [isFiltered, setIsFiltered] = useState(false);

	const [form] = Form.useForm();

	const handleSearchInput = (field) => (e) => {
		form.setFieldsValue({[field]: e.target.value});
	};

	const handleOptions = (field) => (value) => {
		form.setFieldsValue({[field]: value});
	};

	const handleDate = (field) => (_, dateStr) => {
		form.setFieldsValue({
			[field]: dateStr ? moment(dateStr, 'YYYY-MM-DD') : '',
		});
	};

	const dateOptions = [
		{value: '', label: 'Custom'},
		{value: 'Today', label: 'Today'},
		{value: 'Yesterday', label: 'Yesterday'},
		{value: 'Last 7 days', label: 'Last 7 days'},
		{value: 'Last 30 days', label: 'Last 30 days'},
		{value: 'This year', label: 'This year'},
		{value: 'All time', label: 'All time'},
	];
	const ticketList = [];
	const format = 'YYYY-MM-DD';

	const handleSearchSubmit = (values) => {
		const {search, show, currency, from, to} = values;
		if (!search && !show && !currency && !from && !to) {
			return;
		}
		setIsFiltered(true);
		setLoading(true);
		setFilters((s) => ({
			...s,
			page: 1,
			search: search || '',
			show: show || null,
			currency: currency || null,
			from: from ? from._i : '',
			to: to ? to._i : '',
		}));
	};
	return (
		<>
			<Head>
				<title>KreateSell | Transactions</title>
			</Head>
			<div className={styles.container}>
				<div>
					<Form
						onFinish={(val) => handleSearchSubmit(val)}
						size="large"
						layout="vertical"
						form={form}
					>
						<Row gutter={4} align="bottom" justify="space-between">
							<Col xs={24} lg={5}>
								<Form.Item label="Search" name="search">
									<Input
										onChange={handleSearchInput('search')}
										placeholder="Click here to Search"
									/>
								</Form.Item>
							</Col>
							<Col xs={12} lg={4}>
								<Form.Item label="Show" name="show">
									<Select
										options={dateOptions}
										className={styles.selectRadius}
										placeholder="Today"
										onChange={handleOptions('show')}
									/>
								</Form.Item>
							</Col>
							<Col xs={12} lg={4}>
								<Form.Item label="Currency" name="currency">
									<Select
										options={ticketList}
										className={styles.selectRadius}
										placeholder="NGN"
										onChange={handleOptions('currency')}
									/>
								</Form.Item>
							</Col>
							<Col xs={10} lg={3} md={10}>
								<Form.Item label="From" name="from">
									<DatePicker
										placeholder="2021-07-22"
										onChange={handleDate('from')}
										format={format}
										styles={{width: '100%'}}
									/>
								</Form.Item>
							</Col>
							<Col xs={10} lg={3} md={10}>
								<Form.Item label="To" name="to">
									<DatePicker
										placeholder="2021-07-22"
										onChange={handleDate('to')}
										format={format}
										styles={{width: '100%'}}
									/>
								</Form.Item>
							</Col>
							<Col xs={12} lg={3} sm={4} md={4}>
								<Form.Item>
									<Button
										type="primary"
										styles={{
											borderRadius: '8px',
											visibility: 'visible',
										}}
										htmlType="submit"
										label={
											<>
												<Image
													src="/images/FilterIcon.png"
													alt="Filter icon"
													width={19}
													height={16}
												/>
												&nbsp; Filter
											</>
										}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
					{/* {isFiltered && <ResetFilters resetFilters={()=>{
            resetFilters()
            setIsFiltered(false)  
          }} />} */}
				</div>
				<StatsCard
					totalRevenue={response?.total_revenue}
					totalWithdrawn={response?.total_withdraw}
					totalPending={response?.total_pending}
					availableToWithdraw={response?.available_to_withdraw}
				/>
				<StatusButtons {...{setFilters, filters, setLoading}} />
				<div
					className={`${styles.export} flex justify-between mt-5 mb-3`}
				>
					<h1 className="mb-0">Details</h1>
					<SyncDataToCSV
						data={[] || memoisedDataForExport}
						headers={exportColumns || []}
						filename="reports"
					/>
				</div>
			</div>
		</>
	);
};

export default TransactionHeader;
