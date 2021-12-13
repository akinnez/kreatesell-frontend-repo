import { Layout } from "../components";
import { Card, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styles from "../public/css/legal.module.scss";
import { handleTabClick } from "../redux/actions";
import Image from "next/image";
import legalBannerImg from "../public/images/legal-banner.png";
import whatsAppSupport from "../public/images/quick-contact.svg";
import chat from "../public/images/chat.svg";
import scrollUp from "../public/images/scroll-up.svg";
import { CookiePolicy } from "../components/legal-docs/CookiePolicy";
import { Privacy } from "../components/legal-docs/Privacy";
import { TermsOfService } from "../components/legal-docs/TermsOfService";
import { AffiliateTerms } from "../components/legal-docs/AffiliateTerms";

const Legal = () => {
  const { TabPane } = Tabs;
  const activeTabKey = useSelector((state) => state.legal.activeTabKey);

  const dispatch = useDispatch();
  const handleChange = (key) => {
    dispatch(handleTabClick(key));
  };

  return (
    <Layout subFooter={true} defaultMarginTop={true}>
      {/* BANNER */}
      <div className={styles.main}>
        <section className={styles.banner}>
          <div className={styles.header}>
            <h1 className={styles.title}>Legal</h1>
            <p className={styles.sub}>Effective Date: Octobers 16, 2021</p>
          </div>
          <div className={styles.img}>
            <Image src={legalBannerImg} width="161" height="242" />
          </div>
        </section>
        <section className={styles.mobile}>
          <Image src={scrollUp} width="68" height="65" />
          <div className={styles.container}>
            {activeTabKey === "1" && <CookiePolicy />}
            {activeTabKey === "2" && <Privacy />}
            {activeTabKey === "3" && <TermsOfService />}
            {activeTabKey === "4" && <AffiliateTerms />}
          </div>
          <Image src={whatsAppSupport} width="68" height="65" />
        </section>
        <section className={styles.lg}>
          <Image src={whatsAppSupport} width="68" height="65" />
          <div className={styles.container}>
            <Card bordered={false}>
              <Tabs
                defaultActiveKey={activeTabKey}
                activeKey={activeTabKey}
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
          <Image src={chat} width="68" height="65" />
        </section>
      </div>
    </Layout>
  );
};

export default Legal;
