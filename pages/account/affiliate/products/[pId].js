import Head from "next/head";
import { Button, Tabs, Typography, Card } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import Request from "components/affiliateProductRequest/components/Request";
import Overview from "components/affiliateProductRequest/components/Overview";
import styles from "public/css/AffiliateProductRequest.module.scss";

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const AffiliateProductRequest = () => {
  return (
    <ProfileLayout>
      <Head>
        <title>KreateSell | Affiliate Product Request</title>
      </Head>
      <header className={styles.header}>
        <BackButton />
        <Button className={styles.header__btn} icon={<MdOutlineRemoveRedEye />}>
          View Sales Page
        </Button>
      </header>
      <div className={styles.product__name}>
        <Title>
          The Land Of Hope - <Text type="secondary">DIGITAL DOWNLOAD</Text>
        </Title>
      </div>
      <Card className={styles.card__container}>
        <Tabs className={styles.tabs} defaultActiveKey="1" centered animated>
          <TabPane tab="Request" key="1">
            <Request />
          </TabPane>
          <TabPane tab="Overview" key="2">
            <Overview />
          </TabPane>
          {/* <TabPane tab="Promotional Materials/Bonus" key="3">
            Promotional Material/Bonus
          </TabPane> */}
        </Tabs>
      </Card>
    </ProfileLayout>
  );
};

export default AffiliateProductRequest;
