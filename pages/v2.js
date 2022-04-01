import styles from "../styles/home.module.scss";
import { Navbar } from "components/Nav";
import MainAttention from "components/Attention";
import SneakPeak from "components/SneakPeak";
import SocialIcons from "components/SocialIcons";
import "antd/dist/antd.css";
import { Modal } from "antd";

export default function Home() {
  function showModalContent() {
    Modal.success({
      title: <Title />,
      content: <Content />,
      width: 700,
    });
  }
  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.doFlex}>
        <MainAttention showModal={showModalContent} />
        <SneakPeak />
      </section>
      <SocialIcons />
    </div>
  );
}

const Title = () => (
  <h1 className={styles.heading}>
    Hurray! You&rsquo;re on the exclusive wait-list.
  </h1>
);
const Content = () => (
  <p className={styles.content}>
    You&rsquo;ll be alerted immediately{" "}
    <span className={styles.blue}>Kreate</span>
    <span className={styles.green}>Sell</span> launches.
  </p>
);
