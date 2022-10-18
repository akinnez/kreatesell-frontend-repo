import {useState} from 'react';

const useViewMembershipFilters = (api) => {
	const [filters, setFilters] = useState({
		page: 1,
		limit: 10,
		productName: '',
		show: '',
		currency: null,
		from: '',
		to: '',
	});

	const url = new URL(
		`${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
	);

	if (filters.productName) {
		url.searchParams.set('Product_Name', filters.productName);
	}

	if (filters.show) {
		url.searchParams.set('show', filters.show);
	}

	if (filters.currency) {
		url.searchParams.set(`currency`, filters.currency);
	}

	if (filters.from) {
		url.searchParams.set('from', filters.from);
	}

	if (filters.to) {
		url.searchParams.set('to', filters.to);
	}

	return {url, filters, setFilters};
};

export default useViewMembershipFilters;
