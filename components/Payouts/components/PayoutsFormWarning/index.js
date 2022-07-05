import { Typography } from "antd";
import styles from "./index.module.scss";

const { Text } = Typography;

const PayoutsFormWarning = () => (
  <div className={styles.form__warning}>
    <p>
      <Text>Please read carefully</Text>
    </p>
    <p>
      <Text>Make sure your account details are correct before proceeding.</Text>
    </p>
    <p>
      <Text>
        We will not be held liable for failed transactions resulting from
        incorrect bank details.
      </Text>
    </p>
  </div>
);

export default PayoutsFormWarning;
