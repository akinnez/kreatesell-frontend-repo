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
	productStatus: [],
	productID: "",
	productPagination: {},
	billingInterval: [],
	singleStoreDetails: {},
	singleStoreProducts: [],
	singleStorePaginationDetails: {},
};

const ProductReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_ALL_PRODUCTS.REQUEST:
		case types.CREATE_PRODUCT.REQUEST:
		case types.GET_PRODUCT_TYPES.REQUEST:
		case types.GET_PRODUCT_BY_ID.REQUEST:
		case types.GET_PRICING_TYPES.REQUEST:
		case types.GET_LISTING_STATUS.REQUEST:
		case types.GET_BILLING_INTERVAL.REQUEST:
		case types.FETCH_SINGLE_STORE_PRODUCT.REQUEST:
		case types.FETCH_SINGLE_STORE_PRODUCT.REQUEST:
			return { ...state, loading: true };

		case types.GET_ALL_PRODUCTS.SUCCESS:
		case types.GET_BILLING_INTERVAL.SUCCESS:
		case types.FETCH_SINGLE_STORE_PRODUCT.SUCCESS:
			return { ...state, loading: false, ...payload };

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

		case types.FETCH_PRODUCT_STATUS.SUCCESS:
			return { ...state, loading: false, productStatus: payload };

		case types.GET_ALL_PRODUCTS.FAILURE:
		case types.CREATE_PRODUCT.FAILURE:
		case types.GET_PRODUCT_TYPES.FAILURE:
		case types.GET_PRODUCT_BY_ID.FAILURE:
		case types.GET_PRICING_TYPES.FAILURE:
		case types.GET_LISTING_STATUS.FAILURE:
		case types.GET_BILLING_INTERVAL.FAILURE:
		case types.FETCH_SINGLE_STORE_PRODUCT.FAILURE:
		case types.FETCH_SINGLE_STORE_PRODUCT.FAILURE:
			return { ...state, loading: false, error: payload };

		case types.SET_PRODUCT_TAB.REQUEST:
			return { ...state, productTab: payload };

		case types.SET_PRODUCT_ID.REQUEST:
			return { ...state, productID: payload };

		default:
			return state;
	}
};
export default ProductReducer;
