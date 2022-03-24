import { useState } from "react";
import useSWR from "swr";
import { Typography, Table } from "antd";
import SyncDataToCSV from "components/DataToCSV/SyncDataToCSV";
import WalletBalance from "../WalletBalance";
import WalletFilters from "../Filters/WalletFilters";
import { walletColumns } from "../../columns/walletColumns";
import { walletHeaders } from "../../utils/walletHeaders";
import walletFetcher from "../../utils/walletFetcher";
import styles from "./index.module.scss";

const { Title } = Typography;
const rowKey = record => record.id;

const Wallet = ({ bankDetails, walletInfo, loading }) => {
  const [filtered, setFiltered] = useState(null);

  const { data } = useSWR(
    `${process.env.BASE_URL}affiliate/get-wallet-history`,
    url => walletFetcher(url, "An error occurred fetching your wallet history")
  );

  return (
    <>
      <WalletBalance
        bankDetails={bankDetails}
        walletInfo={walletInfo}
        loading={loading}
      />
      <section className={styles.filter__section}>
        <Title level={2}>Wallet History</Title>
        <WalletFilters
          data={data || []}
          setFiltered={setFiltered}
          searchQuery="description"
        />
      </section>
      <section>
        <SyncDataToCSV
          data={data || []}
          headers={walletHeaders}
          filename="wallet_history"
        />
      </section>
      <section className={styles.table__section}>
        <Table
          dataSource={filtered || data || []}
          columns={walletColumns}
          pagination={{
            position: ["bottomLeft"],
            showSizeChanger: false,
            defaultPageSize: 5,
            responsive: true,
          }}
          rowKey={rowKey}
          loading={!data}
        />
      </section>
    </>
  );
};

export default Wallet;
