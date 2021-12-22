import { termsData } from "./data/terms-of-service";
import styles from "../../public/css/legal.module.scss";
import { QwA } from "./QwA";

export const TermsOfService = () => {
  const { mainTitle, data } = termsData;
  return (
    <section className={styles.tabs}>
      <div className={styles.item}>
        <h2 className={styles.heading}>{mainTitle}</h2>
        <QwA data={data} />
      </div>
    </section>
  );
};
