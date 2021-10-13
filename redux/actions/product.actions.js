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

export const GetProducts = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.GET_ALL_PRODUCTS.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/product/fetch/all`,
			(res) => {
				dispatch({ type: types.GET_ALL_PRODUCTS.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_ALL_PRODUCTS.FAILURE, payload: err });
				errorCallback?.();
			},
			data
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
