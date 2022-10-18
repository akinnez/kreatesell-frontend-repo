import * as types from '../types';

const UNSUBSCRIBE_FROM_PLAN_STATE = {
	unsubscribe_loading: false,
	unsubscribe_success: false,
	unsubscribe_error: false,
};

const initialState = {
	loading: false,
	error: {},
	response: {},
	...UNSUBSCRIBE_FROM_PLAN_STATE,
};

const PlanUpgradeReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case types.MAKE_PLAN_UPGRADE.REQUEST:
			return {...state, loading: true};

		case types.UNSUBSCRIBE_FROM_PLAN.REQUEST:
			return {...state, unsubscribe_loading: true};

		case types.MAKE_PLAN_UPGRADE.SUCCESS:
			return {...state, loading: false, response: payload};

		case types.UNSUBSCRIBE_FROM_PLAN.SUCCESS:
			return {...state, unsubscribe_loading: false};

		case types.MAKE_PLAN_UPGRADE.FAILURE:
			return {...state, loading: false, error: payload};

		case types.MAKE_PLAN_UPGRADE.FAILURE:
			return {
				...state,
				unsubscribe_loading: false,
				unsubscribe_error: payload,
			};

		default:
			return state;
	}
};

export default PlanUpgradeReducer;
