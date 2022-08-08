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

export const isAnEmpytyObject = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const generateActions = action => {
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

  const errorMessagePosition = {
    position: "top-center",
  };
  switch (type) {
    case "success":
      cogoToast.success(message, errorMessagePosition);
      break;
    case "info":
      cogoToast.info(message, errorMessagePosition);
      break;
    case "loading":
      cogoToast.loading(message, errorMessagePosition);
      break;
    case "warn":
      cogoToast.warn(message, errorMessagePosition);
      break;
    case "error":
      cogoToast.error(message, errorMessagePosition);
      break;

    default:
      cogoToast.info(message, errorMessagePosition);
      break;
  }
};

export const _validateEmail = email => {
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

export function transformToFormData(data, exempt) {
  let formData = new FormData();
  for (let key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((obj, index) => {
        let keyList = Object.keys(obj);
        keyList.forEach(keyItem => {
          let keyName = [key, "[", index, "]", ".", keyItem].join("");
          formData.append(keyName, obj[keyItem]);
        });
      });
    } else if (key !== exempt && typeof data[key] === "object") {
      for (let innerKey in data[key]) {
        formData.append(`${key}.${innerKey}`, data[key][innerKey]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
}

export const _formatURL = url => url.replace(/(^\w+:|^)\/\//, "");

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

export const notificationTime = timeValue => {
  if (!timeValue) return "";

  const parseServerTime = Date.parse(timeValue);

  const secs = (Date.now() - parseServerTime) / 1000;
  const mins = Math.round(secs / 60);
  const hrs = Math.round(mins / 60);
  const days = Math.round(hrs / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(weeks / 4);
  const years = Math.round(months / 12);

  if (mins <= 59) return `${mins} minutes ago`;
  if (hrs === 1) return "An hour ago";
  if (hrs <= 24) return `${hrs} hours ago`;
  if (days === 1) return "A day ago";
  if (days <= 7) return `${days} days ago`;
  if (weeks === 1) return "A week ago";
  if (weeks <= 3) return `${weeks} weeks ago`;
  if (months === 1) return "A month ago";
  if (months <= 11) return `${months} months ago`;
  if (years === 1) return "A year ago";
  return `${years} years ago`;
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
  try {
    const decodedToken = jwt_decode(getUserToken());

    if (process.browser) {
      const tokenExpired = decodedToken.exp < new Date().getTime() / 1000;

      if (tokenExpired) {
        showToast("Your Login Session Have Expired", "info");
        _clearData({ pushToLogin: true });
        localStorage.removeItem("token");
      }
    }
  } catch (error) {
    console.log("err", error);
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

export const downloadFile = url => {
  const name1 = new Date().toISOString();
  const name2 = Math.random().toString(35);
  axios({
    url: url,
    method: "GET",
    responseType: "blob", // important
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name1}w${name2}.jpg`);
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => console.log(err));
};
export const downloadMultiFiles = files => {
  // files must be an array of images
  for (let i of files) {
    if (typeof window !== "undefined") {
      downloadFile(i);
    }
  }
};

export const currencyOptions = [
  { value: "NGN", label: "NGN" },
  { label: "GHS", value: "GHS" },
  { value: "KES", label: "KES" },
  { value: "ZAR", label: "ZAR" },
  { value: "TZS", label: "TZS" },
  { value: "UGX", label: "UGX" },
  { value: "USD", label: "USD" },
  { value: "GBP", label: "GBP" },
];

export const Animate = (
  animationType,
  delay = 1000,
  transition = "ease-in"
  // duration = 1500
) => {
  const animationObj = {
    "data-aos": animationType,
    "data-aos-delay": delay,
    "data-aos-easing": transition,
    "data-aos-duration": 1000,
  };
  return animationObj;
};

// shorten long details
export const shortenDetail = (item, id, maximumAllowedLength, cutVal) => {
  if (item) {
    return item[`${id}`] !== null && item[`${id}`].length > maximumAllowedLength
      ? `${item[`${id}`].slice(0, cutVal)}...`
      : item[`${id}`];
  }

  // when id isn't a part of an object.

  return id !== null && id?.length > maximumAllowedLength
    ? `${id.slice(0, cutVal)}...`
    : id;
};
