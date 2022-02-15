import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "antd";
import AuthLayout from "components/authlayout";
import BecomeAnAffiliate from "components/affiliateProducts/BecomeAnAffiliate";
import AffiliateProductsFilters from "components/affiliateProducts/AffiliateProductsFilters";
import Spinner from "components/Spinner";
import { isAnEmpytyObject, showToast } from "utils";
import {
  affiliateProductsFailure,
  affiliateProductsRequest,
  affiliateProductsSuccess,
} from "redux/actions/affiliate.actions";
import axiosApi from "utils/axios";
import styles from "public/css/AffiliateProducts.module.scss";

const { Text } = Typography;

const AffiliateProducts = () => {
  const [filtered, setFiltered] = useState(null);
  const { user, loading: userLoading } = useSelector(state => state.auth);
  const { products, loading: productsLoading } = useSelector(
    state => state.affiliate
  );
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const userIsEmpty = isAnEmpytyObject(user);

  useEffect(() => {
    if (user.is_affiliate) {
      dispatch(affiliateProductsRequest());

      axiosApi.request(
        "get",
        `${process.env.BASE_URL}affiliate/get-products`,
        res => {
          dispatch(affiliateProductsSuccess(res.data));
        },
        err => {
          showToast(err, "error");
          dispatch(affiliateProductsFailure());
        }
      );
    }
  }, [dispatch, user.is_affiliate]);

  if (userLoading || userIsEmpty) {
    return (
      <AuthLayout>
        <Spinner />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Affiliate Products</title>
      </Head>
      {!user.is_affiliate ? (
        <BecomeAnAffiliate />
      ) : (
        <>
          <header className={styles.header}>
            <Text>Market Place</Text>
          </header>
          <AffiliateProductsFilters data={products} setFiltered={setFiltered} />
        </>
      )}
    </AuthLayout>
  );
};

export default AffiliateProducts;
