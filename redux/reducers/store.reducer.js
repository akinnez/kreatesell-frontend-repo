import * as types from "../types";

const initialState = {
	loading: false,
	store: {},
	error: {},
};

const StoreReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.ONBOARDING_SETUP.REQUEST:
		case types.WELCOME_STORE_ONBOARDING.REQUEST:
			return { ...state, loading: true };

		case types.ONBOARDING_SETUP.SUCCESS:
		case types.WELCOME_STORE_ONBOARDING.SUCCESS:
			return { ...state, loading: false, store: payload };

		case types.ONBOARDING_SETUP.FAILURE:
		case types.WELCOME_STORE_ONBOARDING.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default StoreReducer;
