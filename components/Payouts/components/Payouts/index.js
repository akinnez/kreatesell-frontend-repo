import { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Button, Table } from "antd";
import AsyncDataToCSV from "components/DataToCSV/AsyncDataToCSV";
import PayoutsFilters from "../Filters/PayoutsFilters";
import { payoutsColumns } from "../../columns/payoutsColumns";
import { payoutsHeaders } from "components/Payouts/utils/payoutsHeaders";
import axiosApi from "utils/axios";
import { showToast } from "utils";
import styles from "./index.module.scss";

const { Title, Text } = Typography;
const rowKey = record => record.id;

const Payouts = ({ bankDetails, handleClick }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productName, setProductName] = useState("");
  const [payouts, setPayouts] = useState([]);
  const [totalPayouts, setTotalPayouts] = useState(0);

  let url = `${process.env.BASE_URL}v1/kreatesell/store/payouts?Page=${page}&Limit=${limit}`;

  if (startDate) {
    url = `${url}&StartDate=${startDate}`;
  }

  if (endDate) {
    url = `${url}&EndDate=${endDate}`;
  }

  if (productName) {
    url = `${url}&Product_Name=${productName}`;
  }

  useEffect(() => {
    if (bankDetails) {
      setLoading(true);

      axiosApi.request(
        "get",
        url,
        res => {
          setPayouts(res.data.data);
          setTotalPayouts(res.data.total_records);
          setLoading(false);
        },
        () => {
          showToast(
            "We cant fetch your payouts right now. Please try again later",
            "error"
          );
          setLoading(false);
        }
      );
    }
  }, [bankDetails, url]);

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleSizeChanger = (_, pageSize) => {
    setLimit(pageSize);
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
        <PayoutsFilters
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setProductName={setProductName}
        />
      </section>
      <section className={styles.download}>
        <AsyncDataToCSV
          url={`${process.env.BASE_URL}v1/kreatesell/store/payouts?Page=1&Limit=0`}
          headers={payoutsHeaders}
          filename="payouts"
        />
      </section>
      <section className={styles.table__section}>
        <Table
          dataSource={payouts}
          columns={payoutsColumns}
          pagination={{
            position: ["bottomLeft"],
            defaultPageSize: limit,
            responsive: true,
            total: totalPayouts,
            current: page,
            onChange: handlePageChange,
            onShowSizeChange: handleSizeChanger,
          }}
          rowKey={rowKey}
          loading={loading}
        />
      </section>
      {!bankDetails && (
        <section>
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
