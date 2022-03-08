import Head from "next/head";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import AuthLayout from "components/authlayout";
import Spinner from "components/Spinner";
import Payouts from "components/Payouts/components/Payouts";
import BankSettings from "components/Payouts/bank-settings";
import style from "public/css/Payout.module.scss";

const { TabPane } = Tabs;

const PayoutsPage = () => {
  const { store, loading } = useSelector(state => state.store);
  const { bank_details: bankDetails } = store;

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Payouts</title>
      </Head>
      {loading ? (
        <Spinner />
      ) : (
        <Tabs defaultActiveKey="1" centered className={style.tabs}>
          <TabPane tab="Payouts" key="1">
            <Payouts bankDetails={bankDetails} />
          </TabPane>
          <TabPane tab="Payout/Bank Settings" key="2">
            <BankSettings />
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
