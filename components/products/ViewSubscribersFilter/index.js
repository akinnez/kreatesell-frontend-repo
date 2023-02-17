import {useMemo, useState, useEffect} from 'react';
import Image from 'next/image';

import {Form, Button, DatePicker, Input, Select, Row, Col} from 'antd';
import moment from 'moment';
import {MdSearch, MdOutlineCancel} from 'react-icons/md';

import styles from './ViewSubscribersFilter.module.scss';
import {showOptions} from 'utils';
import useCurrency from 'hooks/useCurrency';

const ResetBtn = ({resetFilters}) => (
	<div className={styles.resetFilters}>
		<Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
			Clear filters
		</Button>
	</div>
);

export const ViewSubscribersHeader = ({submitCb}) => {
	const [isFiltered, setIsFiltered] = useState(false);
	const [countriesCurrencyList, setCountriesCurrencyList] = useState([]);
	const [form] = Form.useForm();

	const handleSearch = (e) => {
		form.setFieldsValue({[e.target.name]: e.target.value});
	};

	const {countriesCurrency} = useCurrency();

	useMemo(() => {
		if (!!countriesCurrency) {
			let country = countriesCurrency.map((ctr) => ({
				label: ctr.currency,
				value: ctr.currency_id,
			}));
			setCountriesCurrencyList(country);
		}
	}, [countriesCurrency]);

	const handleDropdown = (value, key) => {
		form.setFieldsValue({[key]: value});
	};

	const handleDate = (field) => (_, dateStr) => {
		form.setFieldsValue({
			[field]: dateStr ? moment(dateStr, 'YYYY-MM-DD') : '',
		});
	};

	const handleSubmitFilter = (values) => {
		const {text, show, currency, from, to} = values;

		if (!text && !show && !currency && !from && !to) {
			// show toast
			// console.log('Input values');
			return;
		}
		setIsFiltered(true);
		submitCb((s) => ({
			...s,
			page: 1,
			text: text || '',
			show: show || '',
			currency: currency || '',
			from: from || '',
			to: to || '',
		}));
	};

	const resetFilters = () => {
		setIsFiltered(false);
		form.resetFields();
		submitCb({
			page: 1,
			limit: 10,
			text: '',
			show: '',
			currency: null,
			from: '',
			to: '',
		});
	};

	// const handleToggle = (value) => () => {
	// 	setShowFilter(value);
	// };

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
						<Form.Item label="Search" name="text">
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
								options={showOptions}
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
								options={countriesCurrencyList}
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
			<div style={{marginInline: '25px', marginBlockStart: '10px'}}>
				{isFiltered && <ResetBtn resetFilters={resetFilters} />}
			</div>
		</div>
	);
};
