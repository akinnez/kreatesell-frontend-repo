import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import AuthLayout from "components/authlayout";
import Spinner from "components/Spinner";
import Payouts from "components/Payouts/components/Payouts";
import BankAccountDetails from "components/Payouts/components/BankAccountDetails";
import { showToast } from "utils";
import styles from "public/css/PayoutsPage.module.scss";

const { TabPane } = Tabs;

const PayoutsPage = () => {
  const [tab, setTab] = useState("1");

  const router = useRouter();

  const { store, loading } = useSelector(state => state.store);
  const { bank_details: bankDetails } = store;

  const handleClick = key => {
    setTab(key);
  };

  useEffect(() => {
    if (router.query.redirect) {
      showToast("You have already set up payout bank account", "info");
    }
  }, [router]);

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Payouts</title>
      </Head>
      {loading ? (
        <Spinner />
      ) : (
        <Tabs
          activeKey={tab}
          onTabClick={handleClick}
          centered
          className={styles.tabs}
        >
          <TabPane tab="Payouts" key="1">
            <Payouts bankDetails={bankDetails} handleClick={handleClick} />
          </TabPane>
          <TabPane tab="Bank Account Details" key="2">
            <BankAccountDetails bankDetails={bankDetails} />
          </TabPane>
          <TabPane tab="Wallet" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      )}
    </AuthLayout>
  );
};

export default PayoutsPage;
