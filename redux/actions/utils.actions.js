import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";

export const GetCountries = () => {
	const dispatch = useDispatch();
	return (successCallback, errorCallback) => (
		dispatch({ type: types.GET_COUNTRIES.REQUEST }),
		axios.request(
			`get`,
			`v1/kreatesell/utils/get-countries`,
			(res) => {
				dispatch({
					type: types.GET_COUNTRIES.SUCCESS,
					payload: res?.data?.list_of_countries,
				});
				successCallback?.();
			},
			(err) => {
				console.log("GetCountries error --->", err);
				dispatch({ type: types.GET_COUNTRIES.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};
