import * as types from "../types";

const initialState = {
	user: {},
	countries: [],
	loading: false,
	error: "",
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_ME.REQUEST:
		case types.GET_COUNTRIES.REQUEST:
			return { ...state, loading: true };

		case types.GET_ME.SUCCESS:
			return { ...state, loading: false, user: payload };

		case types.GET_COUNTRIES.SUCCESS:
			return { ...state, loading: false, countries: payload };

		case types.GET_ME.FAILURE:
		case types.GET_COUNTRIES.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};
