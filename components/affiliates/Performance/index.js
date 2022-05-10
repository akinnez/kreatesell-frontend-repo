import formatNumber from "utils/formatNumber";
import styles from "./index.module.scss";

const Performance = ({ sold, visits }) => {
  return (
    <>
      <div>
        <span className={styles.sold}>Sold:</span> {formatNumber(sold || 0)}
      </div>
      <div>
        <span className={styles.visits}>Visit:</span>{" "}
        {formatNumber(visits || 0)}
      </div>
    </>
  );
};

export default Performance;
