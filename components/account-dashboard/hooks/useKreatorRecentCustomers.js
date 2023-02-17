import {useState} from 'react';

const useViewMembershipFilters = (api) => {
	const [filters, setFilters] = useState({
		page: 1,
		limit: 10,
		Product_Name: '',
		show: '',
		Currency: null,
		Start_Date: '',
		End_Date: '',
	});

	const url = new URL(
		`${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
	);

	if (filters.Product_Name) {
		url.searchParams.set('Product_Name', filters.Product_Name);
	}

	if (filters.show) {
		url.searchParams.set('show', filters.show);
	}

	if (filters.Currency) {
		url.searchParams.set(`Currency`, filters.Currency);
	}

	if (filters.Start_Date) {
		url.searchParams.set('Start_Date', filters.Start_Date);
	}

	if (filters.End_Date) {
		url.searchParams.set('End_Date', filters.End_Date);
	}

	return {url, filters, setFilters};
};

export default useViewMembershipFilters;
