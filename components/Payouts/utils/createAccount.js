import { updateStore } from "redux/actions";
import { showToast } from "utils";
import axiosApi from "utils/axios";

const createAccount = ({
  data,
  hideModal,
  showSuccessModal,
  dispatchObj,
  dispatch,
}) => {
  axiosApi.request(
    "post",
    `${process.env.BASE_URL}v1/kreatesell/payment/bank-details`,
    res => {
      dispatch(updateStore(dispatchObj));
      hideModal();
      showSuccessModal ? showSuccessModal() : showToast(res.message, "success");
    },
    err => {
      showToast(err.message, "error");
      hide();
    },
    data
  );
};

export default createAccount;
