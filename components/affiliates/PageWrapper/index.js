import Head from "next/head";
import BackButton from "components/BackButton";
import ProfileLayout from "components/ProfileLayout";
import styles from "./index.module.scss";

const PageWrapper = ({ children, title }) => (
  <ProfileLayout>
    <Head>
      <title>KreateSell | {title}</title>
    </Head>
    <header className={styles.header}>
      <BackButton />
    </header>
    {children}
  </ProfileLayout>
);

export default PageWrapper;
