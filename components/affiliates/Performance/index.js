import formatNumber from "utils/formatNumber";
import styles from "./index.module.scss";

const Performance = ({ sold, visits }) => {
  return (
    <>
      <div>
        <span className={styles.sold}>Sold:</span> {formatNumber(sold)}
      </div>
      <div>
        <span className={styles.visits}>Visit:</span> {formatNumber(visits)}
      </div>
    </>
  );
};

export default Performance;
