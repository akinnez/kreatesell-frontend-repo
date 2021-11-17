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
				const data = res?.data;
				dispatch({ type: types.GET_STORE_DETAILS.SUCCESS, payload: data });
				localStorage.setItem(
					"store_details",
					JSON.stringify(data?.store_details)
				);
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

export const UpdateStoreSettings = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.STORE_SETTINGS.REQUEST }),
		axios.request(
			`patch`,
			`v1/kreatesell/store/settings`,
			(res) => {
				dispatch({
					type: types.STORE_SETTINGS.SUCCESS,
					payload: res,
				});
				showToast(res?.message, "info");
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.STORE_SETTINGS.FAILURE,
					payload: err,
				});
				showToast(err?.message || err?.title, "error");
				errorCallback?.();
			},
			data
		)
	);
};

export const UpdateCTAButton = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.UPDATE_STORE_CTA_BUTTON.REQUEST }),
		axios.request(
			`patch`,
			`v1/kreatesell/utils/cta-button`,
			(res) => {
				dispatch({
					type: types.UPDATE_STORE_CTA_BUTTON.SUCCESS,
					payload: res,
				});
				showToast(res?.message, "info");
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.UPDATE_STORE_CTA_BUTTON.FAILURE,
					payload: err,
				});
				showToast(err?.message || err?.title, "error");
				errorCallback?.();
			},
			data
		)
	);
};

// export const ListSingleStoreProduct = () => {
// 	const dispatch = useDispatch();
// 	return (storename, successCallback, errorCallback) => (
// 		dispatch({ type: types.LIST_SINGLE_STORE_PRODUCT.REQUEST }),
// 		axios.request(
// 			`get`,
// 			`v1/kreatesell/store/store-detail?store=${storename}`,
// 			(res) => {
// 				const data = res?.data;
// 				// const singleStoreProducts = data?.products;
// 				// date_updated;
// 				const singleStoreProducts = data?.products?.sort((a, b) =>
// 					a?.date_updated < b?.date_updated ? 1 : -1
// 				);

// 				delete data?.products;

// 				const payload = {
// 					singleStoreDetails: { ...data },
// 					singleStoreProducts,
// 				};

// 				dispatch({
// 					type: types.LIST_SINGLE_STORE_PRODUCT.SUCCESS,
// 					payload,
// 				});
// 				// showToast(res?.message, "info");
// 				successCallback?.();
// 			},
// 			(err) => {
// 				dispatch({
// 					type: types.LIST_SINGLE_STORE_PRODUCT.FAILURE,
// 					payload: err,
// 				});
// 				showToast(err?.message || err?.title, "error");
// 				errorCallback?.();
// 			}
// 		)
// 	);
// };

export const getStore = (info) => {
	return {
		type: types.GET_STORE_DETAILS.SUCCESS,
		payload: info,
	};
};
