import {useState} from 'react';

const useRevenueFilter = (api) => {
	const [filters, setFilters] = useState({
		startDate: '2000-01-01',
	});

	const url = new URL(`${process.env.BASE_URL}${api}`);
	if (filters.startDate) {
		url.searchParams.set('startDate', filters.startDate);
	}
	return {url, filters, setFilters};
};

export default useRevenueFilter;
