import { useState } from "react";
import useSWR from "swr";
import { Card, Typography, Row, Col, Button } from "antd";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import Spinner from "components/Spinner";
import WithdrawModal from "../WithdrawModal";
import SuccessModal from "../SuccessModal";
import walletFetcher from "../../utils/walletFetcher";
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
    url => walletFetcher(url, "An error occurred fetching your account balance")
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
      <Card>
        {loading ||
        affiliateBalance === null ||
        affiliateBalance === undefined ? (
          <Spinner />
        ) : (
          <Row gutter={[40, { xs: 40, sm: 40 }]}>
            <Col {...breakPoints}>
              <div className={`${styles.box} ${styles.kreator__box}`}>
                <div className={styles.title}>
                  <p>
                    <Text>Kreator&#39;s Wallet Balance</Text>
                  </p>
                  <Button
                    shape="circle"
                    type="text"
                    onClick={handleToggle(setKreator, kreator)}
                  >
                    {kreator ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Button>
                </div>
                <p>
                  <Text>
                    {kreator ? `${currency} ${kreatorBalance}` : "************"}
                  </Text>
                </p>
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
                  <p>
                    <Text>Affiliate&#39;s Wallet Balance</Text>
                  </p>
                  <Button
                    shape="circle"
                    type="text"
                    onClick={handleToggle(setAffiliate, affiliate)}
                  >
                    {affiliate ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Button>
                </div>
                <p>
                  <Text>
                    {affiliate
                      ? `${currency} ${affiliateBalance.toFixed(2)}`
                      : "************"}
                  </Text>
                </p>
                <div className={styles.affiliate__info}>
                  <span>
                    <AiOutlineInfoCircle />
                  </span>
                  <Text>
                    Money in your wallet will be withdrawn into your account
                    every Tuesday of the week.
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Card>
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
        <SuccessModal
          successModal={successModal}
          hideModal={handleClicks(setSuccessModal, false)}
          closable={false}
        >
          <p>
            <Text>Money is being processed</Text>
          </p>
          <p>
            <Text>
              Kindly exercise patience while we process your funds. Processing
              takes about 24 hours before reflecting in your account
            </Text>
          </p>
        </SuccessModal>
      )}
    </header>
  );
};

export default WalletBalance;
