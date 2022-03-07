import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Typography, Card, Button, Row, Col } from "antd";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import PayoutsForm from "components/Payouts/components/PayoutsForm";
import AffiliateImg from "public/images/payouts-affiliate-icon.png";
import KreatorImg from "public/images/payouts-kreator-icon.png";
import styles from "public/css/SetupBankDetails.module.scss";

const { Title, Text } = Typography;

const SetupBankDetails = () => {
  const [modal, setModal] = useState(true);

  const hideModal = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };
  return (
    <ProfileLayout>
      <Head>
        <title>KreateSell | Create Bank Details</title>
      </Head>
      <div>
        <BackButton />
      </div>
      <header className={styles.header}>
        <Title>Set up Bank Details</Title>
        <p>
          <Text>
            Choose how you receive payments from your sales as a Kreator or/and
            commissions as an Affiliate below
          </Text>
        </p>
      </header>
      <section>
        <Card className={styles.card__wrapper}>
          <div className={styles.icons__header}>
            <Row align="middle" justify="space-between">
              <Col>
                <div className={styles.image_bg}>
                  <div
                    className={`${styles.image}  ${styles.affiliate__image}`}
                  >
                    <Image src={AffiliateImg} alt="Affiliate Icon" />
                  </div>
                </div>
                <p>
                  <Text>Affiliate</Text>
                </p>
              </Col>
              <Col className={styles.divider}>
                <Text>or</Text>
              </Col>
              <Col>
                <div className={styles.image_bg}>
                  <div className={styles.image}>
                    <Image src={KreatorImg} alt="Kreator Icon" />
                  </div>
                </div>
                <p>
                  <Text>Kreator</Text>
                </p>
              </Col>
            </Row>
          </div>
          <div className={styles.content}>
            <p>
              <Text>
                Connect a bank account. Money from sales made as a kreator, and
                affiliate commissions go directly to the assigned bank account,
                mobile money wallet or PayPal address.
              </Text>
            </p>
          </div>
          <div className={styles.btn__wrapper}>
            <Button size="large" onClick={showModal}>
              Connect Account
            </Button>
          </div>
        </Card>
      </section>
      {modal && <PayoutsForm show={modal} hide={hideModal} />}
    </ProfileLayout>
  );
};

export default SetupBankDetails;
