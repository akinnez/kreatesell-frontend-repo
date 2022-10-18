import axios from '../../utils/axios';
import * as types from '../types';
import {useDispatch} from 'react-redux';
import {showToast} from '../../utils';

export const SubmitPaymentOptions = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.ENABLE_PAYMENT_METHODS.REQUEST}),
		axios.request(
			`post`,
			`v1/kreatesell/payment/request/payment-option`,
			(res) => {
				dispatch({type: types.ENABLE_PAYMENT_METHODS.SUCCESS});
				showToast(res?.message || 'Generic message');
				successCallback?.(res);
			},
			(err) => {
				dispatch({
					type: types.ENABLE_PAYMENT_METHODS.FAILURE,
					payload: err?.error,
				});
				console.log('err is', err);
				showToast(err?.error?.message || 'Generic error', 'error');
				errorCallback?.();
			},
			data
		)
	);
};
