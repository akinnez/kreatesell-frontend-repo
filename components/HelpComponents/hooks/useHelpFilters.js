import {useState} from 'react';

const useAffiliateFilters = (api) => {
	// console.log('filters rerender');
	const [filters, setFilters] = useState({
		page: 1,
		limit: 10,
		search: '',
		department: '',
		ticket: '',
		from: '',
		to: '',
	});

	const url = new URL(
		`${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
	);

	if (filters.search) {
		url.searchParams.set('search', filters.search);
	}

	if (filters.department) {
		url.searchParams.set('department', filters.department);
	}

	if (filters.ticket) {
		url.searchParams.set('ticket', filters.ticket);
	}

	if (filters.from) {
		url.searchParams.set('from', filters.from);
	}

	if (filters.to) {
		url.searchParams.set('to', filters.to);
	}

	return {url, filters, setFilters};
};

export default useAffiliateFilters;
