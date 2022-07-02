import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import { Tabs } from "antd";
import AuthLayout from "components/authlayout";
import Campaigns from "components/kreatorAbandonedCarts/components/Campaigns";
import RecoveryStatus from "components/kreatorAbandonedCarts/components/RecoveryStatus";
import styles from "public/css/AbandonedCarts.module.scss";

const { TabPane } = Tabs;

const AbandonedCarts = () => {
  const [activeKey, setActiveKey] = useState("1");

  const changeKey = key => {
    setActiveKey(key);
  };

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Abandoned Carts</title>
      </Head>
      <header className={styles.header}>
        <div>
          <h2>{activeKey === "1" ? "Send Mail" : "Recovery Status"}</h2>
          <p>
            {activeKey === "1"
              ? "Use your own words and content to reach your audience."
              : "Faucibus justo et in sit at eget faucibus. Faucibus justo et in sit at eget faucibus."}
          </p>
        </div>
        {activeKey === "1" && (
          <Link href="/account/kreator/abandoned-carts/add">
            <a>
              <BsPlusLg />
              &nbsp; Add Email
            </a>
          </Link>
        )}
      </header>
      <section>
        <Tabs
          className={styles.tabs}
          activeKey={activeKey}
          centered
          onTabClick={changeKey}
        >
          <TabPane tab="Campaigns" key="1">
            <Campaigns />
          </TabPane>
          <TabPane tab="Recovery Status" key="2">
            <RecoveryStatus />
          </TabPane>
        </Tabs>
      </section>
    </AuthLayout>
  );
};

export default AbandonedCarts;
