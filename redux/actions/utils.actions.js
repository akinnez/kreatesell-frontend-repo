import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils";

export const GetCountries = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_COUNTRIES.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/utils/get-countries`,
			(res) => {
				dispatch({
					type: types.GET_COUNTRIES.SUCCESS,
					payload: res?.data?.list_of_countries,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_COUNTRIES.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const GuestSubscription = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.GUEST_SUBSCRIPTION.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/utils/subscribe`,
			(res) => {
				dispatch({
					type: types.GUEST_SUBSCRIPTION.SUCCESS,
					payload: res?.data,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GUEST_SUBSCRIPTION.FAILURE, payload: err });
				showToast(err?.message, "error");
				errorCallback?.();
			},
			data
		)
	);
};
