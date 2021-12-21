import * as types from "../types";

const initialState = {
	user: {},
	countries: [],
	banks: [],
	loading: false,
	error: "",
};

const UtilsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_COUNTRIES.REQUEST:
		case types.GET_STORE_DETAILS.REQUEST:
		case types.GUEST_SUBSCRIPTION.REQUEST:
			return { ...state, loading: true };

		case types.GET_STORE_DETAILS.SUCCESS:
		case types.GUEST_SUBSCRIPTION.SUCCESS:
			return { ...state, loading: false, user: payload };

		case types.GET_COUNTRIES.SUCCESS:
			return { ...state, loading: false, countries: payload };

		case types.GET_BANKS:
			return { ...state, banks: payload };

		case types.GET_STORE_DETAILS.FAILURE:
		case types.GET_COUNTRIES.FAILURE:
		case types.GUEST_SUBSCRIPTION.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default UtilsReducer;
