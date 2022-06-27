import Head from "next/head";
import { useSelector } from "react-redux";
import { Typography, Table } from "antd";
import AuthLayout from "components/authlayout";
import PaginationHelper from "components/PaginationHelpers";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
import requestsColumns from "components/affiliateRequests/requestsColumns";
import useAffiliateFilters from "components/affiliates/hooks/useAffiliateFilters";
import useFetcher from "components/affiliates/hooks/useFetcher";
import styles from "public/css/AffiliateRequests.module.scss";

const { Text } = Typography;
const rowKey = record => record.id;

const AffiliateRequests = () => {
  const { user } = useSelector(state => state.auth);

  const { url, filters, setFilters } = useAffiliateFilters(
    "affiliate/get-requested-products"
  );

  const [requests, response, error] = useFetcher(user, url);

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
      <AffiliateFilters setFilters={setFilters} />
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
          loading={!response && !error}
        />
      </section>
    </AuthLayout>
  );
};

export default AffiliateRequests;
