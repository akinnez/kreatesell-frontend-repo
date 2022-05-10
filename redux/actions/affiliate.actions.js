import * as types from "../types/affiliate.types";

export const affiliateProductsRequest = () => ({
  type: types.AFFILIATE_PRODUCTS_REQUEST,
});

export const affiliateProductsSuccess = productsObj => ({
  type: types.AFFILIATE_PRODUCTS_SUCCESS,
  payload: productsObj,
});

export const affiliateProductsFailure = () => ({
  type: types.AFFILIATE_PRODUCTS_FAILURE,
});
