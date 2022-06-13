import Head from "next/head";
import BackButton from "components/BackButton";
import ProfileLayout from "components/ProfileLayout";
import styles from "./index.module.scss";

const AffiliateProductPageWrapper = ({ children, back }) => (
  <ProfileLayout>
    <Head>
      <title>KreateSell | Affiliate Product Request</title>
    </Head>
    <div className={styles.container}>
      {back && (
        <header className={styles.header}>
          <BackButton />
        </header>
      )}
      {children}
    </div>
  </ProfileLayout>
);

export default AffiliateProductPageWrapper;
