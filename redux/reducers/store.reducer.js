import * as types from "../types";

const initialState = {
	loading: false,
	store: {},
	error: {},
};

const StoreReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.ONBOARDING_SETUP.REQUEST:
			return { ...state, loading: true };

		case types.ONBOARDING_SETUP.SUCCESS:
			return { ...state, loading: false, store: payload };

		case types.ONBOARDING_SETUP.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default StoreReducer;
