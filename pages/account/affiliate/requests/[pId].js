import Head from "next/head";
import { Button, Tabs } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
// import AffiliateRequestContainer from "components/affiliates/AffiliateRequestContainer";
import AffiliateLink from "components/affiliateRequests/components/AffiliateLink";
// import Overview from "components/affiliates/Overview";
import styles from "public/css/AffiliateRequestLink.module.scss";
import PromotionalMaterials from "components/affiliateRequests/components/PromotionalMaterials";

const { TabPane } = Tabs;

const AffiliateRequestLinK = () => {
  return (
    <ProfileLayout>
      <Head>
        <title>KreateSell | Affiliate Request Link</title>
      </Head>
      <header className={styles.header}>
        <BackButton />
        <Button className={styles.header__btn} icon={<MdOutlineRemoveRedEye />}>
          View Sales Page
        </Button>
      </header>
      {/* <AffiliateRequestContainer> */}
      <Tabs className={styles.tabs} defaultActiveKey="1" centered>
        <TabPane tab="Affiliate Link" key="1">
          <AffiliateLink />
        </TabPane>
        {/* <TabPane tab="Overview" key="2">
          <Overview />
        </TabPane> */}
        <TabPane tab="Promotional Materials/Bonus" key="3">
          <PromotionalMaterials />
        </TabPane>
      </Tabs>
      {/* </AffiliateRequestContainer> */}
    </ProfileLayout>
  );
};

export default AffiliateRequestLinK;
