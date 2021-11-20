const { generateActions } = require("utils");

export const GET_ALL_PRODUCTS = generateActions("GET_ALL_PRODUCTS");
export const CREATE_PRODUCT = generateActions("CREATE_PRODUCT");
export const SET_PRODUCT_TAB = generateActions("SET_PRODUCT_TAB");
export const GET_PRODUCT_TYPES = generateActions("GET_PRODUCT_TYPES");
export const GET_PRODUCT_BY_ID = generateActions("GET_PRODUCT_BY_ID");
export const GET_PRICING_TYPES = generateActions("GET_PRICING_TYPES");
export const GET_LISTING_STATUS = generateActions("GET_LISTING_STATUS");
export const DUPLICATE_PRODUCT = generateActions("DUPLICATE_PRODUCT");
export const SET_PRODUCT_ID = generateActions("SET_PRODUCT_ID");
export const GET_BILLING_INTERVAL = generateActions("GET_BILLING_INTERVAL");
export const FETCH_SINGLE_STORE_PRODUCT = generateActions(
	"FETCH_SINGLE_STORE_PRODUCT"
);
export const FETCH_PRODUCT_STATUS = generateActions("FETCH_PRODUCT_STATUS");
