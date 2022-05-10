import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { showToast } from "utils";

export const CreateCoupon = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.CREATE_COUPON.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/coupon/create-edit-coupon`,
			(res) => {
                console.log('the copon res', res)
				dispatch({ type: types.CREATE_COUPON.SUCCESS, payload: res });
				showToast(res?.message, "info");
				successCallback?.();
			},
			(err) => {
                console.log('the err', err)
				dispatch({ type: types.CREATE_COUPON.FAILURE, payload: err });
				showToast(err.message? err.message: "Network Error, Check your Connection", "error");
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
		product_Name = "",
		StartDate,
		endDate,
		successCallback,
		errorCallback
	) => {
		dispatch({ type: types.GET_ALL_COUPONS.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/coupon/fetch/all?page=${page}
			${product_Name ? `&product_name=${product_Name}` : ""}
			${StartDate ? `&StartDate=${StartDate}` : ""}
			${endDate ? `&endDate=${endDate}` : ""}
			`,
			(res) => {
                console.log(res)
				// const products = res?.data?.data;
				// const data = res?.data;
				// delete data?.data;
				// const payload = {
				// 	products,
				// 	productPagination: { ...data },
				// };
				// dispatch({ type: types.GET_ALL_COUPONS.SUCCESS, payload });
				// successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_ALL_COUPONS.FAILURE, payload: err });
				showToast(err?.message, "error");
				errorCallback?.();
			}
	
	);
	}
};