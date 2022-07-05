import { useState } from "react";
import useSWR from "swr";
import { Typography, Row, Col, Button } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Spinner from "components/Spinner";
import SuccessModalBox from "components/SuccessModalBox";
import WithdrawModal from "../WithdrawModal";
import WalletInfo from "../WalletInfo";
import axiosApi from "utils/axios";
import { showToast } from "utils";
import styles from "./index.module.scss";

const { Text } = Typography;
const breakPoints = {
  xs: { span: 24 },
  md: { span: 12 },
};

const WalletBalance = ({ bankDetails, walletInfo, loading }) => {
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
              <WalletInfo
                title="Kreator"
                currency={currency}
                balance={kreatorBalance}
              >
                <div className={styles.withdraw__btn}>
                  <Button
                    size="large"
                    onClick={handleClicks(setWithdrawModal, true)}
                    disabled={parseFloat(kreatorBalance) <= 0}
                  >
                    Withdraw Funds $
                  </Button>
                </div>
              </WalletInfo>
            </Col>
            <Col {...breakPoints}>
              <WalletInfo
                title="Affiliate"
                currency={currency}
                balance={affiliateBalance.toFixed(2)}
              >
                <div className={styles.affiliate__info}>
                  <span>
                    <AiOutlineInfoCircle />
                  </span>
                  <span>
                    Money in your wallet will be withdrawn into your account
                    every Tuesday of the week.
                  </span>
                </div>
              </WalletInfo>
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
