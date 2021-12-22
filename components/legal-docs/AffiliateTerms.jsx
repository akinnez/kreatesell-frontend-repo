import styles from "../../public/css/legal.module.scss";
import { QwA } from "./QwA";
import { affiliateTerms } from "./data/affiliate-terms";

export const AffiliateTerms = () => {
  const { mainTitle, data } = affiliateTerms;
  return (
    <section className={styles.tabs}>
      <div className={styles.item}>
        <h2 className={styles.heading}>{mainTitle}</h2>
        <QwA data={data} />
      </div>
    </section>
  );
};
