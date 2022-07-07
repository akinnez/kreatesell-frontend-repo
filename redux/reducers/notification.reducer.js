import * as types from "../types";

const initialState = {
  loading: false,
  notifications: null,
  error: null,
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case types.GET_NOTIFICATIONS.REQUEST:
    // case types.READ_NOTIFICATIONS.REQUEST:
    //   return { ...state, loading: true };

    // case types.GET_NOTIFICATIONS.SUCCESS:
    // case types.READ_NOTIFICATIONS.SUCCESS:
    //   return { ...state, loading: false, ...payload };

    // case types.GET_NOTIFICATIONS.FAILURE:
    // case types.READ_NOTIFICATIONS.FAILURE:
    //   return { ...state, loading: false, error: payload };

    case types.GET_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };

    case types.GET_NOTIFICATIONS_SUCCESS:
      return { ...state, loading: false, notifications: payload };

    case types.GET_NOTIFICATIONS_FAILURE:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default notificationReducer;
