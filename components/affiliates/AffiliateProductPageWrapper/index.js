import Head from "next/head";
import BackButton from "components/BackButton";
import ProfileLayout from "components/ProfileLayout";
import styles from "./index.module.scss";

const AffiliateProductPageWrapper = ({ children, back }) => (
  <ProfileLayout>
    <Head>
      <title>KreateSell | Affiliate Product Request</title>
    </Head>
    {back && (
      <header className={styles.header}>
        <BackButton />
      </header>
    )}
    {children}
  </ProfileLayout>
);

export default AffiliateProductPageWrapper;
