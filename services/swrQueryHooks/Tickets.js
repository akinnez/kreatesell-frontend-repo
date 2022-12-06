import {useState} from 'react';
import useSWR from 'swr';

import {HELP_TICKETS} from '../queryKeys';
import {getHelpTickets} from '../api/HelpTickets';
import axiosApi from 'utils/axios';
import {showToast} from 'utils';

// fetcher function
const useGetHelpTickets = (url) => {
	// console.log('tickets rerendered');
	const [tickets, setTickets] = useState({data: [], total: 0});
	const [loading, setLoading] = useState(false);

	// const hash = [HELP_TICKETS.read];
	const {data, error, isValidating} = useSWR(url?.href, (url) => {
		return axiosApi.request(
			'get',
			url,
			(res) => {
				setLoading(false);
				setTickets((prev) => ({
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
		// getHelpTickets(query)
	});

	return {
		tickets,
		loading,
		setLoading,
		helpTicketData: data,
		helpTicketError: error,
		isHelpTicketLoading: !data && !error,
		isValidating,
	};
};

export default useGetHelpTickets;
