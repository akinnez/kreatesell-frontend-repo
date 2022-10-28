import axios from '../../utils/axios';
import * as types from '../types';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {showToast} from '../../utils';

export const Signup = () => {
	// console.log('I got here')
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.SIGNUP.REQUEST}),
		axios.request(
			`post`,
			`auth/signup/EmailConfirmation`,
			(res) => {
				const {token, user} = res;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				dispatch({type: types.SIGNUP.SUCCESS, payload: user});
				showToast(
					res?.message ||
						'Signup successful. Verification link has been sent to your mail',
					'info'
				);
				successCallback?.(res);
			},
			(err) => {
				dispatch({type: types.SIGNUP.FAILURE, payload: err?.error});
				console.log('err is', err);
				showToast(
					err?.error?.message || 'A network error occured',
					'error'
				);
				errorCallback?.();
			},
			data
		)
	);
};

export const Login = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.LOGIN.REQUEST}),
		axios.request(
			`post`,
			`auth/signin/EmailConfirm`,
			(res) => {
				// console.log('res is', res)
				// check if the login request has 2FA enabled
				if (!res.data?.is2_fa_set) {
					const {token, user} = res;
					dispatch({type: types.LOGIN.SUCCESS, payload: user});
					localStorage.setItem('token', token);
					localStorage.setItem('user', JSON.stringify(user));
					// sessionStorage.setItem("user", JSON.stringify(user));
				} else if (res.data?.is2_fa_set) {
					dispatch({type: types.STOP_LOADING});
				}
				successCallback?.(res);
			},
			(err) => {
				dispatch({type: types.LOGIN.FAILURE, payload: err});
				showToast(err?.message, 'error');
				errorCallback?.(err);
			},
			data
		)
	);
};

export const SuperAdminLogin = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.SUPER_ADMIN_LOGIN.REQUEST}),
		axios.request(
			`post`,
			'auth/superadmin/signin',
			(res) => {
				const {token, user} = res;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				dispatch({type: types.SUPER_ADMIN_LOGIN.SUCCESS, payload: res});
				successCallback?.(res);
			},
			(err) => {
				dispatch({type: types.SUPER_ADMIN_LOGIN.FAILURE, payload: err});
				showToast(err?.error, 'error');
				errorCallback?.(err);
			},
			data
		)
	);
};

export const ResendConfirmationEmail = () => {
	const dispatch = useDispatch();
	const endpoint = 'auth/resendconfrimationemail/';
	return (email, successCallback, errorCallback) => (
		dispatch({type: types.RESEND_CONFIRMATION_EMAIL.REQUEST}),
		axios.request(
			`get`,
			endpoint + email,
			(res) => {
				dispatch({
					type: types.RESEND_CONFIRMATION_EMAIL.SUCCESS,
					payload: res,
				});
				showToast(
					'Kindly check your mail for verification link',
					'info'
				);
				successCallback?.(res);
			},
			(err) => {
				dispatch({
					type: types.RESEND_CONFIRMATION_EMAIL.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
				errorCallback?.();
			}
		)
	);
};

export const Resolve2FALogin = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.RESOLVE_2FA_LOGIN.REQUEST}),
		axios.request(
			`post`,
			`auth/2fa/validatetoken`,
			(res) => {
				const {token, user} = res;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				dispatch({type: types.RESOLVE_2FA_LOGIN.SUCCESS, payload: res});
				successCallback?.(res);
			},
			(err) => {
				dispatch({type: types.RESOLVE_2FA_LOGIN.FAILURE, payload: err});
				showToast(err?.error, 'error');
				errorCallback?.();
			},
			data
		)
	);
};

export const InitiatePasswordReset = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.INITIATE_PASSWORD_RESET.REQUEST}),
		axios.request(
			`post`,
			`auth/forgot_password/generate_token`,
			(res) => {
				dispatch({
					type: types.INITIATE_PASSWORD_RESET.SUCCESS,
					payload: res,
				});
				showToast(
					'Kindly check your mail for password reset token',
					'info'
				);
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.INITIATE_PASSWORD_RESET.FAILURE,
					payload: err,
				});
				showToast(err?.error, 'error');
				errorCallback?.();
			},
			data
		)
	);
};

export const ValidateResetToken = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.VALIDATE_PASSWORD_RESET_TOKEN.REQUEST}),
		axios.request(
			`post`,
			`auth/forgot_password/confirm_token`,
			(res) => {
				const {token} = res;
				localStorage.setItem('token', token);
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
				showToast(err?.error, 'error');
				errorCallback?.();
			},
			data
		)
	);
};

export const ResetPassword = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.RESET_PASSWORD.REQUEST}),
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
				showToast(err?.error, 'error');
				errorCallback?.();
			},
			data
		)
	);
};

export const ChangePassword = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.CHANGE_PASSWORD.REQUEST}),
		axios.request(
			`post`,
			`auth/auth/change_password`,
			(res) => {
				dispatch({
					type: types.CHANGE_PASSWORD.SUCCESS,
					payload: res,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.CHANGE_PASSWORD.FAILURE,
					payload: err,
				});
				showToast(err?.error, 'error');
				errorCallback?.();
			},
			data
		)
	);
};

export const SuperAdminResetPassword = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.SUPER_ADMIN_RESET_PASSWORD.REQUEST}),
		axios.request(
			`post`,
			`auth/superadmin/reset_password`,
			(res) => {
				dispatch({
					type: types.SUPER_ADMIN_RESET_PASSWORD.SUCCESS,
					payload: res,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.SUPER_ADMIN_RESET_PASSWORD.FAILURE,
					payload: err,
				});
				showToast(err?.error, 'error');
				errorCallback?.();
			},
			data
		)
	);
};

export const EnableAndDisable2FA = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.ENABLE_AND_DISABLE_2FA.REQUEST}),
		axios.request(
			`post`,
			`Seller/Activate/De-Activate2FA`,
			(res) => {
				dispatch({
					type: types.ENABLE_AND_DISABLE_2FA.SUCCESS,
					payload: res,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.ENABLE_AND_DISABLE_2FA.FAILURE,
					payload: err,
				});
				showToast(err?.error, 'error');
				errorCallback?.();
			}
		)
	);
};

export const Resend2FA = () => {
	const dispatch = useDispatch();
	return (userId, successCallback, errorCallback) => (
		dispatch({type: types.RESEND_2FA.REQUEST}),
		axios.request(
			`post`,
			`auth/resend/2FA/${userId}`,
			(res) => {
				dispatch({
					type: types.RESEND_2FA.SUCCESS,
					payload: res,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.RESEND_2FA.FAILURE,
					payload: err,
				});
				showToast(err?.error, 'error');
				errorCallback?.();
			},
			{userId}
		)
	);
};

export const Logout = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	return (successCallback, errorCallback) => (
		dispatch({type: types.LOGOUT.REQUEST}),
		localStorage.clear(),
		sessionStorage.clear(),
		router.push('/login')
	);
};
