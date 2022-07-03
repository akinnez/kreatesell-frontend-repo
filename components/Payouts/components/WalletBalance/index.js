import { useState } from "react";
import useSWR from "swr";
import { Typography, Row, Col, Button } from "antd";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import Spinner from "components/Spinner";
import SuccessModalBox from "components/SuccessModalBox";
import WithdrawModal from "../WithdrawModal";
import styles from "./index.module.scss";

const { Text } = Typography;
const breakPoints = {
  xs: { span: 24 },
  md: { span: 12 },
};

const WalletBalance = ({ bankDetails, walletInfo, loading }) => {
  const [kreator, setKreator] = useState(false);
  const [affiliate, setAffiliate] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { data: affiliateBalance } = useSWR(
    `${process.env.BASE_URL}affiliate/get-wallet-account-balance`,
    url => {
      return axiosApi.request(
        "get",
        url,
        res => res.data,
        () => {
          showToast("An error occurred fetching your account balance", "error");
        }
      );
    }
  );

  const handleToggle = (setter, value) => () => {
    setter(!value);
  };

  const handleClicks = (setter, value) => () => {
    setter(value);
  };

  const { currency, available_balance: kreatorBalance } = walletInfo[0];

  return (
    <header className={styles.header}>
      <div className={styles.card}>
        {loading ||
        affiliateBalance === null ||
        affiliateBalance === undefined ? (
          <Spinner />
        ) : (
          <Row gutter={[40, 16]}>
            <Col {...breakPoints}>
              <div className={`${styles.box} ${styles.kreator__box}`}>
                <div className={styles.title}>
                  <span>Kreator&#39;s Wallet Balance</span>
                  <Button
                    shape="circle"
                    type="text"
                    onClick={handleToggle(setKreator, kreator)}
                  >
                    {kreator ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Button>
                </div>
                <div className={styles.amount}>
                  {kreator ? `${currency} ${kreatorBalance}` : "************"}
                </div>
                <div className={styles.withdraw__btn}>
                  <Button
                    size="large"
                    onClick={handleClicks(setWithdrawModal, true)}
                  >
                    Withdraw Funds $
                  </Button>
                </div>
              </div>
            </Col>
            <Col {...breakPoints}>
              <div className={`${styles.box} ${styles.affiliate__box}`}>
                <div className={styles.title}>
                  <span>Affiliate&#39;s Wallet Balance</span>
                  <Button
                    shape="circle"
                    type="text"
                    onClick={handleToggle(setAffiliate, affiliate)}
                  >
                    {affiliate ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Button>
                </div>
                <div className={styles.amount}>
                  {affiliate
                    ? `${currency} ${affiliateBalance.toFixed(2)}`
                    : "************"}
                </div>
                <div className={styles.affiliate__info}>
                  <span>
                    <AiOutlineInfoCircle />
                  </span>
                  <span>
                    Money in your wallet will be withdrawn into your account
                    every Tuesday of the week.
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
      {withdrawModal && (
        <WithdrawModal
          withdrawModal={withdrawModal}
          hideModal={handleClicks(setWithdrawModal, false)}
          showSuccess={handleClicks(setSuccessModal, true)}
          currency={currency}
          balance={kreatorBalance}
          bankDetails={bankDetails}
        />
      )}
      {successModal && (
        <SuccessModalBox
          modalIsVisible={successModal}
          closeModal={handleClicks(setSuccessModal, false)}
          closable={false}
        >
          <section className={styles.content}>
            <p>
              <Text>Money is being processed</Text>
            </p>
            <p>
              <Text>
                Kindly exercise patience while we process your funds. Processing
                takes about 24 hours before reflecting in your account
              </Text>
            </p>
          </section>
        </SuccessModalBox>
      )}
    </header>
  );
};

export default WalletBalance;
