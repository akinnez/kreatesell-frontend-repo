import Image from 'next/image';

import {Form, Button, DatePicker, Input, Select, Row, Col} from 'antd';
import moment from 'moment';
import {MdSearch} from 'react-icons/md';

import styles from './ViewSubscribersFilter.module.scss';

const JobType = [
	{label: 'UX Engineer', value: 'ux engineer'},
	{label: 'Frontend Designer', value: 'frontend designer'},
	{label: 'Tech Lead', value: 'tech lead'},
	{label: 'Content Writer', value: 'content writer'},
	{label: 'Product Designer', value: 'product designer'},
	{label: 'Backend Engineer', value: 'backend engineer'},
	{label: 'Cloud Engineer', value: 'cloud engineer'},
	{label: 'Digital Marketer', value: 'digital marketer'},
];
export const ViewSubscribersHeader = ({submitCb}) => {
	const [form] = Form.useForm();

	const handleSearch = (e) => {
		form.setFieldsValue({[e.target.name]: e.target.value});
	};

	const handleDropdown = (value, key) => {
		form.setFieldsValue({[key]: value});
	};

	const handleDate = (field) => (_, dateStr) => {
		form.setFieldsValue({
			[field]: dateStr ? moment(dateStr, 'YYYY-MM-DD') : '',
		});
	};

	const handleSubmitFilter = (values) => {
		console.log('values', values);
		const {search, show, currency, from, to} = values;

		if (!search && !show && !currency && !from && !to) {
			// show toast
			console.log('Input values');
			return;
		}
		submitCb((s) => ({
			...s,
			page: 1,
			productName: productName || '',
			show: show || '',
			currency: currency || '',
			from: from || '',
			to: to || '',
		}));
	};

	const resetFilters = () => {
		form.resetFields();
	};

	const handleToggle = (value) => () => {
		setShowFilter(value);
	};

	return (
		<div className={styles.dateHeader}>
			<Form
				labelCol={{span: 24}}
				wrapperCol={{span: 24}}
				onFinish={handleSubmitFilter}
				size="large"
				form={form}
				name="filter_form"
				className="membership_filter_form"
			>
				<Row gutter={20} align="bottom" justify="center">
					<Col
						xs={{span: 24}}
						lg={{span: 4}}
						className={styles.input__wrapper}
					>
						<Form.Item label="Search" name="search">
							<Input
								prefix={<MdSearch />}
								placeholder="Click here to Search"
								onChange={handleSearch}
							/>
						</Form.Item>
					</Col>
					<Col
						xs={{span: 24}}
						lg={{span: 4}}
						className={styles.input__wrapper}
					>
						<Form.Item label="Show" name="show">
							<Select
								options={JobType}
								placeholder="Today"
								onChange={(value) =>
									handleDropdown(value, 'show')
								}
							/>
						</Form.Item>
					</Col>
					<Col
						xs={{span: 24}}
						lg={{span: 4}}
						className={styles.input__wrapper}
					>
						<Form.Item label="Currency" name="currency">
							<Select
								options={JobType}
								placeholder="NGN"
								onChange={(value) =>
									handleDropdown(value, 'currency')
								}
							/>
						</Form.Item>
					</Col>
					<Col
						xs={{span: 24}}
						lg={{span: 4}}
						className={styles.input__wrapper}
					>
						<Form.Item label="From" name="from">
							<DatePicker
								placeholder="2021-07-22"
								onChange={handleDate('from')}
								allowClear={false}
								style={{width: '100%'}}
							/>
						</Form.Item>
					</Col>
					<Col
						xs={{span: 24}}
						lg={{span: 4}}
						className={styles.input__wrapper}
					>
						<Form.Item label="To" name="to">
							<DatePicker
								placeholder="2021-07-22"
								onChange={handleDate('to')}
								allowClear={false}
								style={{width: '100%'}}
							/>
						</Form.Item>
					</Col>
					<Col
						xs={{span: 24}}
						lg={{span: 3}}
						className={styles.filter__btn}
					>
						<Form.Item className={styles.formItemButton}>
							<Button
								type="primary"
								htmlType="submit"
								className={styles.button}
							>
								<Image
									src="/images/FilterIcon.png"
									alt="Filter icon"
									width={19}
									height={16}
								/>
								&nbsp; Filter
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};
