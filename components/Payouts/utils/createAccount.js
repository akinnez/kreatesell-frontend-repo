import { showToast } from "utils";
import axiosApi from "utils/axios";

const createAccount = (data, hide, success) => {
  axiosApi.request(
    "post",
    `${process.env.BASE_URL}v1/kreatesell/payment/bank-details`,
    res => {
      hide();
      success ? success() : showToast(res.message, "success");
    },
    err => {
      showToast(err.message, "error");
      hide();
    },
    data
  );
};

export default createAccount;
