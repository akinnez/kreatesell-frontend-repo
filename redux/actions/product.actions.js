import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
// import { showToast } from "../../utils";

export const CreateProduct = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.CREATE_PRODUCT.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/product/create-edit`,
			(res) => {
				console.log("create product res -->", res);
				dispatch({ type: types.CREATE_PRODUCT.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.CREATE_PRODUCT.FAILURE, payload: err });
				errorCallback?.();
			},
			data
		)
	);
};

export const GetProductByID = () => {
	const dispatch = useDispatch();
	return (productID, successCallback, errorCallback) => (
		dispatch({ type: types.GET_PRODUCT_BY_ID.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/product/get/${productID}`,
			(res) => {
				dispatch({ type: types.GET_PRODUCT_BY_ID.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_PRODUCT_BY_ID.FAILURE, payload: err });
				errorCallback?.();
			},
			productID
		)
	);
};

export const GetProducts = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_ALL_PRODUCTS.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/fetch/all`,
			(res) => {
				console.log("all products -->", res);
				dispatch({ type: types.GET_ALL_PRODUCTS.SUCCESS, payload: res?.data });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_ALL_PRODUCTS.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const GetProductTypes = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_PRODUCT_TYPES.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/get-product-types`,
			(res) => {
				dispatch({
					type: types.GET_PRODUCT_TYPES.SUCCESS,
					payload: res?.data?.product_types,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_PRODUCT_TYPES.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const GetPricingTypes = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_PRICING_TYPES.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/get-pricing-types`,
			(res) => {
				dispatch({
					type: types.GET_PRICING_TYPES.SUCCESS,
					payload: res?.data?.pricing_types,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_PRICING_TYPES.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const GetListingStatus = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_LISTING_STATUS.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/get-listing-status`,
			(res) => {
				// console.log("lisiting ===>", res);
				dispatch({
					type: types.GET_LISTING_STATUS.SUCCESS,
					payload: res?.data?.listing_status,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_LISTING_STATUS.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const SetProductTab = () => {
	const dispatch = useDispatch();
	return (tab, successCallback, errorCallback) =>
		dispatch({
			type: types.SET_PRODUCT_TAB.REQUEST,
			payload: tab,
		});
};
