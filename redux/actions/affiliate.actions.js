import * as types from "../types/affiliate.types";

export const affiliateProductsRequest = () => ({
  type: types.AFFILIATE_PRODUCTS_REQUEST,
});

export const affiliateProductsSuccess = products => ({
  type: types.AFFILIATE_PRODUCTS_SUCCESS,
  payload: products,
});

export const affiliateProductsFailure = () => ({
  type: types.AFFILIATE_PRODUCTS_FAILURE,
});
