import axios from '../../utils/axios';
import * as types from '../types';
import {useDispatch} from 'react-redux';
import {showToast} from 'utils';

export const MakePlanUpgrade = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.MAKE_PLAN_UPGRADE.REQUEST}),
		axios.request(
			`post`,
			`/api/v1/kreatesell/payment/checkout`,
			(res) => {
				dispatch({type: types.MAKE_PLAN_UPGRADE.SUCCESS, payload: res});
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({type: types.MAKE_PLAN_UPGRADE.FAILURE, payload: err});
				showToast(
					err.message
						? err.message
						: 'Network Error, Check your Connection',
					'error'
				);
				errorCallback?.();
			},
			data
		)
	);
};

export const PaymentUnsubscribe = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.UNSUBSCRIBE_FROM_PLAN.REQUEST}),
		axios.request(
			`post`,
			`/v1/kreatesell/payment/unsubscribe`,
			(res) => {
				console.log('res is', res);
				dispatch({type: types.UNSUBSCRIBE_FROM_PLAN.SUCCESS});
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.UNSUBSCRIBE_FROM_PLAN.FAILURE,
					payload: err,
				});
				showToast(
					err.message
						? err.message
						: 'Network Error, Check your Connection',
					'error'
				);
				errorCallback?.();
			}
		)
	);
};
