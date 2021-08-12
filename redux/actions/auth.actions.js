import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export const Signup = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.SIGNUP.REQUEST }),
		axios.request(
			`post`,
			`auth/signup`,
			(res) => {
				const { token, user } = res;
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));
				dispatch({ type: types.SIGNUP.SUCCESS, payload: res?.data });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.SIGNUP.FAILURE, payload: err });
				errorCallback?.();
			},
			data
		)
	);
};

export const Login = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.LOGIN.REQUEST }),
		axios.request(
			`post`,
			`auth/signin`,
			(res) => {
				const { token, user } = res;
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));
				dispatch({ type: types.LOGIN.SUCCESS, payload: res?.data });
				successCallback?.();
			},
			(err) => {
				console.log("Signup err --->", err);
				dispatch({ type: types.LOGIN.FAILURE, payload: err });
				errorCallback?.();
			},
			data
		)
	);
};

export const Logout = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	return (successCallback, errorCallback) => (
		localStorage.clear(),
		router.push("/"),
		dispatch({ type: types.LOGOUT.REQUEST })
	);
};
