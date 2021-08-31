import cogoToast from "cogo-toast";

export const pathName = typeof window !== "undefined" && window;

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

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
	const user = pathName.localStorage?.getItem("user");
	return pathName.JSON?.parse(user);
};

export const _isUserLoggedIn = () => {
	const user = getUser();
	if (!isAnEmpytyObject(user)) return true;
	return false;
};

export const showToast = (message, type) => {
	if (type) type = type.toLowerCase();

	switch (type) {
		case "success":
			cogoToast.success(message, { position: "top-right" });
			break;
		case "info":
			cogoToast.info(message, { position: "top-right" });
			break;
		case "loading":
			cogoToast.loading(message, { position: "top-right" });
			break;
		case "warn":
			cogoToast.warn(message, { position: "top-right" });
			break;
		case "error":
			cogoToast.error(message, { position: "top-right" });
			break;

		default:
			cogoToast.info(message, { position: "top-right" });
			break;
	}
};

export const _validateEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

export const _copyToClipboard = (str, message) => {
	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
	showToast(message || "Copied", "info");
};

export * from "./assets";
