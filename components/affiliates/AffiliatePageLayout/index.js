import { Pagination, Spin, Table } from "antd";
import PaginationSizeChanger from "components/PaginationHelpers/PaginationSizeChanger";
import AffiliateFilters from "../AffiliateFilters";
import MobileDataRenderer from "../MobileDataRenderer";
import styles from "./index.module.scss";

const rowKey = record => record.id;

const AffiliatePageLayout = ({
  products,
  isLoading,
  setLoading,
  title,
  totalSales,
  filters,
  setFilters,
  component: Component,
  columns,
  statusKey,
  productKey,
}) => {
  const handlePageChange = page => {
    setFilters({ ...filters, page });
  };

  return (
    <>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>
      <AffiliateFilters setFilters={setFilters} setLoading={setLoading} />
      <div className={styles["sales-stat"]}>
        Affiliate&apos;s Number of Sales: <span>{totalSales}</span>
      </div>
      <Spin spinning={isLoading}>
        <PaginationSizeChanger
          dataSize={products.total}
          filters={filters}
          setFilters={setFilters}
        />
        <section className={styles.data__section}>
          <MobileDataRenderer
            productKey={productKey}
            statusKey={statusKey}
            products={products.data}
            component={Component}
          />
          <div className={styles.table__wrapper}>
            <Table
              dataSource={products.data}
              columns={columns}
              pagination={false}
              rowKey={rowKey}
            />
          </div>
        </section>
        <section>
          {products.data.length > 0 && (
            <Pagination
              pageSize={filters.limit}
              current={filters.page}
              total={products.total}
              responsive={true}
              onChange={handlePageChange}
            />
          )}
        </section>
      </Spin>
    </>
  );
};

export default AffiliatePageLayout;
