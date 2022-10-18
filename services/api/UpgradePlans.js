import {GET_PLAN_PRICE_LIST} from '../apiUrl';
import axios from 'utils/axios';

export const getUpgradePlanPrices = () => {
	return axios.request(
		'get',
		GET_PLAN_PRICE_LIST,
		(res) => {
			return res.data;
		},
		(err) => {
			return err;
		}
	);
};
