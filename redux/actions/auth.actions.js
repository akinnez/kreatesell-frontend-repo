import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { showToast } from "../../utils";

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
				dispatch({ type: types.SIGNUP.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.SIGNUP.FAILURE, payload: err?.error });
				showToast(err?.error?.message, "error");
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
				dispatch({ type: types.LOGIN.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.LOGIN.FAILURE, payload: err });
				showToast(err?.error, "error");
				errorCallback?.();
			},
			data
		)
	);
};

export const InitiatePasswordReset = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.INITIATE_PASSWORD_RESET.REQUEST }),
		axios.request(
			`post`,
			`auth/forgot_password/generate_token`,
			(res) => {
				dispatch({ type: types.INITIATE_PASSWORD_RESET.SUCCESS, payload: res });
				showToast("Kindly check your mail for password reset token", "info");
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.INITIATE_PASSWORD_RESET.FAILURE, payload: err });
				showToast(err?.error, "error");
				errorCallback?.();
			},
			data
		)
	);
};

export const ValidateResetToken = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.VALIDATE_PASSWORD_RESET_TOKEN.REQUEST }),
		axios.request(
			`post`,
			`auth/forgot_password/confirm_token`,
			(res) => {
				const { token } = res;
				localStorage.setItem("token", token);
				dispatch({
					type: types.VALIDATE_PASSWORD_RESET_TOKEN.SUCCESS,
					payload: res,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.VALIDATE_PASSWORD_RESET_TOKEN.FAILURE,
					payload: err,
				});
				showToast(err?.error, "error");
				errorCallback?.();
			},
			data
		)
	);
};

export const ResetPassword = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.RESET_PASSWORD.REQUEST }),
		axios.request(
			`post`,
			`auth/forgot_password/reset_password`,
			(res) => {
				dispatch({
					type: types.RESET_PASSWORD.SUCCESS,
					payload: res,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.RESET_PASSWORD.FAILURE,
					payload: err,
				});
				showToast(err?.error, "error");
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
		dispatch({ type: types.LOGOUT.REQUEST }),
		localStorage.clear(),
		sessionStorage.clear(),
		router.push("/login")
	);
};
