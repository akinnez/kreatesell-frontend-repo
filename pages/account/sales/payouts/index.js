import Head from "next/head";
import { Card, Tabs } from "antd";
import AuthLayout from "components/authlayout";
import Payouts from "components/Payouts/components/Payouts";
import BankSettings from "components/Payouts/bank-settings";
import style from "public/css/Payout.module.scss";

const { TabPane } = Tabs;

const PayoutsPage = () => {
  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Payouts</title>
      </Head>
      <Card className={style.card}>
        <Tabs defaultActiveKey="1" centered className={style.tabs}>
          <TabPane tab="Payouts" key="1">
            <Payouts />
          </TabPane>
          <TabPane tab="Payout/Bank Settings" key="2">
            <BankSettings />
          </TabPane>
          <TabPane tab="Wallet" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
    </AuthLayout>
  );
};

export default PayoutsPage;
