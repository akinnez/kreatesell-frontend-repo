import styles from "./sneakPeak.module.scss";

const SneakPeak = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Sneak peek of what to expect</h3>
      <ol>
        <li className={styles.offers}>
          <span className={styles.animateFire}>•</span> Free digital products
          upload.
        </li>
        <li className={styles.offers}>
          <span className={styles.animateFire}>•</span> 21 supported currencies.
        </li>
        <li className={styles.offers}>
          <span className={styles.animateFire}>•</span> Earn massively from
          borderless sales.
        </li>
        <li className={styles.offers}>
          <span className={styles.animateFire}>•</span> Army of affiliate
          marketers to sell your digital product(s) for you.
        </li>
        <li className={styles.offers}>
          <span className={styles.animateFire}>•</span> 24/7 customer support.{" "}
        </li>
        <li className={styles.offers}>
          <span className={styles.animateFire}>•</span> Automated done-for-you
          payment and follow up processes.
        </li>
        <li className={styles.offers}>
          <span className={styles.animateFire}>•</span> And so much more...
        </li>
      </ol>
    </div>
  );
};

export default SneakPeak;
