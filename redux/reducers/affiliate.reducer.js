import * as types from '../types';

const initialState = {
	loading: false,
	errors: {},
};

const AffiliateReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case types.AFFILIATE.REQUEST:
			return {...state, loading: true};

		case types.AFFILIATE.SUCCESS:
			return {...state, loading: false};

		case types.AFFILIATE.FAILURE:
			return {...state, errors: payload, loading: false};
		default:
			return state;
	}
};

export default AffiliateReducer;
