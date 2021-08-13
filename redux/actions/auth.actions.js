import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";

export const Signup = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.SIGNUP.REQUEST }),
		axios.request(
			`post`,
			`auth/signup`,
			(res) => {
				console.log(" Signup res --->", res?.data);
				dispatch({ type: types.SIGNUP.SUCCESS, payload: res?.data });
				successCallback?.();
			},
			(err) => {
				console.log("Signup err --->", err);
				dispatch({ type: types.SIGNUP.FAILURE, payload: err });
				errorCallback?.();
			},
			data
		)
	);
};
