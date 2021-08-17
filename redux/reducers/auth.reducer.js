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
		case types.RESET_PASSWORD.REQUEST:
			return { ...state, loading: true };

		case types.LOGIN.SUCCESS:
		case types.SIGNUP.SUCCESS:
			return { ...state, loading: false, user: payload };

		case types.INITIATE_PASSWORD_RESET.SUCCESS:
		case types.VALIDATE_PASSWORD_RESET_TOKEN.SUCCESS:
		case types.RESET_PASSWORD.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.SIGNUP.FAILURE:
		case types.LOGIN.FAILURE:
		case types.INITIATE_PASSWORD_RESET.FAILURE:
		case types.VALIDATE_PASSWORD_RESET_TOKEN.FAILURE:
		case types.RESET_PASSWORD.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default AuthReducer;
