import { showToast } from "utils";
import axiosApi from "utils/axios";

const walletFetcher = (url, msg) => {
  return axiosApi.request(
    "get",
    url,
    res => res.data,
    () => showToast(msg, "error")
  );
};

export default walletFetcher;
