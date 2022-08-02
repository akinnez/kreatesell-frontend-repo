import { Layout } from "components";
import styles from "../public/css/about-us.module.scss";
import Image from "next/image";
import {
  AboutUsBlueBox,
  AboutUsFour,
  AboutUsThree,
  AboutUsTwo,
  AboutUsOne,
} from "../utils/assets";
const AboutUs = () => {
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <section className={styles.aboutUsContainer}>
        <div className={styles.mobile}>
          <AboutUsImages />
        </div>
        <div className={styles.storyBox}>
          <h1 className={styles.heading}>Our Story</h1>
          <div className={styles.storyTexts}>
            <p>
              It all started one bright morning, in early 2021. Some Great minds
              came together to creatively brainstorm and find an Advanced &
              Powerful solution to the Loads of problems digital Kreators and
              entrepreneurs were facing in Instantly selling their digital
              products online.
            </p>
            <p>
              The Super Powerful solution was to provide an all-in-one platform
              where digital Kreators and entrepreneurs can uniquely display
              their digital products and market them Without A Drop Of Sweat.
              Where they can seamlessly transact business with no currency
              barrier, even with no tech skills or experience, and massively
              connect with buyers on a global scale. This platform was named
              Kreatesell and today, we are live!
            </p>
            <p>This platform was named Kreatesell and today, we are live!</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;

const AboutUsImages = () => {
  return (
    <div className={styles.imageBox}>
      <div className={styles.merge}>
        <div className={styles.blueBox}>
          <Image src={AboutUsBlueBox} alt="about us" />
        </div>

        <Image src={AboutUsOne} alt="about us" />
      </div>
      <Image src={AboutUsTwo} alt="about us" />
      <Image src={AboutUsThree} alt="about us" />
      <Image src={AboutUsFour} alt="about us" />
    </div>
  );
};
