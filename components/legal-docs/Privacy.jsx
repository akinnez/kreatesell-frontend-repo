import styles from "../../public/css/legal.module.scss";
import { QwA } from "./QwA";
import { privacyData } from "./data/privacy-policy";

export const Privacy = () => {
  const { mainTitle, data } = privacyData;
  return (
    <section className={styles.tabs}>
      <div className={styles.item}>
        <h2 className={styles.heading}>{mainTitle}</h2>
        <QwA data={data} />
      </div>
    </section>
  );
};
