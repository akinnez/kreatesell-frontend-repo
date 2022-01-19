import * as types from "../types";

const initialState = {
	loading: false,
	user: {},
	error: {},
};

const AuthReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LOGIN.REQUEST:
		case types.SIGNUP.REQUEST:
		case types.INITIATE_PASSWORD_RESET.REQUEST:
		case types.VALIDATE_PASSWORD_RESET_TOKEN.REQUEST:
		case types.ENABLE_AND_DISABLE_2FA.REQUEST:
		case types.RESET_PASSWORD.REQUEST:
		case types.RESOLVE_2FA_LOGIN.REQUEST:
		case types.RESEND_CONFIRMATION_EMAIL.REQUEST:
		case types.SUPER_ADMIN_LOGIN.REQUEST:
		case types.SUPER_ADMIN_RESET_PASSWORD.REQUEST:
		case types.RESEND_2FA.REQUEST:
			return { ...state, loading: true };

		case types.LOGIN.SUCCESS:
		case types.SIGNUP.SUCCESS:
		case types.SUPER_ADMIN_LOGIN.SUCCESS:
			return { ...state, loading: false, user: payload };

		case types.INITIATE_PASSWORD_RESET.SUCCESS:
		case types.VALIDATE_PASSWORD_RESET_TOKEN.SUCCESS:
		case types.RESET_PASSWORD.SUCCESS:
		case types.ENABLE_AND_DISABLE_2FA.SUCCESS:
		case types.RESOLVE_2FA_LOGIN.SUCCESS:
		case types.RESEND_CONFIRMATION_EMAIL.SUCCESS:
		case types.SUPER_ADMIN_RESET_PASSWORD.SUCCESS:
		case types.RESEND_2FA.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.SIGNUP.FAILURE:
		case types.LOGIN.FAILURE:
		case types.INITIATE_PASSWORD_RESET.FAILURE:
		case types.VALIDATE_PASSWORD_RESET_TOKEN.FAILURE:
		case types.RESET_PASSWORD.FAILURE:
		case types.ENABLE_AND_DISABLE_2FA.FAILURE:
		case types.RESOLVE_2FA_LOGIN.FAILURE:
		case types.RESEND_CONFIRMATION_EMAIL.FAILURE:
		case types.SUPER_ADMIN_LOGIN.FAILURE:
		case types.SUPER_ADMIN_RESET_PASSWORD.FAILURE:
		case types.RESEND_2FA.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default AuthReducer;
