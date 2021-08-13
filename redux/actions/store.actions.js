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
				console.log("StoreOnboarding action res -->", res);
				dispatch({ type: types.ONBOARDING_SETUP.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				console.log("StoreOnboarding error --->", err);
				dispatch({ type: types.ONBOARDING_SETUP.FAILURE, payload: err });
				errorCallback?.();
			},
			data
		)
	);
};
