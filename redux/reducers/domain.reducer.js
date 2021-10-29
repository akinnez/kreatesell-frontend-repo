import * as types from "../types";

const initialState = {
	loading: false,
	domains: [],
	domainScreen: 1,
	error: {},
};

const DomainReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_DOMAINS.REQUEST:
		case types.CREATE_DOMAIN.REQUEST:
		case types.DELETE_DOMAIN.REQUEST:
			return { ...state, loading: true };

		case types.GET_DOMAINS.SUCCESS:
			return { ...state, loading: false, domains: payload };

		case types.CREATE_DOMAIN.SUCCESS:
		case types.DELETE_DOMAIN.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.SET_DOMAIN_SCREEN.REQUEST:
			return { ...state, domainScreen: payload };

		case types.GET_DOMAINS.FAILURE:
		case types.CREATE_DOMAIN.FAILURE:
		case types.DELETE_DOMAIN.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default DomainReducer;
