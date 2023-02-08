import axios from '../../utils/axios';
import * as types from '../types';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {showToast} from 'utils';

export const CreateProduct = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.CREATE_PRODUCT.REQUEST}),
		axios.request(
			`post`,
			`v1/kreatesell/product/create-edit`,
			(res) => {
				console.log('res from product creation = ', res);
				dispatch({type: types.CREATE_PRODUCT.SUCCESS, payload: res});
				showToast(res?.message, 'info');
				successCallback?.(res);
			},
			(err) => {
				dispatch({type: types.CREATE_PRODUCT.FAILURE, payload: err});
				showToast(
					err.message
						? err.message
						: 'Network Error, Check your Connection',
					'error'
				);
				errorCallback?.();
			},
			data
		)
	);
};
export const CreateSection = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.CREATE_SECTION.REQUEST}),
		axios.request(
			`post`,
			`v1/kreatesell/product/section/create-edit`,
			(res) => {
				// console.log(res);
				dispatch({type: types.CREATE_SECTION.SUCCESS, payload: res});
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({type: types.CREATE_SECTION.FAILURE, payload: err});
				showToast(
					err.message
						? err.message
						: 'Network Error, Check your Connection',
					'error'
				);
				errorCallback?.();
			},
			data
		)
	);
};
export const CreateContent = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.CREATE_CONTENT.REQUEST}),
		axios.request(
			`post`,
			`v1/kreatesell/product/subsection/create-edit`,
			(res) => {
				console.log(res);
				dispatch({type: types.CREATE_CONTENT.SUCCESS, payload: res});
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({type: types.CREATE_CONTENT.FAILURE, payload: err});
				showToast(
					err.message
						? err.message
						: 'Network Error, Check your Connection',
					'error'
				);
				errorCallback?.();
			},
			data
		)
	);
};
export const PublishProducts = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.PUBLISH_PRODUCT.REQUEST}),
		axios.request(
			`patch`,
			`v1/kreatesell/product/configurations`,
			(res) => {
				console.log('publish', res);
				dispatch({type: types.PUBLISH_PRODUCT.SUCCESS});
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({type: types.PUBLISH_PRODUCT.FAILURE, payload: err});
				showToast(
					err.message
						? err.message
						: 'Network Error, Check your Connection',
					'error'
				);
				errorCallback?.();
			},
			data
		)
	);
};

export const AuthGetProductById = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	return (productID, successCallback, errorCallback) => (
		dispatch({type: types.GET_PRODUCT_BY_ID.REQUEST}),
		axios.request(
			`get`,
			`v1/kreatesell/product/get/auth/${productID}`,
			(res) => {
				console.log(' response from getproductById = ', res);
				dispatch({
					type: types.GET_PRODUCT_BY_ID.SUCCESS,
					payload: res?.data?.data,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({type: types.GET_PRODUCT_BY_ID.FAILURE, payload: err});
				showToast(err?.message, 'error');
				errorCallback?.();
				if (
					err.message ===
					'You do not have access to preview this product'
				) {
					router.replace({pathname: '/account/kreator/products/all'});
				}
			},
			productID
		)
	);
};
export const GetProductByIDNotAut = () => {
	const dispatch = useDispatch();
	return (productID, successCallback, errorCallback) => (
		dispatch({type: types.GET_PRODUCT_NOT_BY_ID.REQUEST}),
		axios.request(
			`get`,
			`v1/kreatesell/product/get/${productID}`,
			(res) => {
				console.log(' response from getproductById = ', res);
				dispatch({
					type: types.GET_PRODUCT_NOT_BY_ID.SUCCESS,
					payload: res?.data?.data,
				});
				successCallback?.(res);
			},
			(err) => {
				dispatch({
					type: types.GET_PRODUCT_NOT_BY_ID.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
				errorCallback?.(err.status);
			},
			productID
		)
	);
};

export const GetProducts = () => {
	const dispatch = useDispatch();
	return (
		page = 1,
		product_Name = '',
		StartDate,
		endDate,
		currencyFilter,
		successCallback,
		errorCallback
	) => {
		dispatch({type: types.GET_ALL_PRODUCTS.REQUEST}),
			axios.request(
				`get`,
				`v1/kreatesell/product/fetch/all?page=${page}
			${product_Name ? `&product_name=${product_Name}` : ''}
			${StartDate ? `&StartDate=${StartDate}` : ''}
			${endDate ? `&endDate=${endDate}` : ''}
			${currencyFilter ? `&Currency_Id=${currencyFilter}` : ''}
			`,
				(res) => {
					const products = res?.data?.data;
					const data = res?.data;
					delete data?.data;
					const payload = {
						products,
						productPagination: {...data},
					};
					dispatch({type: types.GET_ALL_PRODUCTS.SUCCESS, payload});
					successCallback?.();
				},
				(err) => {
					dispatch({
						type: types.GET_ALL_PRODUCTS.FAILURE,
						payload: err,
					});
					showToast(err?.message, 'error');
					errorCallback?.();
				}
			);
	};
};

export const GetProductTypes = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.GET_PRODUCT_TYPES.REQUEST}),
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
				dispatch({type: types.GET_PRODUCT_TYPES.FAILURE, payload: err});
				errorCallback?.();
			}
		)
	);
};

export const GetBillingInterval = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.GET_BILLING_INTERVAL.REQUEST}),
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
				dispatch({
					type: types.GET_BILLING_INTERVAL.FAILURE,
					payload: err,
				});
				errorCallback?.();
			}
		)
	);
};
export const GetCouponProducts = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.FETCH_COUPON_PRODUCT.REQUEST}),
		axios.request(
			`get`,
			`v1/kreatesell/product/fetch/product-data`,
			(res) => {
				const payload = res?.data?.data;

				dispatch({
					type: types.FETCH_COUPON_PRODUCT.SUCCESS,
					payload,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.FETCH_COUPON_PRODUCT.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
				errorCallback?.();
			}
		)
	);
};

export const GetPricingTypes = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => {
		dispatch({type: types.GET_PRICING_TYPES.REQUEST}),
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
					dispatch({
						type: types.GET_PRICING_TYPES.FAILURE,
						payload: err,
					});
					showToast(err?.message, 'error');
					errorCallback?.();
				}
			);
	};
};

export const GetListingStatus = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.GET_LISTING_STATUS.REQUEST}),
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
				dispatch({
					type: types.GET_LISTING_STATUS.FAILURE,
					payload: err,
				});
				errorCallback?.();
			}
		)
	);
};

export const GetProductStatus = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.FETCH_PRODUCT_STATUS.REQUEST}),
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
				dispatch({
					type: types.FETCH_PRODUCT_STATUS.FAILURE,
					payload: err,
				});
				errorCallback?.();
			}
		)
	);
};

export const DuplicateProductAction = () => {
	const dispatch = useDispatch();
	return (productId, successCallback, errorCallback) => (
		dispatch({type: types.DUPLICATE_PRODUCT.REQUEST}),
		axios.request(
			`post`,
			`v1/kreatesell/product/duplicate?productId=${productId}`,
			(res) => {
				dispatch({
					type: types.DUPLICATE_PRODUCT.SUCCESS,
					payload: res?.data?.listing_status,
				});
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({type: types.DUPLICATE_PRODUCT.FAILURE, payload: err});
				showToast(err?.message, 'error');
				errorCallback?.();
			}
		)
	);
};

export const UpdateStoreCurrencies = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.UPDATE_STORE_CURRENCY.REQUEST}),
		axios.request(
			`put`,
			'/v1/kreatesell/store/update-store-currencies',
			(res) => {
				dispatch({
					type: types.UPDATE_STORE_CURRENCY.SUCCESS,
					payload: res,
				});
				// console.log('res', res)
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.UPDATE_STORE_CURRENCY.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
				console.log('err', err);
				errorCallback?.();
			},
			data
		)
	);
};
export const GetStoreCurrencies = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({type: types.GET_STORE_CURRENCY.REQUEST}),
		axios.request(
			`get`,
			'/v1/kreatesell/store/fetch/currencies',
			(res) => {
				dispatch({
					type: types.GET_STORE_CURRENCY.SUCCESS,
					payload: res?.data?.store_product_currencies,
				});
				console.log('res', res);
				// showToast(res?.data?.message, 'info')
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.GET_STORE_CURRENCY.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
				console.log('err', err);
				errorCallback?.();
			}
		)
	);
};

export const UpdateStoreCheckoutCurrencies = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({type: types.UPDATE_STORE_CHECKOUT_CURRENCY.REQUEST}),
		axios.request(
			`put`,
			'/v1/kreatesell/payment/update-checkout-currencies',
			(res) => {
				dispatch({
					type: types.UPDATE_STORE_CHECKOUT_CURRENCY.SUCCESS,
					payload: res,
				});
				// console.log('res', res)
				showToast(res?.message, 'info');
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.UPDATE_STORE_CHECKOUT_CURRENCY.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
				// console.log('err', err)
				errorCallback?.();
			},
			data
		)
	);
};
export const GetStoreCheckoutCurrencies = () => {
	const dispatch = useDispatch();
	return (storeID, successCallback, errorCallback) => (
		dispatch({type: types.GET_STORE_CHECKOUT_CURRENCY.REQUEST}),
		axios.request(
			`get`,
			`/v1/kreatesell/payment/fetch/checkout-currencies/${storeID}`,
			(res) => {
				dispatch({
					type: types.GET_STORE_CHECKOUT_CURRENCY.SUCCESS,
					payload: res?.data?.store_product_currencies,
				});
				// console.log('res get currencies checkout', res.data)
				// showToast(res?.data?.message, 'info')
				successCallback?.();
			},
			(err) => {
				dispatch({
					type: types.GET_STORE_CHECKOUT_CURRENCY.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
				console.log('err', err);
				errorCallback?.();
			}
		)
	);
};

export const FetchSingleStoreProduct = () => {
	const dispatch = useDispatch();
	return (storename, page = 1, successCallback, errorCallback) => (
		dispatch({type: types.FETCH_SINGLE_STORE_PRODUCT.REQUEST}),
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
					singleStorePaginationDetails: {...data?.products},
					defaultCurrency: data?.default_currency,
					kreatorFullName: data?.kreator_full_name,
					storePlan: data?.user_plan,
					kycStatus: data?.kyc_status,
				};

				dispatch({
					type: types.FETCH_SINGLE_STORE_PRODUCT.SUCCESS,
					payload,
				});
				successCallback?.(res?.data);
			},
			(err) => {
				dispatch({
					type: types.FETCH_SINGLE_STORE_PRODUCT.FAILURE,
					payload: err,
				});
				showToast(err?.message, 'error');
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

export const SetProductDefault = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) =>
		dispatch({
			type: types.SET_PRODUCT_DEFAULT.REQUEST,
			payload: {},
		});
};
