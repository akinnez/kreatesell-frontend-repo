import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils";

export const GetDomains = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_DOMAINS.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/store/get-domain-details`,
			(res) => {
				dispatch({
					type: types.GET_DOMAINS.SUCCESS,
					payload: res?.data?.domain_details,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_DOMAINS.FAILURE, payload: err });
				showToast(err?.message, "error");
				errorCallback?.();
			}
		)
	);
};

export const CreateEditDomain = () => {
	const dispatch = useDispatch();
	return (data, successCallback, errorCallback) => (
		dispatch({ type: types.CREATE_DOMAIN.REQUEST }),
		axios.request(
			`post`,
			`v1/kreatesell/store/update-domain-link`,
			(res) => {
				showToast(res?.message, "info");
				dispatch({
					type: types.CREATE_DOMAIN.SUCCESS,
					payload: res?.data,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.CREATE_DOMAIN.FAILURE, payload: err });
				showToast(err?.message, "error");
				errorCallback?.();
			},
			data
		)
	);
};

export const DeleteDomain = () => {
	const dispatch = useDispatch();
	return (id, successCallback, errorCallback) => (
		dispatch({ type: types.DELETE_DOMAIN.REQUEST }),
		axios.request(
			`delete`,
			`v1/kreatesell/store/delete-domain-details/${id}`,
			(res) => {
				showToast(res?.message, "info");
				dispatch({
					type: types.DELETE_DOMAIN.SUCCESS,
					payload: res?.data,
				});
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.DELETE_DOMAIN.FAILURE, payload: err });
				showToast(err?.message, "error");
				errorCallback?.();
			}
		)
	);
};

export const SetDomainScreen = () => {
	const dispatch = useDispatch();
	return (domainScreen, successCallback, errorCallback) =>
		dispatch({
			type: types.SET_DOMAIN_SCREEN.REQUEST,
			payload: domainScreen,
		});
};
