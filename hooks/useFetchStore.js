import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStore, getStoreFailure, getStoreRequest } from "redux/actions";
import axiosApi from "utils/axios";

const useFetchStore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreRequest());

    axiosApi.request(
      "get",
      `${process.env.BASE_URL}v1/kreatesell/store/me`,
      res => {
        dispatch(getStore(res.data));
      },
      () => {
        dispatch(getStoreFailure());
      }
    );
  }, [dispatch]);
};

export default useFetchStore;
