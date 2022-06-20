import Head from "next/head";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import styles from "./index.module.scss";

const ProfilePageError = ({ errorMsg, title, showBackBtn = true }) => (
  <ProfileLayout>
    <Head>
      <title>KreateSell | {title}</title>
    </Head>
    {showBackBtn && (
      <div className={styles.back__button}>
        <BackButton />
      </div>
    )}
    <section className={styles.error__section}>{errorMsg}</section>
  </ProfileLayout>
);

export default ProfilePageError;
