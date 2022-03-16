import { useState } from "react";
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
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <InputButton
            name="email"
            placeholder="Enter your email..."
            buttonText="Get Started Free"
            buttonIcon={<RightArrow />}
            onChange={(e) => setEmail(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              router.push({
                pathname: "/signup",
                query: { email },
              });
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
