import {useState} from 'react';
import useSWR from 'swr';

import axiosApi from 'utils/axios';
import {showToast} from 'utils';

// fetcher function
const useSubscribersList = (url) => {
	// console.log('subscribers rerendered');
	const [subscribers, setSubscribers] = useState({data: [], total: 0});
	const [loading, setLoading] = useState(false);

	// const hash = [HELP_TICKETS.read];
	const {data, error, isValidating} = useSWR(url?.href, (url) => {
		return axiosApi.request(
			'get',
			url,
			(res) => {
				console.log('res is', res);
				setLoading(false);
				setSubscribers((prev) => ({
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
		subscribers,
		loading,
		setLoading,
		subscribersData: data,
		subscribersError: error,
		subscribersLoading: !data && !error,
		isValidating,
	};
};

export default useSubscribersList;
