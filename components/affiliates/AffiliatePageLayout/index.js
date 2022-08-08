import { Pagination, Spin, Table } from "antd";
import PaginationSizeChanger from "components/PaginationSizeChanger";
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
  showStatus = false,
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
      <Spin spinning={isLoading} wrapperClassName={styles.spin__wrapper}>
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
            showStatus={showStatus}
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
        {products.data.length > 0 && (
          <section>
            <Pagination
              pageSize={filters.limit}
              current={filters.page}
              total={products.total}
              responsive={true}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </section>
        )}
      </Spin>
    </>
  );
};

export default AffiliatePageLayout;
