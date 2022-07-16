import React from 'react'
import Head from "next/head";

import {Table} from "antd";

import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import styles from "public/css/ViewSubscribers.module.scss";
import {ViewSubscribersHeader} from "components/products/ViewSubscribersFilter";
import useViewMembershipFilters from "components/affiliates/hooks/useViewMembershipFilters";
import SyncDataToCSV from "components/DataToCSV/SyncDataToCSV";

// TODO: move to its own file
const subscribersColumns = [
  {
    title: "Product",
    dataIndex: "product_name"
  },
  {
    title: "Customer's Name",
    dataIndex: "customer_name"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Product Price",
    dataIndex: "product_price"
  },
  {
    title: "Number of Payments Made",
    dataIndex: "number_payements_made"
  },
  {
    title: "Number of Pending Payments",
    dataIndex: "number_pending_payments"
  },
  {
    title: "Subscription Start Date",
    dataIndex: "subscription_start_date"
  },
  {
    title: "Subscription End Date",
    dataIndex: "subscription_end_date"
  },

]
export const headCells = [
  {
    title: "Product",
    dataIndex: "product_name"
  },
  {
    title: "Customer's Name",
    dataIndex: "customer_name"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Product Price",
    dataIndex: "product_price"
  },
  {
    title: "Number of Payments Made",
    dataIndex: "number_payements_made"
  },
  {
    title: "Number of Pending Payments",
    dataIndex: "number_pending_payments"
  },
  {
    title: "Subscription Start Date",
    dataIndex: "subscription_start_date"
  },
  {
    title: "Subscription End Date",
    dataIndex: "subscription_end_date"
  },
];

const rowKey = record => record.id;

const ViewSubscribers = () => {
  const { url, filters, setFilters } = useViewMembershipFilters(
    "products/get-subscribers"
  );

  const handlePageChange = page => {
    setFilters({ ...filters, page });
  };
  return (
    <ProfileLayout customWidth={true}>
      <Head>
        <title>KreateSell | View Subscribers</title>
      </Head>
      <header className={styles.header}>
        <BackButton />
      </header>
      <div>
      <ViewSubscribersHeader submitCb={setFilters} />
          
      <div className={styles.exportDiv}>
        <SyncDataToCSV
            data={[]}
            headers={headCells}
            filename="applicants_list"
          />
        </div>

          <section className={styles.tableWrapper}>
            <Table
              dataSource={[]}
              columns={subscribersColumns}
              pagination={{
                position: ["bottomLeft"],
                pageSize: filters.limit,
                current: filters.page,
                total: 0,
                responsive: true,
                onChange: handlePageChange,
              }}
              rowKey={rowKey}
              loading={false}
            />
          </section>
      </div>
    </ProfileLayout>
  )
}

export default ViewSubscribers;