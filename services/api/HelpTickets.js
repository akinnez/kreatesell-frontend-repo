import axios from 'utils/axios';

const url = `${process.env.BASE_URL}auth/KreatorTickets`;
export const getHelpTickets = (query = '') => {
	return axios.request(
		'get',
		url + `${query}`,
		(res) => {
			return res.data.data;
		},
		(err) => {
			return err;
		}
	);
};
