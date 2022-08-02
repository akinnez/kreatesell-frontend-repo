import { Layout } from "components";
import styles from "../public/css/about-us.module.scss";
import Image from "next/image";
import {
  AboutUsBlueBox,
  AboutUsFour,
  AboutUsThree,
  AboutUsTwo,
  AboutUsOne,
  MainAbout,
  MainAboutLg,
} from "../utils/assets";
const AboutUs = () => {
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <section className={styles.aboutUsContainer}>
        <div className={styles.body}>
          <div className={styles.mainBanner}>
            <div className={styles.mobile}>
              <AboutUsImages />
            </div>

            <StoryTexts {...first} />
          </div>
          <div className={styles.mainAbout}>
            <div className={styles.merge}>
              <Image src={MainAbout} alt="about us" />
            </div>
            <div className={styles.mainAboutLg}>
              <Image src={MainAboutLg} alt="about us" />
            </div>
            <StoryTexts {...second} />
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
      {/* //* COLORED BOX */}
      <div className={styles.merge}>
        <div className={styles.blueBox}>
          <Image src={AboutUsBlueBox} alt="about us" />
        </div>
        <Image src={AboutUsOne} alt="about us" />
      </div>
      {/* //* END of COLORED BOX */}
      <Image src={AboutUsTwo} alt="about us" />
      <Image src={AboutUsThree} alt="about us" />
      <Image src={AboutUsFour} alt="about us" />
    </div>
  );
};

const StoryTexts = ({ heading, texts }) => {
  return (
    <div className={styles.storyBox}>
      <h1 className={styles.heading}>{heading}</h1>
      <div className={styles.storyTexts}>
        {texts?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
};

const storyTexts = {
  first: {
    heading: "Our Story",
    texts: [
      `It all started one bright morning, in early 2021. Some Great minds
          came together to creatively brainstorm and find an Advanced & Powerful
          solution to the Loads of problems digital Kreators and entrepreneurs
          were facing in Instantly selling their digital products online.`,

      `The Super Powerful solution was to provide an all-in-one platform
          where digital Kreators and entrepreneurs can uniquely display their
          digital products and market them Without A Drop Of Sweat. Where they
          can seamlessly transact business with no currency barrier, even with
          no tech skills or experience, and massively connect with buyers on a
          global scale. This platform was named KreateSell and today, we are
          live!`,

      `This platform was named KreateSell and today, we are live!`,
    ],
  },

  second: {
    heading: "About KreateSell",
    texts: [
      `The team at KreateSell is working tirelessly to bring KreateSell’s vision of being the number one pan-African Edtech SaaS platform for content Kreators and digital entrepreneurs to life. Find all the support you need to sell your digital product to a wide range of target audiences on KreateSell.`,
      `How do we do this? You might ask. As part of our sell more-do less strategy, we created a system that enables the use of affiliate marketing or referral system to bring the right paying customers to Kreators on our platform and help affiliates earn commissions again and again!`,
      `So, what are you waiting for? Don’t hesitate to sign up for free Now as a Kreator to experience real growth in your digital product(s) sales. And as an Affiliate to massively start earning passive and active income from referral commissions over n’ over!`,
    ],
  },
};

const { first, second } = storyTexts;
