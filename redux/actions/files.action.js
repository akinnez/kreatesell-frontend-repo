import axios from "../../utils/axios";
import * as types from "../types";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils";
import * as APIS from "../../constants/Apis";

export const DeleteImage = () => {
  const dispatch = useDispatch();
  return (image_type, successCallback, errorCallback) => (
    dispatch({ type: types.DELETE_IMAGE.REQUEST }),
    axios.request(
      `PATCH`,
      APIS.PATCH.deleteImage,
      (res) => {
        const data = res?.data;
        // showToast(res?.message, "info");
        dispatch({ type: types.DELETE_IMAGE.SUCCESS });
        successCallback?.();
      },
      (err) => {
        dispatch({ type: types.DELETE_IMAGE.FAILURE, payload: err });
        errorCallback?.();
      },
      {
        image_type: image_type,
      }
    )
  );
};
