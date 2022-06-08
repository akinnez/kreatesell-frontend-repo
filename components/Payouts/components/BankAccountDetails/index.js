import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button, Typography } from "antd";
import SuccessModalBox from "components/SuccessModalBox";
import EditBankDetails from "../EditBankDetails";
import BankInformation from "../BankInformation";
import ClipboardImg from "public/images/clipboards.png";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const BankAccountDetails = ({ bankDetails }) => {
  const [editModal, setEditModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleClicks = (setter, value) => () => {
    setter(value);
  };

  return (
    <>
      <Card className={styles.card__wrapper}>
        <header className={styles.header}>
          <Title level={2}>Your Bank Account Details</Title>
        </header>
        <section>
          {bankDetails ? (
            <div className={styles.bank__details}>
              <p>
                <Text>
                  We pay the money made from your sales into this account.
                </Text>
              </p>
              <BankInformation bankDetails={bankDetails} />
              <Button
                type="primary"
                size="large"
                onClick={handleClicks(setEditModal, true)}
              >
                Change Payout Account Settings
              </Button>
              {editModal && (
                <EditBankDetails
                  editModal={editModal}
                  hideEditModal={handleClicks(setEditModal, false)}
                  bankDetails={bankDetails}
                  showSuccessModal={handleClicks(setSuccessModal, true)}
                />
              )}
              {successModal && (
                <SuccessModalBox
                  modalIsVisible={successModal}
                  closeModal={handleClicks(setSuccessModal, false)}
                >
                  <section className={styles.content}>
                    <p>
                      <Text>Account Details Successfully Updated</Text>
                    </p>
                    <p>
                      <Text>
                        Congratulations! You can now start seamlessly receiving
                        your settlement in your new account as at when due.
                      </Text>
                    </p>
                  </section>
                </SuccessModalBox>
              )}
            </div>
          ) : (
            <div className={styles.no__bank__details}>
              <div className={styles.image__container}>
                <Image src={ClipboardImg} alt="Picture of two clipboards" />
                <p>
                  <Text>No account set yet</Text>
                </p>
              </div>
              <p>
                <Text>
                  To start receiving money from your sales ensure you setup your
                  bank details
                </Text>
              </p>
              <Link href="/account/sales/payouts/set-up-bank-details">
                <a>Setup Bank Details</a>
              </Link>
            </div>
          )}
        </section>
      </Card>
    </>
  );
};

export default BankAccountDetails;
