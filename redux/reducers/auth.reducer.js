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
			return { ...state, loading: true };

		case types.LOGIN.SUCCESS:
		case types.SIGNUP.SUCCESS:
			return { ...state, loading: false, user: payload };

		case types.SIGNUP.FAILURE:
		case types.LOGIN.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default AuthReducer;
