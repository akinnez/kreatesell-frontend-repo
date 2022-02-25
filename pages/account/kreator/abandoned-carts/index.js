import Head from "next/head";
import { Typography, Card, Tabs } from "antd";
import AuthLayout from "components/authlayout";
import Campaigns from "components/kreatorAbandonedCarts/components/Campaigns";
import styles from "public/css/AbandonedCarts.module.scss";

const { Text } = Typography;
const { TabPane } = Tabs;

const AbandonedCarts = () => {
  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Abandoned Carts</title>
      </Head>
      <header className={styles.header}>
        <p>
          <Text>Send Mail</Text>
        </p>
        <p>
          <Text>Use your own words and content to reach your audience.</Text>
        </p>
      </header>
      <section>
        <Card className={styles.card__wrapper}>
          <Tabs className={styles.tabs} defaultActiveKey="1" centered>
            <TabPane tab="Campaigns" key="1">
              <Campaigns />
            </TabPane>
            <TabPane tab="Recovery Status" key="2">
              Recovery Status
            </TabPane>
          </Tabs>
        </Card>
      </section>
    </AuthLayout>
  );
};

export default AbandonedCarts;
