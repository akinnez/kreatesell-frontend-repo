import {useState} from 'react';
import useSWR from 'swr';

import axiosApi from 'utils/axios';
import {showToast} from 'utils';

// fetcher function
/**
 *
 * @param {*} url
 * @description this swr hook is used for both kreator and affiliates recent
 * analytics
 */
const useKreatorRecentCustomers = (url) => {
	const [recentKreatorCustomers, setRecentKreatorCustomers] = useState({
		data: [],
		total: 0,
	});
	const [loading, setLoading] = useState(false);

	const {data, error, isValidating, isLoading} = useSWR(url?.href, (url) => {
		return axiosApi.request(
			'get',
			url,
			(res) => {
				// console.log('res is', res);
				setLoading(false);
				setRecentKreatorCustomers((prev) => ({
					...prev,
					data: res.data.data,
					total: res.data.totalRecords,
				}));
				return res;
			},
			(err) => {
				setLoading(false);
				showToast(err.message, 'error');
				return err;
			}
		);
	});

	return {
		recentKreatorCustomers,
		loading,
		setLoading,
		recentKreatorsData: data,
		recentKreatorsError: error,
		recentKreatorsLoading: isLoading,
		isValidating,
	};
};

export default useKreatorRecentCustomers;
