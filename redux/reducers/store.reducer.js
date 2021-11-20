import * as types from "../types";

const initialState = {
	loading: false,
	store: {},
	error: {},
	storeSettings: {},
	ctaBtn: {},
	singleStoreDetails: {},
	singleStoreProducts: [],
};

const StoreReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.ONBOARDING_SETUP.REQUEST:
		case types.WELCOME_STORE_ONBOARDING.REQUEST:
		case types.STORE_SETTINGS.REQUEST:
		case types.UPDATE_STORE_CTA_BUTTON.REQUEST:
		case types.LIST_SINGLE_STORE_PRODUCT.REQUEST:
			return { ...state, loading: true };

		case types.ONBOARDING_SETUP.SUCCESS:
		case types.WELCOME_STORE_ONBOARDING.SUCCESS:
			return { ...state, loading: false, store: payload };

		case types.STORE_SETTINGS.SUCCESS:
			return { ...state, loading: false, storeSettings: payload };

		case types.UPDATE_STORE_CTA_BUTTON.SUCCESS:
			return { ...state, loading: false, ctaBtn: payload };

		case types.LIST_SINGLE_STORE_PRODUCT.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.ONBOARDING_SETUP.FAILURE:
		case types.WELCOME_STORE_ONBOARDING.FAILURE:
		case types.STORE_SETTINGS.FAILURE:
		case types.UPDATE_STORE_CTA_BUTTON.FAILURE:
		case types.LIST_SINGLE_STORE_PRODUCT.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default StoreReducer;
