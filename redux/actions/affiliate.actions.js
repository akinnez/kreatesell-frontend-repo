import axios from '../../utils/axios';
import * as types from '../types';
import {useDispatch} from 'react-redux';
import {showToast} from '../../utils';

export const SuccessfulAffiliateSales = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.AFFILIATE.REQUEST}),
		axios.request(
			`post`,
			`affiliate/verify/affiliate/approve`,
			(res) => {
				dispatch({
					type: types.AFFILIATE.SUCCESS,
					payload: res,
				});
				res?.message && showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.AFFILIATE.FAILURE,
					payload: err,
				});
				showToast(err?.message || err?.title, 'error');
				errorCallback?.();
			}
		)
	);
};
