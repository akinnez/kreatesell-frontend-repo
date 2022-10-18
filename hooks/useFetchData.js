import {useState, useEffect} from 'react';
import axiosAPI from 'utils/axios';

const useFetchData = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (url) {
			axiosAPI.request(
				'get',
				url,
				(res) => {
					setData(res.data);
				},
				(err) => {
					setError(err.message);
				}
			);
		}
	}, [url]);

	return {data, setData, error};
};

export default useFetchData;
