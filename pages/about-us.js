import { Layout } from "components";
import styles from "../public/css/about-us.module.scss";
// import Image from "next/image";
const AboutUs = () => {
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <section className={styles.aboutUsContainer}>AboutUs</section>
    </Layout>
  );
};

export default AboutUs;
