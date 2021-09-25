import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils";

export const StoreOnboarding = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.ONBOARDING_SETUP.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/store/onboarding`,
			(res) => {
				dispatch({ type: types.ONBOARDING_SETUP.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.ONBOARDING_SETUP.FAILURE, payload: err });
				errorCallback?.();
			},
			data
		)
	);
};

export const GetStoreDetails = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_STORE_DETAILS.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/store/me`,
			(res) => {
				dispatch({ type: types.GET_STORE_DETAILS.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_STORE_DETAILS.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const WelcomeStoreOnboarding = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.WELCOME_STORE_ONBOARDING.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/store/inherit-name`,
			(res) => {
				dispatch({
					type: types.WELCOME_STORE_ONBOARDING.SUCCESS,
					payload: res,
				});
				showToast(res?.message, "info");
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.WELCOME_STORE_ONBOARDING.FAILURE,
					payload: err,
				});
				showToast(err?.message || err?.title, "error");
				errorCallback?.();
			},
			data
		)
	);
};

export const getStore = (info) => {
	return {
		type: types.GET_STORE_DETAILS.SUCCESS,
		payload: info,
	};
};
