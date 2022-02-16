import * as types from "../types/affiliate.types";

const initialState = {
  loading: false,
  products: [],
};

const affiliate = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AFFILIATE_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case types.AFFILIATE_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: payload };

    case types.AFFILIATE_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default affiliate;
