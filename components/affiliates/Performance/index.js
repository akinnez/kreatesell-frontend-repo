import formatNumber from "utils/formatNumber";
import styles from "./index.module.scss";

const Performance = ({ sold, visit }) => {
  return (
    <>
      <div>
        <span className={styles.sold}>Sold:</span> {formatNumber(sold || 0)}
      </div>
      <div>
        <span className={styles.visit}>Visit:</span> {formatNumber(visit || 0)}
      </div>
    </>
  );
};

export default Performance;
