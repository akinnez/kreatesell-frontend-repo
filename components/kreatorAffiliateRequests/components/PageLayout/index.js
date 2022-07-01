import { Spin, Table } from "antd";
import DataPagination from "components/PaginationHelpers/Pagination";
import PaginationSizeChanger from "components/PaginationHelpers/PaginationSizeChanger";
import Filters from "../Filters";
import MobileView from "../MobileView";
import StatusButtons from "../StatusButtons";
import tableColumns from "components/kreatorAffiliateRequests/tableColumns";
import styles from "./index.module.scss";

const rowKey = record => record.id;

const PageLayout = ({
  requests,
  isLoading,
  setLoading,
  filters,
  setFilters,
  showReportModal,
  showActionModal,
  showNoteModal,
}) => {
  const handlePage = page => {
    setFilters({ ...filters, page });
  };

  const columns = tableColumns(showReportModal, showActionModal, showNoteModal);

  return (
    <>
      <header className={styles.header}>
        <h1>Affiliate Requests</h1>
      </header>
      <section>
        <Filters setFilters={setFilters} setLoading={setLoading} />
      </section>
      <Spin spinning={isLoading}>
        <PaginationSizeChanger
          dataSize={requests.total}
          filters={filters}
          setFilters={setFilters}
        />
        <StatusButtons
          setFilters={setFilters}
          filters={filters}
          setLoading={setLoading}
        />
        <section className={styles.data__section}>
          <MobileView
            requests={requests.data}
            showReportModal={showReportModal}
            showActionModal={showActionModal}
            showNoteModal={showNoteModal}
          />
          <div className={styles.table__wrapper}>
            <Table
              dataSource={requests.data}
              columns={columns}
              pagination={false}
              rowKey={rowKey}
            />
          </div>
        </section>
        <section>
          {requests.data.length > 0 && (
            <DataPagination
              limit={filters.limit}
              page={filters.page}
              total={requests.total}
              onChange={handlePage}
            />
          )}
        </section>
      </Spin>
    </>
  );
};

export default PageLayout;
