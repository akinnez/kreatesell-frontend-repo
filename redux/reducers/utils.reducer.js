import * as types from "../types";

const initialState = {
	user: {},
	countries: [],
	loading: false,
	error: "",
};

const UtilsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_COUNTRIES.REQUEST:
		case types.GET_STORE_DETAILS.REQUEST:
			return { ...state, loading: true };

		case types.GET_STORE_DETAILS.SUCCESS:
			return { ...state, loading: false, user: payload };

		case types.GET_COUNTRIES.SUCCESS:
			return { ...state, loading: false, countries: payload };

		case types.GET_STORE_DETAILS.FAILURE:
		case types.GET_COUNTRIES.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default UtilsReducer;
