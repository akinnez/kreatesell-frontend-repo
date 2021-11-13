import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";

export const GetNotifications = () => {
	const dispatch = useDispatch();
	return (kreatorId, successCallback, errorCallback) => (
		dispatch({ type: types.GET_NOTIFICATIONS.REQUEST }),
		axios.request(
			`get`,
			`notification/getkreator/sales/${kreatorId}`,
			(res) => {
				const notifications = res?.data?.sort((a, b) =>
					Date.parse(a?.action_time) < Date.parse(b?.action_time) ? 1 : -1
				);

				const payload = {
					notifications,
				};

				dispatch({ type: types.GET_NOTIFICATIONS.SUCCESS, payload });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.GET_NOTIFICATIONS.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};

export const ReadNotifications = () => {
	const dispatch = useDispatch();
	return (id, successCallback, errorCallback) => (
		dispatch({ type: types.READ_NOTIFICATIONS.REQUEST }),
		axios.request(
			`post`,
			`notification/getkreator/sales/?id=${id}`,
			(res) => {
				dispatch({ type: types.READ_NOTIFICATIONS.SUCCESS, payload: res });
				successCallback?.();
			},
			(err) => {
				dispatch({ type: types.READ_NOTIFICATIONS.FAILURE, payload: err });
				errorCallback?.();
			}
		)
	);
};
