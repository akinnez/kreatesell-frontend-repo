import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStore, getStoreFailure, getStoreRequest } from "redux/actions";
import { isAnEmpytyObject } from "utils";
import axiosApi from "utils/axios";

const useFetchStore = () => {
  const { store } = useSelector(state => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAnEmpytyObject(store)) {
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
    }
  }, [dispatch, store]);
};

export default useFetchStore;
