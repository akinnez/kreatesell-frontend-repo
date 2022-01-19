import { cookieData } from "./data/cookie-policy";
import styles from "../../public/css/legal.module.scss";
import { QwA } from "./QwA";

export const CookiePolicy = () => {
  const { mainTitle, data } = cookieData;
  return (
    <section className={styles.tabs}>
      <div className={styles.item}>
        <h2 className={styles.heading}>{mainTitle}</h2>
        <QwA data={data} />
        <h3 className={styles.question}>6. Contact Us</h3>
        <p className={styles.answer}>
          If you have any questions about this Cookies Policy, You can contact
          us at
          <a href="mailto:support@kreatesell.com" style={{ marginLeft: "3px" }}>
            support@kreatesell.com
          </a>
        </p>
      </div>
    </section>
  );
};
