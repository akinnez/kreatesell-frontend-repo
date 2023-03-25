import styles from "../styles/home.module.scss";
import { Navbar } from "components/Nav";
import MainAttention from "components/Attention";
import SneakPeak from "components/SneakPeak";
// import SocialIcons from "components/SocialIcons";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { Footer } from "components";
import WaitlistModal from "./WaitlistModal/WaitlistModal";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  function detailsSubmissionSuccess(msg = "") {

    const isAlreadyOnList = msg === "already on wait-list";
    const guestStatus = isAlreadyOnList ? "already on" : "on";

    Modal.success({
      title: (
        <Title
          text={
            <span>
              {isAlreadyOnList ? "" : `Hurray! `}
              You&rsquo;re {guestStatus} the exclusive wait-list.
            </span>
          }
        />
      ),
      content: isAlreadyOnList ? (
        <FinalMsg text="Thank you for registering." />
      ) : ( 
        <Content />
      ),
      width: 700,
    });
  }

  function detailsSubmissionFailure() {
    Modal.error({
      title: (
        <Title
          text={"Sorry, we encountered a problem while saving your details."}
        />
      ),
      content: <FinalMsg text="Please, try again." />,
      width: 700,
    });
  }

  return (
    <>
      {showModal && <WaitlistModal setShowModal={setShowModal}
        showSubmissionSuccessModal={detailsSubmissionSuccess}
        showSubmissionFailureModal={detailsSubmissionFailure} />}
      <div className={styles.container}>
        <Navbar />
        <section className={styles.doFlex}>
          <MainAttention
            showSubmissionSuccessModal={detailsSubmissionSuccess}
            showSubmissionFailureModal={detailsSubmissionFailure}
            setShowModal={setShowModal}
          />
          <SneakPeak setShowModal={setShowModal} />
        </section>
        {/* <SocialIcons /> */}
        <Footer />
      </div>
    </>
  );
}


const Title = ({ text }) => <h1 className={styles.heading}>{text}</h1>;


const Content = () => (
  <p className={styles.content}>
    You&rsquo;ll be alerted immediately{" "}
    <span className={styles.blue}>Kreate</span>
    <span className={styles.green}>Sell</span> launches.
  </p>
);


const FinalMsg = ({ text }) => <p className={styles.content}>{text}</p>