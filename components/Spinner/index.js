import { Spin } from "antd";
import styles from "./index.module.scss";

const Spinner = () => (
  <div className={styles.spinnerWrapper}>
    <Spin size="large" />
  </div>
);

export default Spinner;
