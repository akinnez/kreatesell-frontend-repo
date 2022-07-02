import { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Button, Table, Pagination, Spin } from "antd";
import AsyncDataToCSV from "components/DataToCSV/AsyncDataToCSV";
import PaginationSizeChanger from "components/PaginationSizeChanger";
import PayoutsFilters from "../Filters/PayoutsFilters";
import PayoutsMobileView from "../PayoutsMobileView";
import { payoutsColumns } from "../../columns/payoutsColumns";
import { payoutsHeaders } from "../../utils/payoutsHeaders";
import useFilters from "../../useFilters";
import axiosApi from "utils/axios";
import { showToast } from "utils";
import styles from "./index.module.scss";

const { Title, Text } = Typography;
const rowKey = record => record.id;

const Payouts = ({ bankDetails, handleClick }) => {
  const [loading, setLoading] = useState(false);
  const [payouts, setPayouts] = useState({ data: [], total: 0 });

  const { url, filters, setFilters } = useFilters(
    "v1/kreatesell/store/payouts"
  );

  useEffect(() => {
    if (bankDetails) {
      setLoading(true);

      axiosApi.request(
        "get",
        url,
        res => {
          setLoading(false);
          setPayouts(s => ({
            ...s,
            data: res.data.data,
            total: res.data.total_records,
          }));
        },
        () => {
          setLoading(false);
          showToast(
            "An error has occurred and we cant fetch your payouts right now. Please try again later",
            "error"
          );
        }
      );
    }
  }, [bankDetails, url]);

  const handlePageChange = page => {
    setFilters({ ...filters, page });
  };

  return (
    <>
      <header className={styles.header}>
        <Title level={2}>Payouts</Title>
        <Button type="primary" size="large" onClick={() => handleClick("2")}>
          Payout Setting
        </Button>
      </header>
      <section>
        <PayoutsFilters setFilters={setFilters} />
      </section>
      <section className={styles.download}>
        <AsyncDataToCSV
          url={`${process.env.BASE_URL}v1/kreatesell/store/payouts?Page=1&Limit=0`}
          headers={payoutsHeaders}
          filename="payouts"
        />
      </section>
      <Spin spinning={loading}>
        <section>
          <PaginationSizeChanger
            dataSize={payouts.total}
            filters={filters}
            setFilters={setFilters}
          />
        </section>
        <section className={styles.data__section}>
          <PayoutsMobileView payouts={payouts.data} />
          <div className={styles.table__wrapper}>
            <Table
              dataSource={payouts.data}
              columns={payoutsColumns}
              pagination={false}
              rowKey={rowKey}
            />
          </div>
        </section>
        {payouts.data.length > 0 && (
          <section>
            <Pagination
              pageSize={filters.limit}
              current={filters.page}
              total={payouts.total}
              responsive={true}
              onChange={handlePageChange}
            />
          </section>
        )}
      </Spin>
      {!bankDetails && (
        <section className={styles["payout__set-up"]}>
          <p>
            <Text>
              To start receiving money from your sales ensure you setup your
              bank details
            </Text>
          </p>
          <Link href="/account/sales/payouts/set-up-bank-details">
            <a>Set Up Bank Details</a>
          </Link>
        </section>
      )}
    </>
  );
};

export default Payouts;
