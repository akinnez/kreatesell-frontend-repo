import { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import AuthLayout from "components/authlayout";
import BecomeAnAffiliate from "components/affiliateProducts/components/BecomeAnAffiliate";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
import Spinner from "components/Spinner";
import productsColumns from "components/affiliateProducts/productsColumns";
import {
  affiliateProductsFailure,
  affiliateProductsRequest,
  affiliateProductsSuccess,
} from "redux/actions/affiliate.actions";
import { showToast, isAnEmpytyObject } from "utils";
import axiosApi from "utils/axios";
import normalize from "utils/normalize";
import styles from "public/css/AffiliateProducts.module.scss";

const rowKey = record => record.id;

const AffiliateProducts = () => {
  const [filtered, setFiltered] = useState(null);

  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector(state => state.auth);
  const { productTypes } = useSelector(state => state.product);
  const { products } = useSelector(state => state.affiliate);
  const { loading: storeLoading } = useSelector(state => state.store);

  const { data } = useSWR(
    () => {
      return user.is_affiliate
        ? `${process.env.BASE_URL}affiliate/get-products`
        : null;
    },
    url => {
      dispatch(affiliateProductsRequest());
      return axiosApi.request(
        "get",
        url,
        res => {
          dispatch(affiliateProductsSuccess(res.data));
          return res;
        },
        err => {
          showToast(err, "error");
          dispatch(affiliateProductsFailure());
        }
      );
    }
  );

  const userIsEmpty = isAnEmpytyObject(user);
  const types = normalize(productTypes, "id");
  const columns = productsColumns(types);

  if (storeLoading || userLoading || userIsEmpty) {
    return (
      <AuthLayout>
        <Head>
          <title>KreateSell | Affiliate Products</title>
        </Head>
        <Spinner />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Affiliate Market Place</title>
      </Head>
      {!user.is_affiliate ? (
        <BecomeAnAffiliate />
      ) : (
        <>
          <AffiliateFilters data={products} setFiltered={setFiltered} />
          <section className={styles.tableWrapper}>
            <Table
              dataSource={filtered || products}
              columns={columns}
              pagination={{
                position: ["bottomLeft", "topRight"],
                showSizeChanger: false,
                defaultPageSize: 5,
                responsive: true,
              }}
              rowKey={rowKey}
              loading={!data}
            />
          </section>
        </>
      )}
    </AuthLayout>
  );
};

export default AffiliateProducts;
