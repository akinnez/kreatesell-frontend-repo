import useSWR from 'swr';

import axiosApi from 'utils/axios';
import {showToast} from 'utils';
import {useState} from 'react';

// fetcher function
/**
 *
 * @param {*} url
 * @description this swr hook is used for both kreator and affiliates recent
 * analytics
 */
const useGetRevenue = (url, shouldFetch) => {
	const [loading, setLoading] = useState(false);
	const {data, error, isValidating, isLoading} = useSWR(
		shouldFetch ? url?.href : null,
		(url) => {
			return axiosApi.request(
				'get',
				url,
				(res) => {
					// calculate compounded value
					let revenue;
					revenue = res.data.total_revenue.reduce(
						(accumulator, currentValue) =>
							accumulator + Number(currentValue.total_revenue),
						0
					);

					res.data.revenue = revenue;
					return res;
				},
				(err) => {
					showToast(err.message, 'error');
					return err;
				}
			);
		}
	);

	return {
		revenueData: data,
		revenueError: error,
		revenueLoading: !data && !error,
		isValidating,
	};
};

export default useGetRevenue;
