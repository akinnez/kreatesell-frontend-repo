import React, {useState} from 'react';
import Image from 'next/image';

import style from './Header.module.scss';
import {DatePicker, Select, Form, Input as AntInput, Row, Col} from 'antd';
import {Button} from '../form-input';
import {FilterIcon} from '../IconPack';
import {useRouter} from 'next/router';
import axios from 'axios';
import useSWR from 'swr';

const HelpHeader = ({department}) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [form] = Form.useForm();

	const fetcher = () =>
		axios
			.get(`${process.env.BASE_URL}admin/DepartmentList`)
			.then((res) => res?.data?.data)
			.catch((err) => {
				setErrorMessage(err.message);
			});

	const {data: departments, error} = useSWR(
		`${process.env.BASE_URL}admin/DepartmentList`,
		fetcher
	);
	const handleSearchSubmit = () => {};
	const handleSearchInput = () => {};
	const handleShowSelect = () => {};
	const handleTicket = () => {};
	const handleStartDate = () => {};
	const handleEndDate = () => {};
	const departmentOptions = [];
	const ticketList = [];
	const format = 'YYYY-MM-DD';

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
					onFinish={() =>
						handleSearchSubmit(() => setIsFiltered(true))
					}
					size="large"
					layout="vertical"
					form={form}
				>
					<Row gutter={4} align="bottom" justify="space-between">
						<Col xs={24} lg={5}>
							<Form.Item label="Search" name="search">
								<AntInput
									onChange={handleSearchInput}
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
									onChange={(e) => handleShowSelect(e)}
								/>
							</Form.Item>
						</Col>
						<Col xs={12} lg={4}>
							<Form.Item label="Tickets" name="tickets">
								<Select
									options={ticketList}
									className={style.selectRadius}
									placeholder="AllTickets"
									onChange={(e) => handleTicket(e)}
								/>
							</Form.Item>
						</Col>
						<Col xs={10} lg={3}>
							<Form.Item label="From" name="from">
								<DatePicker
									placeholder="2021-07-22"
									onChange={handleStartDate}
									format={format}
									style={{width: '100%'}}
								/>
							</Form.Item>
						</Col>
						<Col xs={10} lg={3}>
							<Form.Item label="To" name="to">
								<DatePicker
									placeholder="2021-07-22"
									onChange={handleEndDate}
									format={format}
									style={{width: '100%'}}
								/>
							</Form.Item>
						</Col>
						<Col xs={4} lg={2}>
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
				{/* {isFiltered && <ResetFilters resetFilters={()=>{
            resetFilters()
            setIsFiltered(false)  
          }} />} */}
			</div>
		</>
	);
};

export default HelpHeader;
