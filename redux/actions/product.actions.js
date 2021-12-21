import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { showToast } from "utils";

export const CreateProduct = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.CREATE_PRODUCT.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/product/create-edit`,
			(res) => {
				dispatch({ type: types.CREATE_PRODUCT.SUCCESS, payload: res });
				showToast(res?.message, "info");
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.CREATE_PRODUCT.FAILURE, payload: err });
				showToast(err?.message, "error");
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
			`get`,
			`v1/kreatesell/product/get/${productID}`,
			(res) => {
				dispatch({
					type: types.GET_PRODUCT_BY_ID.SUCCESS,
					payload: res?.data?.data,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_PRODUCT_BY_ID.FAILURE, payload: err });
				showToast(err?.message, "error");
				errorCallback?.();
			},
			productID
		)
	);
};

export const GetProducts = () => {
	const dispatch = useDispatch();
	return (
		page = 1,
		product_Name = "",
		StartDate,
		endDate,
		Status,
		successCallback,
		errorCallback
	) => (
		dispatch({ type: types.GET_ALL_PRODUCTS.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/fetch/all?page=${page}
			${product_Name ? `&product_name=${product_Name}` : ""}
			${StartDate ? `&StartDate=${StartDate}` : ""}
			${endDate ? `&endDate=${endDate}` : ""}
			${Status ? `&Status=${Status}` : ""}
			`,
			(res) => {
				const products = res?.data?.data;
				const data = res?.data;

				delete data?.data;
				const payload = {
					products,
					productPagination: { ...data },
				};
				dispatch({ type: types.GET_ALL_PRODUCTS.SUCCESS, payload });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_ALL_PRODUCTS.FAILURE, payload: err });
				showToast(err?.message, "error");
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

export const GetBillingInterval = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_BILLING_INTERVAL.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/get-billing-interval`,
			(res) => {
				const payload = {
					billingInterval: res?.data?.billing_interval,
				};

				dispatch({
					type: types.GET_BILLING_INTERVAL.SUCCESS,
					payload,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_BILLING_INTERVAL.FAILURE, payload: err });
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
				showToast(err?.message, "error");
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

export const GetProductStatus = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.FETCH_PRODUCT_STATUS.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/get-product-status`,
			(res) => {
				dispatch({
					type: types.FETCH_PRODUCT_STATUS.SUCCESS,
					payload: res?.data?.product_status,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.FETCH_PRODUCT_STATUS.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const DuplicateProductAction = () => {
	const dispatch = useDispatch();
	return (productId, successCallback, errorCallback) => (
		dispatch({ type: types.DUPLICATE_PRODUCT.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/product/duplicate?productId=${productId}`,
			(res) => {
				dispatch({
					type: types.DUPLICATE_PRODUCT.SUCCESS,
					payload: res?.data?.listing_status,
				});
				showToast(res?.message, "info");
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.DUPLICATE_PRODUCT.FAILURE, payload: err });
				showToast(err?.message, "error");
				errorCallback?.();
			}
		)
	);
};

export const FetchSingleStoreProduct = () => {
	const dispatch = useDispatch();
	return (storename, page = 1, successCallback, errorCallback) => (
		dispatch({ type: types.FETCH_SINGLE_STORE_PRODUCT.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/product/fetch/${storename}?page=${page}&limit=12`,
			(res) => {
				const data = res?.data;
				const singleStoreProducts = data?.products?.data;
				delete data?.products?.data;

				const payload = {
					singleStoreDetails: data?.store_details,
					singleStoreProducts,
					singleStorePaginationDetails: { ...data?.products },
				};

				dispatch({
					type: types.FETCH_SINGLE_STORE_PRODUCT.SUCCESS,
					payload,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.FETCH_SINGLE_STORE_PRODUCT.FAILURE,
					payload: err,
				});
				showToast(err?.message, "error");
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

export const SetProductID = () => {
	const dispatch = useDispatch();
	return (productID, successCallback, errorCallback) =>
		dispatch({
			type: types.SET_PRODUCT_ID.REQUEST,
			payload: productID,
		});
};
