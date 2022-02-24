import formatNumber from "utils/formatNumber";
import styles from "./index.module.scss";

const Performance = ({ sold, visit }) => {
  return (
    <>
      <div>
        <span className={styles.sold}>Sold:</span> {formatNumber(sold || 200)}
      </div>
      <div>
        <span className={styles.visit}>Visit:</span> {formatNumber(visit || 50)}
      </div>
    </>
  );
};

export default Performance;
