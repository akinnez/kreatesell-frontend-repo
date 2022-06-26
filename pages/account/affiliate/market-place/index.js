import Head from "next/head";
import { useSelector } from "react-redux";
import { Table } from "antd";
import AuthLayout from "components/authlayout";
import BecomeAnAffiliate from "components/affiliateProducts/components/BecomeAnAffiliate";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
import PaginationSizeChanger from "components/PaginationHelpers/PaginationSizeChanger";
import KreatorDashboard from "components/account-dashboard/KreatorDashboard";
import productsColumns from "components/affiliateProducts/productsColumns";
import useAffiliateFilters from "components/affiliates/hooks/useAffiliateFilters";
import useFetcher from "components/affiliates/hooks/useFetcher";
import styles from "public/css/AffiliateProducts.module.scss";

const rowKey = record => record.id;

const AffiliateProducts = () => {
  const { user } = useSelector(state => state.auth);

  const { url, filters, setFilters } = useAffiliateFilters(
    "affiliate/get-products"
  );

  const [products, response, error] = useFetcher(user, url);

  const handlePageChange = page => {
    setFilters({ ...filters, page });
  };

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
          <PaginationSizeChanger
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
              loading={!response && !error}
            />
          </section>
        </>
      )}
    </AuthLayout>
  );
};

export default AffiliateProducts;
