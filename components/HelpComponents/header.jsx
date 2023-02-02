import React, {useState} from 'react';
import Image from 'next/image';

import moment from 'moment';

import style from './Header.module.scss';
import {DatePicker, Select, Form, Input as AntInput, Row, Col} from 'antd';
import {Button} from '../form-input';
import {FilterIcon} from '../IconPack';
import {useRouter} from 'next/router';
import ResetFilters from 'components/ResetFilters';
import axios from 'axios';
import useSWR from 'swr';

const HelpHeader = ({setFilters, setLoading, filters}) => {
	const router = useRouter();
	const [form] = Form.useForm();
	const [isFiltered, setIsFiltered] = useState(false);

	const handleInputChange = (name, value, type) => {
		switch (type) {
			case 'date':
				form.setFieldsValue({
					[name]: value ? moment(value, 'YYYY-MM-DD') : '',
				});
				break;
			case 'input':
				form.setFieldsValue({[name]: value});
				break;
			case 'select':
				form.setFieldsValue({[name]: value});
				break;
			default:
				break;
		}
	};

	const handleSearchSubmit = (values) => {
		const {search, department, ticket, from, to} = values;
		if (!search && !department && !ticket && !from && !to) {
			return;
		}
		console.log('values', values);
		setIsFiltered(true);
		setLoading(true);
		setFilters((s) => ({
			...s,
			page: 1,
			search: search || '',
			department: department || '',
			ticket: ticket || '',
			from: from || null,
			to: to || '',
		}));
	};
	const departmentOptions = [
		{value: 'value', label: 'label'},
		{
			value: 'Technical',
			label: 'Technical',
		},
		{
			value: 'Affiliates',
			label: 'Affiliates',
		},
		{
			value: 'Billing',
			label: 'Billing',
		},
		{
			value: 'General',
			label: 'General',
		},
	];
	const ticketList = [
		{value: '', label: 'All'},
		{value: 'open', label: 'Open'},
		{value: 'closed', label: 'Closed'},
	];
	const format = 'YYYY-MM-DD';

	const resetFilters = () => {
		setFilters((prev) => ({
			...prev,
			search: '',
			department: '',
			ticket: '',
			from: '',
			to: '',
		}));
		setIsFiltered(false);
		form.resetFields();
	};

	return (
		<>
			<div className={style.header_container}>
				<h3>Report an Issue</h3>
				<Button
					onClick={() =>
						router.push(`/account/kreator/help/open-ticket`)
					}
					type="primary"
					style={{width: '120px'}}
					label="Open Ticket"
				/>
			</div>

			<div>
				<Form
					onFinish={handleSearchSubmit}
					size="large"
					layout="vertical"
					form={form}
				>
					<Row gutter={4} align="bottom" justify="space-between">
						<Col xs={24} lg={5}>
							<Form.Item label="Search" name="search">
								<AntInput
									onChange={(e) =>
										handleInputChange(
											'search',
											e.currentTarget.value,
											'input'
										)
									}
									placeholder="Click here to Search"
								/>
							</Form.Item>
						</Col>
						<Col xs={12} lg={4}>
							<Form.Item label="Department" name="department">
								<Select
									options={departmentOptions}
									className={style.selectRadius}
									placeholder="Billing"
									onChange={(e) =>
										handleInputChange(
											'department',
											e,
											'select'
										)
									}
								/>
							</Form.Item>
						</Col>
						<Col xs={12} lg={4}>
							<Form.Item label="Tickets" name="tickets">
								<Select
									options={ticketList}
									className={style.selectRadius}
									placeholder="AllTickets"
									onChange={(e) =>
										handleInputChange(
											'tickets',
											e,
											'select'
										)
									}
								/>
							</Form.Item>
						</Col>
						<Col xs={10} lg={3} md={6}>
							<Form.Item label="From" name="from">
								<DatePicker
									placeholder="2021-07-22"
									onChange={(_, date) =>
										handleInputChange('from', date, 'date')
									}
									format={format}
									style={{width: '100%'}}
								/>
							</Form.Item>
						</Col>
						<Col xs={13} lg={3} md={6}>
							<Form.Item label="To" name="to">
								<DatePicker
									placeholder="2021-07-22"
									onChange={(_, date) =>
										handleInputChange('to', date, 'date')
									}
									format={format}
									style={{width: '100%'}}
								/>
							</Form.Item>
						</Col>
						<Col xs={10} lg={3} sm={4} md={6}>
							<Form.Item>
								<Button
									type="primary"
									style={{
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
				{isFiltered && (
					<ResetFilters
						resetFilters={() => {
							resetFilters();
						}}
					/>
				)}
			</div>
		</>
	);
};

export default HelpHeader;
