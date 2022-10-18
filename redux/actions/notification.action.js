import * as types from '../types';

export const requestNotifications = () => ({
	type: types.GET_NOTIFICATIONS_REQUEST,
});

export const getNotifications = (notifications) => ({
	type: types.GET_NOTIFICATIONS_SUCCESS,
	payload: notifications,
});

export const notificationsFailure = (error) => ({
	type: types.GET_NOTIFICATIONS_FAILURE,
	payload: error,
});

export const updateNotifications = (notificationId) => ({
	type: types.UPDATE_NOTIFICATIONS,
	payload: notificationId,
});
