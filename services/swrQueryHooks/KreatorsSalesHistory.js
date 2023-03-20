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
const useGetKreatorSalesHistory = (url) => {
	const {data, error, isValidating, isLoading} = useSWR(url, (url) => {
		return axiosApi.request(
			'get',
			url,
			(res) => {
				return res.data;
			},
			(err) => {
				showToast(err.message, 'error');
				return err;
			}
		);
	});

	return {
		kreatorSalesHistoryData: data,
		kreatorSalesHistoryError: error,
		kreatorSalesHistoryLoading: isLoading,
		isValidating,
	};
};

export default useGetKreatorSalesHistory;
