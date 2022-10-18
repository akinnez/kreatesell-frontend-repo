import * as types from '../types';

const initialState = {
	loading: false,
	notifications: null,
	error: null,
};

const notificationReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case types.GET_NOTIFICATIONS_REQUEST:
			return {...state, loading: true};

		case types.GET_NOTIFICATIONS_SUCCESS:
			return {...state, loading: false, notifications: payload};

		case types.GET_NOTIFICATIONS_FAILURE:
			return {...state, loading: false, error: payload};

		case types.UPDATE_NOTIFICATIONS: {
			const newNotifications = state.notifications.map((notification) => {
				if (notification.id === payload) {
					return {...notification, is_read: true};
				}

				return notification;
			});

			return {...state, notifications: newNotifications};
		}

		default:
			return state;
	}
};

export default notificationReducer;
