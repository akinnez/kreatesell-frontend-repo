import Head from "next/head";
import { useSelector } from "react-redux";
import { Spin, Table } from "antd";
import AuthLayout from "components/authlayout";
import KreatorDashboard from "components/account-dashboard/KreatorDashboard";
import PaginationSizeChanger from "components/PaginationHelpers/PaginationSizeChanger";
import DataPagination from "components/PaginationHelpers/Pagination";
import AffiliateFilters from "components/affiliates/AffiliateFilters";
import MobileDataRenderer from "components/affiliates/MobileDataRenderer";
import BecomeAnAffiliate from "components/affiliateProducts/components/BecomeAnAffiliate";
import RequestAccessLink from "components/affiliateProducts/components/RequestAccessLink";
import productsColumns from "components/affiliateProducts/productsColumns";
import useAffiliateFilters from "components/affiliates/hooks/useAffiliateFilters";
import useFetcher from "components/affiliates/hooks/useFetcher";
import { isAnEmpytyObject } from "utils";
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
      {isAnEmpytyObject(user) ? null : !user.is_affiliate ? (
        <>
          <KreatorDashboard />
          <BecomeAnAffiliate />
        </>
      ) : (
        <>
          <header className={styles.header}>
            <h2>Market Place</h2>
          </header>
          <AffiliateFilters setFilters={setFilters} />
          <div className={styles["sales-stat"]}>
            Affiliate&apos;s Number of Sales: <span>0</span>
          </div>
          <Spin spinning={!response && !error}>
            <PaginationSizeChanger
              dataSize={products.total}
              filters={filters}
              setFilters={setFilters}
            />
            <section className={styles.data__section}>
              <MobileDataRenderer
                dataKey="has_requested_access"
                products={products.data}
                component={RequestAccessLink}
              />
              <div className={styles.table__wrapper}>
                <Table
                  dataSource={products.data}
                  columns={productsColumns}
                  pagination={false}
                  rowKey={rowKey}
                />
              </div>
            </section>
            <section>
              {products.data.length > 0 && (
                <DataPagination
                  limit={filters.limit}
                  page={filters.page}
                  total={products.total}
                  onChange={handlePageChange}
                />
              )}
            </section>
          </Spin>
        </>
      )}
    </AuthLayout>
  );
};

export default AffiliateProducts;
