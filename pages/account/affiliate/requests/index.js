import { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { Typography, Table } from "antd";
import AuthLayout from "components/authlayout";
import PaginationHelper from "components/PaginationHelpers";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
import requestsColumns from "components/affiliateRequests/requestsColumns";
import useFilters from "hooks/useFilters";
import { showToast } from "utils";
import axiosApi from "utils/axios";
import styles from "public/css/AffiliateRequests.module.scss";

const { Text } = Typography;
const rowKey = record => record.id;

const AffiliateRequests = () => {
  const [requests, setRequests] = useState({ data: [], total: 0 });

  const { user } = useSelector(state => state.auth);

  const { uri, filters, setFilters } = useFilters(
    "affiliate/get-requested-products"
  );

  const { data: res, error } = useSWR(
    () => (user.is_affiliate && uri ? uri : null),
    url => {
      return axiosApi.request(
        "get",
        url,
        res => {
          setRequests({
            ...requests,
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

  const handlePage = page => {
    setFilters({ ...filters, page });
  };

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Affiliate Requests</title>
      </Head>

      <header className={styles.header}>
        <Text type="secondary" strong>
          Affiliate Offers
        </Text>
      </header>
      <AffiliateFilters setQueries={setFilters} />
      <PaginationHelper
        dataSize={requests.total}
        filters={filters}
        setFilters={setFilters}
      />
      <section className={styles.tableWrapper}>
        <Table
          dataSource={requests.data}
          columns={requestsColumns}
          pagination={{
            position: ["bottomLeft"],
            pageSize: filters.limit,
            current: filters.page,
            total: requests.total,
            responsive: true,
            onChange: handlePage,
          }}
          rowKey={rowKey}
          loading={!res && !error}
        />
      </section>
    </AuthLayout>
  );
};

export default AffiliateRequests;
