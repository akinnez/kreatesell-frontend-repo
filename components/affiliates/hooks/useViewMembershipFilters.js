import {useState} from 'react';

const useViewMembershipFilters = (api) => {
	const [filters, setFilters] = useState({
		page: 1,
		limit: 10,
		text: '',
		show: '',
		currency: null,
		from: '',
		to: '',
	});

	// console.log('filters', filters);

	const url = new URL(
		`${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
	);

	if (filters.text) {
		url.searchParams.set('Text', filters.text);
	}

	if (filters.show) {
		url.searchParams.set('show', filters.show);
	}

	if (filters.currency) {
		url.searchParams.set(`currency`, filters.currency);
	}

	if (filters.from) {
		url.searchParams.set('StartDate', filters.from);
	}

	if (filters.to) {
		url.searchParams.set('EndDate', filters.to);
	}

	return {url, filters, setFilters};
};

export default useViewMembershipFilters;
