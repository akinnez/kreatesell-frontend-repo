import { useState } from "react";
import useSWR from "swr";
import { showToast } from "utils";
import axiosApi from "utils/axios";

const useFetcher = (user, url) => {
  const [products, setProducts] = useState({ data: [], total: 0 });

  const { data, error } = useSWR(
    () => (user.is_affiliate ? url.href : null),
    url => {
      return axiosApi.request(
        "get",
        url,
        res => {
          setProducts({
            ...products,
            data: res.data.data,
            total: res.data.total_records,
          });
          return res;
        },
        err => {
          showToast(err.message, "error");
          return err;
        }
      );
    }
  );

  return [products, data, error];
};

export default useFetcher;
