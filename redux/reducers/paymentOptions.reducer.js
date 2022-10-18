import * as types from '../types';

const initialState = {
	loading: false,
	error: {},
};
const SubmitPaymentOptionsReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case types.ENABLE_PAYMENT_METHODS.REQUEST:
			return {...state, loading: true};

		case types.ENABLE_PAYMENT_METHODS.SUCCESS:
			return {...state, loading: false};

		case types.ENABLE_PAYMENT_METHODS.FAILURE:
			return {...state, loading: false, error: payload};

		default:
			return state;
	}
};
export default SubmitPaymentOptionsReducer;
