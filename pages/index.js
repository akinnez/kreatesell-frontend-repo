import { useState } from "react";
import {
  InputButton,
  Layout,
  // Button,
  // Modal,
  // Input,
  // FormError,
} from "../components";
import styles from "../public/css/Home.module.scss";
import { RightArrow } from "../utils";
import CountDownTimer from "../components/LaunchCountDown";

export default function Home() {
  const [mail, setEmail] = useState("");

  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <div className={styles.container}>
        <section className={styles.mainBody}>
          <div className={styles.left}>
            <h1>Be The First To Know!</h1>
            <h2>
              Are you ready to experience a mind-blowing platform made just for
              you to sell all your content and digital products across borders,
              and massively earn without any hassle?
            </h2>

            <h3 className={styles.animateFlicker}>
              KreateSell is coming soon...
            </h3>
            <h3>Sneak peek of what to expect:</h3>

            <ol>
              <li>
                <span className={styles.animateFire}>🔥</span> Free digital
                products upload.
              </li>
              <li>
                <span className={styles.animateFire}>🔥</span> 21 supported
                currencies.
              </li>
              <li>
                <span className={styles.animateFire}>🔥</span> Earn massively
                from borderless sales.
              </li>
              <li>
                <span className={styles.animateFire}>🔥</span> Army of affiliate
                marketers to sell your digital product(s) for you.
              </li>
              <li>
                <span className={styles.animateFire}>🔥</span> 24/7 customer
                support.{" "}
              </li>
              <li>
                <span className={styles.animateFire}>🔥</span> Automated
                done-for-you payment and follow up processes.
              </li>
              <li>
                <span className={styles.animateFire}>🔥</span> And so much
                more...
              </li>
            </ol>
          </div>
          {/* <div>
            <CountDownTimer />
            {/* <p>To launch</p> */}
          {/* </div> */}
          <p className={styles.text}>
            We want you to be the first to know when we launch. So, join the
            wait-list by submitting your details below.
          </p>
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
            {/* <p className={styles.textC}>KreateSell loading...</p> */}
          </div>
        </section>
      </div>
    </Layout>
  );
}
