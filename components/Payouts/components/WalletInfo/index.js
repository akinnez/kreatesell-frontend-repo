import { useState } from "react";
import { Button } from "antd";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import styles from "./index.module.scss";

const WalletInfo = ({ children, title, currency, balance }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className={`${styles.box} ${styles.kreator__box}`}>
      <div className={styles.title}>
        <span>{title}&#39;s Wallet Balance</span>
        <Button shape="circle" type="text" onClick={handleToggle}>
          {toggle ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </Button>
      </div>
      <div
        className={
          toggle ? `${styles.amount}` : `${styles.no__select} ${styles.amount}`
        }
      >
        {toggle ? `${currency} ${balance}` : "************"}
      </div>
      {children}
    </div>
  );
};

export default WalletInfo;
