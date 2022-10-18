import {useState} from 'react';
import {Input, Select} from 'antd';
import styles from './index.module.scss';

const PaginationSizeChanger = ({dataSize, filters, setFilters}) => {
	const [input, setInput] = useState('');

	const handleSelect = (value) => {
		const totalPages = Math.ceil(dataSize / value);
		setFilters({
			...filters,
			limit: value,
			page: filters.page > totalPages ? totalPages : filters.page,
		});
	};

	const totalPages = Math.ceil(dataSize / filters.limit);
	const handleInput = () => {
		if (!input || input === '0') return;

		const page = +input > totalPages ? totalPages : +input;
		setFilters({...filters, page});
		setInput('');
	};

	const handleInputChange = (e) => {
		const {value} = e.target;

		if (/[^\d]$/.test(value)) {
			const newValue = value.replace(/[^\d]$/, '');
			setInput(newValue);
			return;
		}

		setInput(value);
	};

	return (
		<div className={styles['pagination-size-changer__container']}>
			<div className={styles['pagination-size-changer__select-box']}>
				<span>Results Per Page</span>
				&nbsp;&nbsp;
				<Select defaultValue={filters.limit} onChange={handleSelect}>
					<Select.Option value={10}>10</Select.Option>
					<Select.Option value={25}>25</Select.Option>
					<Select.Option value={50}>50</Select.Option>
					<Select.Option value={100}>100</Select.Option>
				</Select>
			</div>
			{/* {Math.ceil(dataSize / filters.limit) > 1 ? ( */}
			{filters.limit < dataSize && (
				<div className={styles['pagination-size-changer__input-box']}>
					<span>Go to</span>
					<Input
						value={input}
						onChange={handleInputChange}
						onPressEnter={handleInput}
					/>
				</div>
			)}
		</div>
	);
};

export default PaginationSizeChanger;
