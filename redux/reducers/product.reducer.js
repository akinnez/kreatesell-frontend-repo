import * as types from "../types";

const initialState = {
	loading: false,
	products: [],
	product: {},
	error: {},
	productTab: 0,
	productTypes: [],
	pricingTypes: [],
	listingStatus: [],
};

const ProductReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_ALL_PRODUCTS.REQUEST:
		case types.CREATE_PRODUCT.REQUEST:
		case types.GET_PRODUCT_TYPES.REQUEST:
		case types.GET_PRODUCT_BY_ID.REQUEST:
		case types.GET_PRICING_TYPES.REQUEST:
		case types.GET_LISTING_STATUS.REQUEST:
			return { ...state, loading: true };

		case types.GET_ALL_PRODUCTS.SUCCESS:
			return { ...state, loading: false, products: payload };

		case types.CREATE_PRODUCT.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.GET_PRODUCT_TYPES.SUCCESS:
			return { ...state, loading: false, productTypes: payload };

		case types.GET_LISTING_STATUS.SUCCESS:
			return { ...state, loading: false, listingStatus: payload };

		case types.GET_PRODUCT_BY_ID.SUCCESS:
			return { ...state, loading: false, product: payload };

		case types.GET_PRICING_TYPES.SUCCESS:
			return { ...state, loading: false, pricingTypes: payload };

		case types.GET_ALL_PRODUCTS.FAILURE:
		case types.CREATE_PRODUCT.FAILURE:
		case types.GET_PRODUCT_TYPES.FAILURE:
		case types.GET_PRODUCT_BY_ID.FAILURE:
		case types.GET_PRICING_TYPES.FAILURE:
		case types.GET_LISTING_STATUS.FAILURE:
			return { ...state, loading: false, error: payload };

		case types.SET_PRODUCT_TAB.REQUEST:
			return { ...state, productTab: payload };

		default:
			return state;
	}
};
export default ProductReducer;
