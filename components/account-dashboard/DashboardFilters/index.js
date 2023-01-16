import {useState, useEffect, useMemo} from 'react';
import Image from 'next/image';

import {Form, Button, DatePicker, Select, Row, Col} from 'antd';
import {MdOutlineCancel} from 'react-icons/md';
import moment from 'moment';
import {format, parseISO, subDays} from 'date-fns';

import {currencyOptions} from 'utils';
import styles from './index.module.scss';
import useCurrency from 'hooks/useCurrency';

const showOptions = [
	{value: '', label: 'Custom'},
	{value: 'Today', label: 'Today'},
	{value: 'Yesterday', label: 'Yesterday'},
	{value: 'Last 7 days', label: 'Last 7 days'},
	{value: 'Last 30 days', label: 'Last 30 days'},
	{value: 'This year', label: 'This year'},
	{value: 'All time', label: 'All time'},
];

const ResetBtn = ({resetFilters}) => (
	<div className={styles.resetFilters}>
		<Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
			Clear filters
		</Button>
	</div>
);

const DashboardFilters = ({
	data,
	setFiltered,
	setFilters,
	handleFilterSubmit,
	filters,
	getSalesStatistics,
	getAffiliateSalesStatistics,
}) => {
	const [isFiltered, setIsFiltered] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [countriesCurrencyList, setCountriesCurrencyList] = useState([]);
	const [form] = Form.useForm();

	const {countriesCurrency, loading} = useCurrency();

	useMemo(() => {
		if (!!countriesCurrency) {
			let country = countriesCurrency.map((ctr) => ({
				label: ctr.currency,
				value: ctr.currency_id,
			}));
			setCountriesCurrencyList(country);
		}
	}, [countriesCurrency]);

	const handleDatePicker = (field) => (_, dateStr) => {
		setFilters((prev) => ({
			...prev,
			[field]: dateStr ? dateStr : '',
		}));
	};

	useEffect(() => {
		if (filters.show) {
			handleShowFilter();
		}
	}, [filters.show]);

	const formatDate = (date, formatArg = 'yyyy-MM-dd') => {
		return format(date, formatArg);
	};

	const handleShowFilter = () => {
		const day = new Date();
		switch (filters.show) {
			case 'Today':
				setFilters((prev) => ({
					...prev,
					fromDate: formatDate(subDays(day, 0)),
				}));
				setFilters((prev) => ({...prev, toDate: formatDate(day)}));
				break;
			case 'Yesterday':
				setFilters((prev) => ({
					...prev,
					fromDate: formatDate(subDays(day, 1)),
				}));
				setFilters((prev) => ({
					...prev,
					toDate: formatDate(subDays(day, 1)),
				}));
				// return [formatDate(subDays(day, 1)), formatDate(day)];
				break;
			case 'Last 7 days':
				setFilters((prev) => ({
					...prev,
					fromDate: formatDate(subDays(day, 7)),
				}));
				setFilters((prev) => ({...prev, toDate: formatDate(day)}));
				break;
			case 'Last 30 days':
				setFilters((prev) => ({
					...prev,
					fromDate: formatDate(subDays(day, 30)),
				}));
				setFilters((prev) => ({...prev, toDate: formatDate(day)}));
				break;
			case 'This year':
				let year = new Date().getFullYear();
				setFilters((prev) => ({...prev, fromDate: `${year}-01-01`}));
				setFilters((prev) => ({...prev, toDate: formatDate(day)}));
				break;
			case 'All time':
				setFilters((prev) => ({...prev, fromDate: ''}));
				setFilters((prev) => ({...prev, toDate: formatDate(day)}));
				break;
			default:
				return;
		}
	};

	const resetFilters = () => {
		setFiltered(null);
		setIsFiltered(false);
		form.resetFields();
		setFilters({currency: '', fromDate: '', toDate: ''});
		getSalesStatistics();
		getAffiliateSalesStatistics();
	};

	const handleHideFilter = () => {
		setShowFilter(false);
	};

	const handleChange = (name, value, type) => {
		switch (type) {
			case 'select':
				setFilters((prev) => ({...prev, [name]: value}));
				break;
			default:
				break;
		}
	};
	const Dateformat = 'YYYY-MM-DD';
	return (
		<>
			<div className={styles.filterToggle}>
				{/* <Button shape="round" onClick={handleShowFilter}>
					Show Filters...
				</Button>
				{isFiltered && <ResetBtn resetFilters={resetFilters} />} */}
			</div>
			<div
				className={
					showFilter
						? `${styles.filtersContainer} ${styles.filtersContainerVisible}`
						: `${styles.filtersContainer}`
				}
			>
				{/* <Button
					shape="circle"
					type="text"
					icon={<MdOutlineCancel />}
					onClick={handleHideFilter}
					className={styles.closeFilter}
				/> */}
				<div className={isFiltered ? styles.mdMargin : styles.lgMargin}>
					<Form
						labelCol={{span: 24}}
						wrapperCol={{span: 24}}
						onFinish={() =>
							handleFilterSubmit(() => setIsFiltered(true))
						}
						size="large"
						form={form}
					>
						<Row
							gutter={[15, 14]}
							align="bottom"
							justify="space-between"
						>
							<Col
								// xs={{span: 24}}
								xs={{span: 11}}
								lg={{span: 5}}
								className={styles.input__wrapper}
							>
								<Form.Item label="Show" name="show">
									<Select
										options={showOptions}
										placeholder="Today"
										onChange={(e) =>
											handleChange('show', e, 'select')
										}
									/>
								</Form.Item>
							</Col>
							<Col
								// xs={{span: 24}}
								xs={{span: 12}}
								lg={{span: 5}}
								className={styles.input__wrapper}
							>
								<Form.Item label="Currency" name="currency">
									<Select
										// options={currencyOptions}
										options={countriesCurrencyList}
										placeholder="NGN"
										onChange={(e) =>
											handleChange(
												'currency',
												e,
												'select'
											)
										}
									/>
								</Form.Item>
							</Col>
							<Col
								// xs={{span: 24}}
								xs={{span: 8}}
								lg={{span: 4}}
								className={styles.input__wrapper}
							>
								<Form.Item label="From" name="fromDate">
									<DatePicker
										placeholder="2021-07-22"
										onChange={handleDatePicker('fromDate')}
										format={Dateformat}
										allowClear={false}
									/>
								</Form.Item>
							</Col>
							<Col
								// xs={{span: 24}}
								xs={{span: 8}}
								lg={{span: 4}}
								className={styles.input__wrapper}
							>
								<Form.Item label="To" name="toDate">
									<DatePicker
										placeholder="2021-07-22"
										onChange={handleDatePicker('toDate')}
										allowClear={false}
									/>
								</Form.Item>
							</Col>
							<Col
								// xs={{span: 1}}
								lg={{span: 4}}
								className={styles.filter__btn}
							>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										style={{marginLeft: '2rem'}}
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
			</div>
			{isFiltered && <ResetBtn resetFilters={resetFilters} />}
		</>
	);
};

export default DashboardFilters;
