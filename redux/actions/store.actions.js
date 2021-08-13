import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";

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
				// const { user } = res;
				// localStorage.setItem("user", JSON.stringify(user));
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
