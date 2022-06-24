import { showToast } from "utils";
import axiosApi from "utils/axios";

const walletFetcher = (url, msg) => {
  return axiosApi.request(
    "get",
    url,
    res => res.data,
    err => {
      showToast(msg, "error");
      return err;
    }
  );
};

export default walletFetcher;
