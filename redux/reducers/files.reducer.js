import * as types from '../types';

const initialState = {
	loading: false,
};

const StoreReducer = (state = initialState, {type}) => {
	switch (type) {
		case types.ONBOARDING_SETUP.REQUEST:
			return {...state, loading: true};
		case types.ONBOARDING_SETUP.SUCCESS:
		case types.ONBOARDING_SETUP.FAILURE:
			return {...state, loading: false};
		default:
			return state;
	}
};

export default StoreReducer;
