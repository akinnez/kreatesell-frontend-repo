import axios from 'utils/axios';

// const url = `${process.env.BASE_URL}auth/KreatorTickets`;
export const getSubscribersList = (query = '') => {
	return axios.request(
		'get',
		query,
		(res) => {
			return res.data.data;
		},
		(err) => {
			return err;
		}
	);
};
