import { useState } from "react";
import Link from "next/link";
import { Typography, Button, Table } from "antd";
import Filters from "../Filters";
import { payoutsColumns } from "../../columns/payoutsColumns";
import styles from "./index.module.scss";

const { Title, Text } = Typography;
const rowKey = record => record.id;

const Payouts = () => {
  const [filtered, setFiltered] = useState(null);

  return (
    <>
      <header className={styles.header}>
        <Title level={2}>Payouts</Title>
        <Button type="primary" size="large">
          Payout Setting
        </Button>
      </header>
      <section>
        <Filters
          data={[]}
          setFiltered={setFiltered}
          searchQuery="product_name"
        />
      </section>
      <section className={styles.table__section}>
        <Table
          dataSource={filtered || []}
          columns={payoutsColumns}
          pagination={{
            position: ["bottomLeft"],
            defaultPageSize: 5,
            responsive: true,
          }}
          rowKey={rowKey}
        />
      </section>
      <section>
        <p>
          <Text>
            To start receiving money from your sales ensure you setup your bank
            details
          </Text>
        </p>
        <Link href="/account/sales/payouts/set-up-bank-details">
          <a>Set Up Bank Details</a>
        </Link>
      </section>
    </>
  );
};

export default Payouts;
