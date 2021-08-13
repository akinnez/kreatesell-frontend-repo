import * as types from "../types";

const initialState = {
	loading: false,
	posts: [],
	user: {},
};

const AuthReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LOGIN.REQUEST:
		case types.SIGNUP.REQUEST:
			return { ...state, loading: true };

		case types.LOGIN.SUCCESS:
		case types.LOGIN.FAILURE:
		case types.SIGNUP.SUCCESS:
		case types.SIGNUP.FAILURE:
			return { ...state, loading: false, user: payload };

		default:
			return state;
	}
};

export default AuthReducer;
