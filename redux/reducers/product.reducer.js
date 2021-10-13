import * as types from "../types";

const initialState = {
	loading: false,
	products: [],
	error: {},
};

const ProductReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_ALL_PRODUCTS.REQUEST:
		case types.CREATE_PRODUCT.REQUEST:
			return { ...state, loading: true };

		case types.GET_ALL_PRODUCTS.SUCCESS:
			return { ...state, loading: false, products: payload };

		case types.CREATE_PRODUCT.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.GET_ALL_PRODUCTS.FAILURE:
		case types.CREATE_PRODUCT.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};
export default ProductReducer;
