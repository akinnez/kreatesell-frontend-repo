import * as types from '../types';

export const openMobileSideBar = () => ({
	type: types.OPEN_SIDEBAR,
});

export const closeMobileSidebar = () => ({
	type: types.CLOSE_SIDEBAR,
});

export const toggleSideBarView = () => ({
	type: types.TOGGLE_SIDEBAR,
});
