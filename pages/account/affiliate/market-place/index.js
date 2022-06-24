import { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { Table } from "antd";
import AuthLayout from "components/authlayout";
import BecomeAnAffiliate from "components/affiliateProducts/components/BecomeAnAffiliate";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
import Spinner from "components/Spinner";
import PaginationHelper from "components/PaginationHelpers";
import KreatorDashboard from "components/account-dashboard/KreatorDashboard";
import productsColumns from "components/affiliateProducts/productsColumns";
import useFilters from "hooks/useFilters";
import { showToast, isAnEmpytyObject } from "utils";
import axiosApi from "utils/axios";
import styles from "public/css/AffiliateProducts.module.scss";

const rowKey = record => record.id;

const AffiliateProducts = () => {
  const [products, setProducts] = useState({ data: [], total: 0 });

  const { user, loading: userLoading } = useSelector(state => state.auth);
  const { loading: storeLoading } = useSelector(state => state.store);

  const { uri, filters, setFilters } = useFilters("affiliate/get-products");

  const { data: res, error } = useSWR(
    () => (user.is_affiliate && uri ? uri : null),
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

  const userIsEmpty = isAnEmpytyObject(user);

  const handlePageChange = page => {
    setQueries({ ...queries, page });
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
          <AffiliateFilters setFilters={setFilters} />
          <PaginationHelper
            dataSize={products.total}
            filters={filters}
            setFilters={setFilters}
          />
          <section className={styles.tableWrapper}>
            <Table
              dataSource={products.data}
              columns={productsColumns}
              pagination={{
                position: ["bottomLeft"],
                pageSize: filters.limit,
                current: filters.page,
                total: products.total,
                responsive: true,
                onChange: handlePageChange,
              }}
              rowKey={rowKey}
              loading={!res && !error}
            />
          </section>
        </>
      )}
    </AuthLayout>
  );
};

export default AffiliateProducts;
