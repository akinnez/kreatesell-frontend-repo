import styles from "../styles/home.module.scss";
import { Navbar } from "components/Nav";
import MainAttention from "components/Attention";
import SneakPeak from "components/SneakPeak";
import SocialIcons from "components/SocialIcons";
import "antd/dist/antd.css";
import { Modal } from "antd";

export default function Home() {
  function detailsSubmissionSuccess() {
    Modal.success({
      title: (
        <Title
          text={() => (
            <span> Hurray! You&rsquo;re on the exclusive wait-list.</span>
          )}
        />
      ),
      content: <Content />,
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
      content: <p className={styles.content}>Please, try again.</p>,
      width: 700,
    });
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.doFlex}>
        <MainAttention
          showSubmissionSuccessModal={detailsSubmissionSuccess}
          showSubmissionFailureModal={detailsSubmissionFailure}
        />
        <SneakPeak />
      </section>
      <SocialIcons />
    </div>
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
