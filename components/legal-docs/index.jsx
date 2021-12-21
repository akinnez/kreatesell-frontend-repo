import { Layout } from "../layout/Layout";
import { Card, Tabs } from "antd";
import styles from "../../public/css/legal.module.scss";
import Image from "next/image";
import legalBannerImg from "../../public/images/legal-banner.png";
// import whatsAppSupport from "../public/images/quick-contact.svg";
// import chat from "../public/images/chat.svg";
// import scrollUp from "../public/images/scroll-up.svg";
import { CookiePolicy } from "./CookiePolicy";
import { Privacy } from "./Privacy";
import { TermsOfService } from "./TermsOfService";
import { AffiliateTerms } from "./AffiliateTerms";
import { useState } from "react";
import { useRouter } from "next/router";
import { isPathMatched } from "./data/getPath";

const Legal = ({ defaultActiveKey }) => {
  const { TabPane } = Tabs;

  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const { pathname } = useRouter();

  const matchPath = (path) => {
    return isPathMatched(pathname, path);
  };

  const handleChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout subFooter={true} defaultMarginTop={true}>
      {/* BANNER */}
      <div className={styles.main}>
        {/* shared layout on both mobile and desktop */}
        <section className={styles.banner}>
          <div className={styles.header}>
            <h1 className={styles.title}>Legal</h1>
            <p className={styles.sub}>Effective Date: October 16, 2021</p>
          </div>
          <div className={styles.img}>
            <Image src={legalBannerImg} width="161" height="242" />
          </div>
        </section>
        {/* Tabs View on Mobile based on route */}
        {/* Tabs View on Mobile based on route */}
        {/* Tabs View on Mobile based on route */}
        {/* Tabs View on Mobile based on route */}
        <section className={styles.mobile}>
          {/* <Image src={scrollUp} width="68" height="65" /> */}
          <div className={styles.container}>
            {matchPath("/legal/cookie-policy") && <CookiePolicy />}
            {matchPath("/legal/privacy-policy") && <Privacy />}
            {matchPath("/legal/terms-of-service") && <TermsOfService />}
            {matchPath("/legal/affiliate-policy") && <AffiliateTerms />}
          </div>
          {/* <Image src={whatsAppSupport} width="68" height="65" /> */}
        </section>

        {/* TABS view on desktop and larger screens */}
        <section className={styles.lg}>
          {/* <Image src={whatsAppSupport} width="68" height="65" /> */}
          <div className={styles.container}>
            <Card bordered={false}>
              <Tabs
                defaultActiveKey={activeKey}
                activeKey={activeKey}
                onChange={handleChange}
                centered
                size="large"
              >
                <TabPane tab="Cookies Policy" key="1">
                  <CookiePolicy />
                </TabPane>
                <TabPane tab="Privacy Policy" key="2">
                  <Privacy />
                </TabPane>
                <TabPane tab="Terms of Service" key="3">
                  <TermsOfService />
                </TabPane>
                <TabPane tab="Affiliate Terms" key="4">
                  <AffiliateTerms />
                </TabPane>
              </Tabs>
            </Card>
          </div>
          {/* <Image src={chat} width="68" height="65" /> */}
        </section>
      </div>
    </Layout>
  );
};

export default Legal;
