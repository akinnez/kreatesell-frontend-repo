import {useState} from 'react';

const useFilters = (api) => {
	const [filters, setFilters] = useState({
		page: 1,
		limit: 10,
		search: '',
		show: '',
		currency: null,
		from: null,
		to: '',
		status: 'All',
	});

	const url = new URL(
		`${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
	);

	// we are not sending this
	// if (filters.show) {
	// 	url.searchParams.set('AffiliateName', filters.show);
	// }

	if (filters.currency) {
		url.searchParams.set('Currency', filters.currency);
	}

	if (filters.from) {
		url.searchParams.set('Start_Date', filters.from);
	}

	if (filters.to) {
		url.searchParams.set('End_Date', filters.to);
	}

	// these need to be added to what is expected in the endpoint
	if (filters.search) {
		url.searchParams.set('Product_Name', filters.search);
	}
	if (filters.status !== 'All') {
		url.searchParams.set('Status', filters.status);
	}

	return {url, filters, setFilters};
};

export default useFilters;
