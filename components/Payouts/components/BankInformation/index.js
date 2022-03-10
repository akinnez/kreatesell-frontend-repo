import { Typography } from "antd";
import styles from "./index.module.scss";

const { Text } = Typography;

const BankInformation = ({ bankDetails }) => (
  <div className={styles.bank__info__details}>
    <p>
      <Text>Currency:</Text>
      <Text>&nbsp; {bankDetails.currency || "NGN"}</Text>
    </p>
    <p>
      <Text>Bank Name:</Text>
      <Text>&nbsp; {bankDetails.bank_name}</Text>
    </p>
    <p>
      <Text>Account Number:</Text>
      <Text>&nbsp; {bankDetails.account_number}</Text>
    </p>
    <p>
      <Text>Account Name:</Text>
      <Text>&nbsp; {bankDetails.account_name}</Text>
    </p>
  </div>
);

export default BankInformation;
