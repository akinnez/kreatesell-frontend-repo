import * as types from '../types';

// TODO: make the loading states be unique for each entity
const initialState = {
	loading: false,
	products: [],
	error: {},
	product: {},
	productTab: 0,
	productTypes: [],
	pricingTypes: [],
	listingStatus: [],
	productStatus: [],
	productID: '',
	productPagination: {},
	billingInterval: [],
	singleStoreDetails: {},
	singleStoreProducts: [],
	singleStorePaginationDetails: {},
	couponProducts: [],
};

const ProductReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case types.GET_ALL_PRODUCTS.REQUEST:
		case types.CREATE_PRODUCT.REQUEST:
		case types.CREATE_SECTION.REQUEST:
		case types.CREATE_CONTENT.REQUEST:
		case types.GET_PRODUCT_TYPES.REQUEST:
		case types.GET_PRODUCT_BY_ID.REQUEST:
		case types.GET_PRODUCT_NOT_BY_ID.REQUEST:
		case types.PUBLISH_PRODUCT.REQUEST:
		case types.GET_PRICING_TYPES.REQUEST:
		case types.GET_LISTING_STATUS.REQUEST:
		case types.GET_BILLING_INTERVAL.REQUEST:
		case types.FETCH_SINGLE_STORE_PRODUCT.REQUEST:
		case types.FETCH_SINGLE_STORE_PRODUCT.REQUEST:
		case types.FETCH_COUPON_PRODUCT.REQUEST:
		// case types.UPDATE_PRODUCT_CURRENCY.REQUEST:
		//   return { ...state, loading: true }

		case types.GET_ALL_PRODUCTS.SUCCESS:
		case types.GET_BILLING_INTERVAL.SUCCESS:
		case types.FETCH_SINGLE_STORE_PRODUCT.SUCCESS:
			return {...state, loading: false, ...payload};

		case types.PUBLISH_PRODUCT.SUCCESS:
		case types.CREATE_SECTION.SUCCESS:
		case types.CREATE_CONTENT.SUCCESS:
		// case types.UPDATE_PRODUCT_CURRENCY.SUCCESS:
		//   return { ...state, loading: false };

		case types.CREATE_PRODUCT.SUCCESS:
			if (payload?.product_id) {
				return {
					...state,
					loading: false,
					productID: payload.product_id,
				};
			}
			return {...state, loading: false, ...payload};

		case types.GET_PRODUCT_TYPES.SUCCESS:
			return {...state, loading: false, productTypes: payload};

		case types.GET_LISTING_STATUS.SUCCESS:
			return {...state, loading: false, listingStatus: payload};

		case types.GET_PRODUCT_BY_ID.SUCCESS:
			return {...state, loading: false, product: payload};
		
	    case types.GET_PRODUCT_NOT_BY_ID.SUCCESS:
            return {...state, loading: false, product: payload};
			
		case types.GET_PRICING_TYPES.SUCCESS:
			return {...state, loading: false, pricingTypes: payload};

		case types.FETCH_PRODUCT_STATUS.SUCCESS:
			return {...state, loading: false, productStatus: payload};

		case types.FETCH_COUPON_PRODUCT.SUCCESS:
			return {...state, loading: false, couponProducts: payload};

		case types.GET_ALL_PRODUCTS.FAILURE:
		case types.CREATE_PRODUCT.FAILURE:
		case types.CREATE_SECTION.FAILURE:
		case types.CREATE_CONTENT.FAILURE:
		case types.GET_PRODUCT_TYPES.FAILURE:
		case types.GET_PRODUCT_BY_ID.FAILURE:
		case types.GET_PRICING_TYPES.FAILURE:
		case types.GET_LISTING_STATUS.FAILURE:
		case types.PUBLISH_PRODUCT.FAILURE:
		case types.FETCH_COUPON_PRODUCT.FAILURE:
		case types.GET_BILLING_INTERVAL.FAILURE:
		case types.FETCH_SINGLE_STORE_PRODUCT.FAILURE:
		case types.FETCH_SINGLE_STORE_PRODUCT.FAILURE:
			// case types.UPDATE_PRODUCT_CURRENCY.FAILURE:
			return {...state, loading: false, error: payload};

		case types.SET_PRODUCT_TAB.REQUEST:
			return {...state, productTab: payload};

		case types.SET_PRODUCT_ID.REQUEST:
			return {...state, productID: payload};

		case types.SET_PRODUCT_DEFAULT.REQUEST:
			return {...state, product: payload};

		default:
			return state;
	}
};
export default ProductReducer;
