import axios from '../../utils/axios';
import * as types from '../types';
import {useDispatch} from 'react-redux';
import {showToast} from 'utils';

export const CreateCoupon = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.CREATE_COUPON.REQUEST}),
		axios.request(
			`post`,
			`v1/kreatesell/coupon/create-edit-coupon`,
			(res) => {
				console.log('the copon res', res);
				dispatch({type: types.CREATE_COUPON.SUCCESS, payload: res});
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				console.log('the err', err);
				dispatch({type: types.CREATE_COUPON.FAILURE, payload: err});
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

export const GetCoupons = () => {
	const dispatch = useDispatch();
	return (
		page = 1,
		coupon_Code = '',
		StartDate,
		endDate,
		currencyFilter,
		successCallback,
		errorCallback
	) => {
		dispatch({type: types.GET_ALL_COUPONS.REQUEST}),
			axios.request(
				`get`,
				`v1/kreatesell/coupon/fetch/all?page=${page}
			${coupon_Code ? `&coupon_Code=${coupon_Code}` : ''}
			${StartDate ? `&StartDate=${StartDate}` : ''}
			${endDate ? `&endDate=${endDate}` : ''}
			${currencyFilter ? `&Currency_Id=${currencyFilter}` : ''} 
			`,
				(res) => {
					const coupons = res?.data?.data;
					const data = res?.data;
					const payload = {
						coupons,
						couponPagination: {...data},
					};
					dispatch({type: types.GET_ALL_COUPONS.SUCCESS, payload});
					successCallback?.();
				},
				(err) => {
					dispatch({
						type: types.GET_ALL_COUPONS.FAILURE,
						payload: err,
					});
					showToast(err?.message, 'error');
					errorCallback?.();
				}
			);
	};
};

export const ApplyCoupon = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.APPLY_COUPON.REQUEST}),
		axios.request(
			`post`,
			`v1/kreatesell/payment/apply-coupon`,
			(res) => {
				dispatch({type: types.APPLY_COUPON.SUCCESS, payload: res});
				showToast('Coupon successfully added');
				successCallback?.(res);
			},
			(err) => {
				console.log('the err', err);
				dispatch({type: types.APPLY_COUPON.FAILURE, payload: err});
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
