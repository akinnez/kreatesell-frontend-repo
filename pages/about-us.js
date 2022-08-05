import { Layout } from "components";
import styles from "../public/css/about-us.module.scss";
import Image from "next/image";
import { Collapse } from "antd";
import {
  AboutUsBlueBox,
  AboutUsFour,
  AboutUsThree,
  AboutUsTwo,
  AboutUsOne,
  MainAbout,
  MainAboutLg,
  VisionImage,
  MissionImage,
  MissionIcon,
  VisionIcon,
  CoreFive,
  CoreFour,
  CoreTwo,
  CoreThree,
  CoreOne,
  ChevRonRight,
  MockVideo,
} from "../utils/assets";
import { useState } from "react";
const AboutUs = () => {
  const [cardState, setCardState] = useState({
    isMissionCardHovered: false,
    isVisionCardHovered: true,
  });

  const { isMissionCardHovered, isVisionCardHovered } = cardState;

  const handleOver = (id) => {
    setCardState({
      isMissionCardHovered: false,
      isVisionCardHovered: false,
      [`${id}`]: true,
    });
  };

  const handleMouseLeave = () => {
    setCardState({
      isMissionCardHovered: false,
      isVisionCardHovered: true,
    });
  };

  // * core value
  const [coreValue, setCoreValue] = useState({
    customerCentric: true,
    teamWork: false,
    respect: false,
    transparent: false,
    service: false,
  });

  const { customerCentric, teamWork, respect, transparent, service } =
    coreValue;

  const handleCoreValueHover = (id) => {
    setCoreValue({
      customerCentric: false,
      teamWork: false,
      respect: false,
      transparent: false,
      service: false,
      [`${id}`]: true,
    });
  };

  const handleCoreValueMouseOut = () => {
    setCoreValue({
      customerCentric: true,
      teamWork: false,
      respect: false,
      transparent: false,
      service: false,
    });
  };

  const isActiveCoreValue = (coreValue) => {
    return coreValue === true;
  };

  const isActiveHeader = (id) => {
    return coreValue[id] === true;
  };

  const coreValueClass = (coreValue) => {
    return isActiveCoreValue(coreValue) ? `${styles.isActive}` : "";
  };
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
          {/* //* missionAndVision */}
          <div
            className={styles.missionAndVision}
            onMouseLeave={() => handleOver("isVisionCardHovered")}
          >
            <div className={styles.onMobile}>
              <div className={styles.cardMain}>
                <div className={styles.mavBox}>
                  <Image src={VisionImage} alt="vision " />
                </div>
                <div className={styles.card}>
                  <h3 className={styles.heading}>
                    <Image src={MissionIcon} alt="mission icon" />
                    <span className={styles.title}> Mission</span>
                  </h3>
                  <p>
                    Bringing ease to the buying and selling of digital products
                    to Africans globally.
                  </p>
                </div>
              </div>
              <div className={styles.cardMain}>
                <div className={styles.mavBox}>
                  <Image src={MissionImage} alt="mission " />
                </div>
                <div className={styles.card}>
                  <h3 className={styles.heading}>
                    <Image src={VisionIcon} alt="vision icon" />
                    <span className={styles.title}> Vision</span>
                  </h3>
                  <p>
                    To be the number one Pan-African Edtech SaaS platform for
                    digital Kreators and entrepreneurs.
                  </p>
                </div>
              </div>
            </div>

            {/* //* cards on lg */}
            <div
              className={styles.onLg}
              onMouseEnter={() => handleOver("isVisionCardHovered")}
            >
              <div
                className={styles.imageSlide}
                onMouseEnter={() => handleOver("isVisionCardHovered")}
              >
                <div
                  className={`${styles.visionBox} ${
                    isVisionCardHovered ? styles.showVisionImage : ""
                  }`}
                >
                  <Image src={VisionImage} alt="vision " />
                </div>
                <div
                  className={`${styles.missionBox} ${
                    isMissionCardHovered ? styles.showMissionImage : ""
                  }`}
                >
                  <Image src={MissionImage} alt="mission " />
                </div>
              </div>
              <div className={styles.slideCards}>
                <div className={styles.cardMain}>
                  <div
                    className={`${styles.card} ${
                      isMissionCardHovered
                        ? styles.missionCardHovered
                        : styles.missionCardInit
                    }`}
                    // id="isMissionCardHovered"
                    onMouseEnter={() => handleOver("isMissionCardHovered")}
                    // onMouseLeave={handleMouseLeave}
                  >
                    <h3 className={styles.heading}>
                      <Image src={MissionIcon} alt="mission icon" />
                      <span className={styles.title}> Mission</span>
                    </h3>
                    <p>
                      Bringing ease to the buying and selling of digital
                      products to Africans globally.
                    </p>
                  </div>
                  <div
                    className={`${styles.card} ${
                      isVisionCardHovered
                        ? styles.visionCardHovered
                        : styles.visionCardInit
                    }`}
                    // id="isVisionCardHovered"
                    onMouseEnter={() => handleOver("isVisionCardHovered")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h3 className={styles.heading}>
                      <Image src={VisionIcon} alt="vision icon" />
                      <span className={styles.title}> Vision</span>
                    </h3>
                    <p>
                      To be the number one Pan-African Edtech SaaS platform for
                      digital Kreators and entrepreneurs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* //* core values */}
          <div className={styles.coreValues}>
            {/* //? mobile */}
            <div className={styles.mobile}>
              <h3 className={styles.heading}>Our Core Values</h3>
              <p className={styles.text}>
                At KreateSell, we have five (5) distinct values that guide us
                daily. These values make us your go-to platform for selling
                digital products without any hassle.
              </p>
              <div className={styles.cAndI}>
                <div className={styles.collapsibles}>
                  {data?.map((item) => (
                    <MobileCollapsible key={item?.headingText} {...item} />
                  ))}
                </div>
                <div className={styles.images}>
                  <Image src={CoreOne} alt="core 1" />
                  <Image src={CoreTwo} alt="core 2" />
                  <Image src={CoreThree} alt="core 3" />
                  <Image src={CoreFour} alt="core 4" />
                  <Image src={CoreFive} alt="core 5" />
                </div>
              </div>
            </div>
            <div
              className={styles.lg}
              onMouseEnter={handleCoreValueMouseOut}
              onMouseLeave={handleCoreValueMouseOut}
            >
              <div className={styles.lgHeaders}>
                {data?.map((item) => {
                  return (
                    <LgCustomHeader
                      key={item?.headingText}
                      id={item?.id}
                      onMouseEnter={() => handleCoreValueHover(item?.id)}
                      onMouseLeave={handleCoreValueMouseOut}
                      isActive={() => isActiveHeader(item?.id)}
                    >
                      {item?.headingText}
                    </LgCustomHeader>
                  );
                })}
              </div>
              <div className={styles.lgImages}>
                <div
                  className={`${styles.lgImgBox} ${coreValueClass(
                    customerCentric
                  )}`}
                >
                  <Image src={CoreOne} alt="core 1" />
                </div>
                <div
                  className={`${styles.lgImgBox} ${coreValueClass(teamWork)}`}
                >
                  <Image src={CoreTwo} alt="core 2" />
                </div>
                <div
                  className={`${styles.lgImgBox} ${coreValueClass(respect)}`}
                >
                  <Image src={CoreThree} alt="core 3" />
                </div>
                <div
                  className={`${styles.lgImgBox} ${coreValueClass(
                    transparent
                  )}`}
                >
                  {" "}
                  <Image src={CoreFour} alt="core 4" />
                </div>
                <div
                  className={`${styles.lgImgBox} ${coreValueClass(service)}`}
                >
                  <Image src={CoreFive} alt="core 5" />
                </div>
              </div>
              <div className={styles.contents}>
                {data?.map((item) => {
                  console.log(isActiveHeader(item?.id));
                  return (
                    <div
                      key={item?.headingText}
                      className={`${styles.lgContent} ${
                        isActiveHeader(item?.id) ? styles.isActive : ""
                      } `}
                    >
                      {item?.content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* //! end of coreValues */}
          <div className={styles.media}>
            <h4 className={styles.heading}>Media</h4>
            <p className={styles.text}>
              Hello! You are welcome. Scan through to see various media about
              Kreatesell, to get to know us better.
            </p>
            <div className={styles.watchFree}>
              <h5 className={styles.heading}>
                Watch Free Video On How To Use Kreatesell
              </h5>
              <div className={styles.videoContainer}>
                <div className={styles.mobile}>
                  <Image
                    src={MockVideo}
                    alt="mock video"
                    height={225}
                    width={431}
                  />
                </div>
                <div className={styles.lg}>
                  <Image
                    src={MockVideo}
                    alt="mock video"
                    height={480}
                    width={920}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.madeTheNews}>
            <h6 className={styles.heading}>We Made The News</h6>
            <div className={styles.featureBox}></div>
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

const MobileCollapsible = ({ headingText, content }) => {
  const { Panel } = Collapse;
  return (
    <Collapse
      expandIconPosition="right"
      bordered={false}
      defaultActiveKey={["0"]}
      accordion
      className={styles.collapse}
      // id="collapse"
    >
      <Panel
        key="0"
        header={<CustomHeader>{headingText}</CustomHeader>}
        className={styles.panelHeader}
        // id="panelHeader"
      >
        <div className={styles.moreInfo}>{content}</div>
      </Panel>
    </Collapse>
  );
};

const data = [
  {
    headingText: "We are customer-centric",
    id: "customerCentric",
    content:
      "The happiness of our customers is what motivates us to give our best daily. Once our Users are happy and satisfied, so are we.",
  },
  {
    headingText: "Teamwork is how we roll",
    id: "teamWork",
    content: `We perform by leveraging one another’s strengths and rubbing minds together to give the best services to our customers. Our slogan is “Our teamwork makes our platform work…”`,
  },

  {
    headingText: "We cherish mutual respect ",
    id: "respect",
    content:
      "We are aware that everyone brings something unique to the table. So, we treat one another equally and extend this respect to our esteemed customers.",
  },
  {
    headingText: "Our activities are transparent",
    id: "transparent",
    content:
      "At Kreatesell, we have no hidden agenda. We are very open about our activities. Follow our blog and social media channels for updates.",
  },
  {
    headingText: "We provide excellent service",
    id: "service",
    content:
      "We strive for excellence in everything we do at Kreatesell. This includes services to our valued Kreators and one another. We are always ready to help out, just reach out to us.",
  },
];

const CustomHeader = ({ children }) => {
  return <h3 className={styles.customHeader}>{children}</h3>;
};
const LgCustomHeader = ({
  children,
  onMouseEnter,

  isActive,
  onMouseLeave,
}) => {
  return (
    <h3
      className={`${styles.lgCustomHeader} ${
        isActive() ? styles.isActive : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children} <Image src={ChevRonRight} alt="arrow" />
    </h3>
  );
};
