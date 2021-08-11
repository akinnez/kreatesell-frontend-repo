export * from "./assets";

export const isAnEmpytyObject = (obj) => {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
};

export const generateActions = (action) => {
	action = action.toUpperCase();
	return {
		REQUEST: `${action}_REQUEST`,
		SUCCESS: `${action}_SUCCESS`,
		FAILURE: `${action}_FAILURE`,
	};
};

export const getToken = () => {};
