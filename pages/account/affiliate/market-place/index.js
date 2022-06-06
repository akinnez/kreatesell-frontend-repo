import { useState, useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import AuthLayout from "components/authlayout";
import BecomeAnAffiliate from "components/affiliateProducts/components/BecomeAnAffiliate";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
import Spinner from "components/Spinner";
import KreatorDashboard from "components/account-dashboard/KreatorDashboard";
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
  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector(state => state.auth);
  const { productTypes } = useSelector(state => state.product);
  const { products, totalProducts } = useSelector(state => state.affiliate);
  const { loading: storeLoading } = useSelector(state => state.store);

  const [uri, setUri] = useState("");
  const [queries, setQueries] = useState({
    page: 1,
    dateListed: "",
    productName: "",
    productType: null,
    kreatorName: "",
  });

  useEffect(() => {
    const url = new URL(
      `${process.env.BASE_URL}affiliate/get-products?Page=${queries.page}&Limit=8`
    );

    if (queries.dateListed) {
      url.searchParams.set("Launch_Date", queries.dateListed);
    }

    if (queries.kreatorName) {
      url.searchParams.set("Kreator_Name", queries.kreatorName);
    }

    if (queries.productName) {
      url.searchParams.set("Product_Name", queries.productName);
    }

    if (queries.productType) {
      url.searchParams.set("Product_Type", queries.productType);
    }

    setUri(url);
  }, [
    queries.page,
    queries.dateListed,
    queries.kreatorName,
    queries.productName,
    queries.productType,
  ]);

  const { data } = useSWR(
    () => (user.is_affiliate && uri ? uri : null),
    url => {
      dispatch(affiliateProductsRequest());
      return axiosApi.request(
        "get",
        url,
        res => {
          const obj = {
            products: res.data.data,
            totalProducts: res.data.total_records,
          };

          dispatch(affiliateProductsSuccess(obj));
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

  const handlePageChange = newPage => {
    setQueries({ ...queries, page: newPage });
  };

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
    <AuthLayout headerTitle={!user.is_affiliate ? "Dashboard" : ""}>
      <Head>
        <title>KreateSell | Affiliate Market Place</title>
      </Head>
      {!user.is_affiliate ? (
        <>
          <KreatorDashboard />
          <BecomeAnAffiliate />
        </>
      ) : (
        <>
          <AffiliateFilters setQueries={setQueries} />
          <section className={styles.tableWrapper}>
            <Table
              dataSource={products}
              columns={columns}
              pagination={{
                position: ["bottomLeft", "topRight"],
                showSizeChanger: false,
                pageSize: 8,
                total: totalProducts,
                responsive: true,
                onChange: handlePageChange,
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
