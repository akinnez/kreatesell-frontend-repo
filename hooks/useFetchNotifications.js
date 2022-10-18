import useSWR from 'swr';
import {useDispatch} from 'react-redux';
import axiosAPI from 'utils/axios';
import {
	getNotifications,
	notificationsFailure,
	requestNotifications,
} from 'redux/actions';

const useFetchNotifications = () => {
	const dispatch = useDispatch();

	useSWR(`${process.env.BASE_URL}notification/get-notifications`, (url) => {
		dispatch(requestNotifications());

		axiosAPI.request(
			'get',
			url,
			(res) => {
				dispatch(getNotifications(res.data.result));
			},
			() => {
				dispatch(
					notificationsFailure('Error getting your notifications')
				);
			}
		);
	});
};

export default useFetchNotifications;
