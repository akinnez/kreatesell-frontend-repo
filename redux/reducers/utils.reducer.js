import * as types from '../types';

const initialState = {
	// user: {},
	countries: [],
	banks: [],
	banksByCountryId: {},
	loading: false,
	error: '',
};

const UtilsReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case types.GET_COUNTRIES.REQUEST:
		case types.GUEST_SUBSCRIPTION.REQUEST:
		case types.GET_CURRENCIES.REQUEST:
			return {...state, loading: true};

		case types.GET_COUNTRIES.SUCCESS:
			return {...state, loading: false, countries: payload};

		case types.GET_CURRENCIES.SUCCESS:
			return {...state, loading: false, currency: payload};

		case types.GET_BANKS:
			return {...state, banks: payload};

		case types.GET_BANKS_SUCCESS:
			return {
				...state,
				banksByCountryId: {...state.banksByCountryId, ...payload},
			};

		case types.GET_COUNTRIES.FAILURE:
		case types.GUEST_SUBSCRIPTION.FAILURE:
		case types.GET_CURRENCIES.FAILURE:
			return {...state, loading: false, error: payload};

		default:
			return state;
	}
};

export default UtilsReducer;
