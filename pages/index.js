import { useState, useEffect } from "react";
import {
  InputButton,
  Layout,
  Button,
  Modal,
  Input,
  FormError,
} from "../components";
import styles from "../public/css/Home.module.scss";
import {
  RightArrow,
  //   LandingPageHero,
  //   AirBnBLogo,
  //   MicrosoftLogo,
  //   AddProduct,
  //   CreateStore,
  //   Publish,
  //   AutomationIcon,
  //   LeftSpiral,
  //   RightSpiral,
  //   PayoutMethod,
  //   InstantPayout,
  //   PrimaryNews,
  //   SecondaryNews,
  //   PrimaryNewsFooterImg,
  //   videoThumbnail,
  //   ElipseImage,
  //   MobileElipse,
  //   PlayIcon,
  //   isAnEmpytyObject,
} from "../utils";
import Image from "next/image";

export default function Home() {
  const [mail, setEmail] = useState("");

  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <div className={styles.container}>
        <section className={styles.mainBody}>
          <div className={styles.left}>
            <h1>
              Are you ready to experience a mind-blowing platform made just for
              you to sell all your content and digital products across borders,
              and massively earn without any hassle?
            </h1>
            <h2>Get ready! We are launching soon.</h2>
            <p className={styles.text}>
              To be the first to know when we launch, join the wait-list by
              submitting your details below.
            </p>
          </div>
          <div className={styles.inputContainer}>
            <InputButton
              name="email "
              placeholder="Enter your email..."
              buttonText="Submit"
              buttonIcon={<RightArrow />}
              onChange={(e) => setEmail(e.target.value)}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            />
            <p className={styles.textC}>KreateSell loading...</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
