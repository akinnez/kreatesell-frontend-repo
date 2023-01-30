import * as types from '../types';

const initialState = {
	isMobileSideBarOpen: false,
};

const mobileSideBarReducer = (state = initialState, {type}) => {
	switch (type) {
		case types.OPEN_SIDEBAR:
			return {...state, isMobileSideBarOpen: true};
		case types.CLOSE_SIDEBAR:
			return {
				...state,
				isMobileSideBarOpen: false,
			};
		case types.TOGGLE_SIDEBAR:
			return {
				...state,
				isMobileSideBarOpen: !state.isMobileSideBarOpen,
			};
		default:
			return state;
	}
};

export default mobileSideBarReducer;
