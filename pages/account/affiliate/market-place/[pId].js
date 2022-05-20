import Head from "next/head";
import { Button, Tabs } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import AffiliateRequestContainer from "components/affiliates/AffiliateRequestContainer";
import Request from "components/affiliateProducts/components/Request";
import Overview from "components/affiliates/Overview";
import styles from "public/css/AffiliateProductRequest.module.scss";

const { TabPane } = Tabs;

const AffiliateProductRequest = () => (
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
    <AffiliateRequestContainer>
      <TabPane tab="Request" key="1">
        <Request />
      </TabPane>
      <TabPane tab="Overview" key="2">
        <Overview />
      </TabPane>
    </AffiliateRequestContainer>
  </ProfileLayout>
);

export default AffiliateProductRequest;
