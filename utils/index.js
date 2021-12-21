import cogoToast from "cogo-toast";
import jwt_decode from "jwt-decode";
import axios from "axios";
export const pathName = typeof window !== "undefined" && window;

export const _clearData = ({ pushToLogin = true }) => {
  pathName && localStorage.clear();
  pathName && sessionStorage.clear();
  if (pushToLogin) {
    window.location.href = "/login";
  }
  return false;
};

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

// export const getToken = () => localStorage.getItem("token");

export const getToken = () => {
  const token = pathName.localStorage.getItem("token");

  if (!token) return false;
  if (token) {
    const decodedToken = jwt_decode(token);
    const tokenExpired = decodedToken.exp * 1000 === new Date().valueOf();
    if (tokenExpired) {
      _clearData({ pushToLogin: true });
    }
  }
  return token;
};

export const getUser = () => {
  const user = pathName.localStorage?.getItem("user");
  return pathName.JSON?.parse(user);
};

export const _getMyStoreDetails = () => {
  const store_details = pathName.localStorage?.getItem("store_details");
  return pathName.JSON?.parse(store_details);
};

export const _isUserLoggedIn = () => {
  const user = getUser();
  if (!isAnEmpytyObject(user) && getToken()) return true;
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

export const _formatURL = (url) => url.replace(/(^\w+:|^)\/\//, "");

export const _prependHttp = ({ url, https = true }) => {
  if (typeof url !== "string") {
    throw new TypeError(
      `Expected \`url\` to be of type \`string\`, got \`${typeof url}\``
    );
  }

  url = url.trim();

  if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
    return url;
  }

  return url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? "https://" : "http://");
};

export const _prependKreateSell = ({ url, https = true }) => {
  if (typeof url !== "string") {
    throw new TypeError(
      `Expected \`url\` to be of type \`string\`, got \`${typeof url}\``
    );
  }

  url = url.trim();

  if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
    return url;
  }

  return url.replace(/^(?!(?:\w+?:)?\/\/)/, "Kreatesell.com/");
};

export const _timeToMomentAgo = (timeValue) => {
  const parseServerTime = Date.parse(timeValue);

  const secs = (Date.now() - parseServerTime) / 1000;
  const mins = Math.round(secs / 60);
  const hrs = Math.round(mins / 60);
  const days = Math.round(hrs / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(weeks / 4);
  const years = Math.round(months / 12);

  if (mins <= 59) return `(${mins} minutes ago)`;
  if (hrs === 1) return "(An hour ago)";
  if (hrs <= 24) return `(${hrs} hours ago)`;
  if (days === 1) return "(A day ago)";
  if (days <= 7) return `(${days} days ago)`;
  if (weeks === 1) return "(A week ago)";
  if (weeks <= 3) return `(${weeks} weeks ago)`;
  if (months === 1) return "(A month ago)";
  if (months <= 11) return `(A ${months} months ago)`;
  if (years === 1) return "(A year ago)";
  return `(${years} years ago)`;
};

export * from "./assets";

export const getUserToken = () => {
  if (typeof window === "object") {
    const token = localStorage.getItem("token");

    if (!token) return null;
    return token;
  }
};

export const checkExpiredUserToken = () => {
  const decodedToken = jwt_decode(getUserToken());

  const tokenExpired = decodedToken.exp < new Date().getTime() / 1000;
  if (tokenExpired) {
    showToast("Login required to view page", "info");
    _clearData({ pushToLogin: true });
  }
};

export const getWindowWidth = () => {
  if (typeof window === "object") {
    return window.innerWidth;
  }
};

export const setAuthorizationHeader = () => {
  const token = getUserToken();

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
