import { useState, useEffect } from "react";
import axiosAPI from "utils/axios";

const useProductOverview = id => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axiosAPI.request(
        "get",
        `${process.env.BASE_URL}affiliate/get-products-by-id/${id}`,
        res => {
          setData(res.data);
        },
        err => {
          setError(err.message);
        }
      );
    }
  }, [id]);

  return { data, error };
};

export default useProductOverview;
