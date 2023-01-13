import * as types from '../types';

const initialState = {
	loading: false,
	coupons: [],
	coupon: {},
	error: {},
	couponID: '',
	applyCouponResponse: {},
	couponPagination: {},
};
const CouponReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case types.GET_ALL_COUPONS.REQUEST:
		case types.CREATE_COUPON.REQUEST:
		case types.APPLY_COUPON.REQUEST:
			return {...state, loading: true};

		case types.GET_ALL_COUPONS.SUCCESS:
			return {...state, loading: false, ...payload};

		case types.APPLY_COUPON.SUCCESS:
			return {...state, loading: false, applyCouponResponse: payload};

		case types.CREATE_COUPON.SUCCESS:
			if (payload.token) {
				return {...state, loading: false, productID: payload.token};
			}
			return {...state, loading: false, ...payload};

		case types.GET_ALL_COUPONS.FAILURE:
		case types.CREATE_COUPON.FAILURE:
			return {...state, loading: false, error: payload};

		default:
			return state;
	}
};
export default CouponReducer;
