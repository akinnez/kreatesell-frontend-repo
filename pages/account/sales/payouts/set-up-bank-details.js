import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Typography, Card, Button, Row, Col, Divider } from "antd";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import Spinner from "components/Spinner";
import PayoutsFormSuccess from "components/Payouts/components/PayoutsFormSuccess";
import CreateBankDetails from "components/Payouts/components/CreateBankDetails";
import AffiliateImg from "public/images/payouts-affiliate-icon.png";
import KreatorImg from "public/images/payouts-kreator-icon.png";
import AffiliateIllustration from "public/images/affiliate-illustration.png";
import KreatorIllustration from "public/images/kreator-illustration.png";
import styles from "public/css/SetupBankDetails.module.scss";

const { Title, Text } = Typography;

const breakPoints = {
  xs: { span: 24 },
  sm: { span: 24 },
};

const SetupBankDetails = () => {
  const [createModal, setCreateModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const router = useRouter();

  const { store, loading } = useSelector(state => state.store);
  const { bank_details: bankDetails } = store;

  useEffect(() => {
    if (bankDetails) {
      router.push("/account/sales/payouts?redirect=true");
    }
  }, [bankDetails, router]);

  const hideCreateModal = () => {
    setCreateModal(false);
  };

  const showCreateModal = () => {
    setCreateModal(true);
  };

  const showSuccessModal = () => {
    setSuccessModal(true);
  };

  if (loading || bankDetails) {
    return (
      <ProfileLayout>
        <Head>
          <title>KreateSell | Create Bank Details</title>
        </Head>
        <Spinner />
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <Head>
        <title>KreateSell | Create Bank Details</title>
      </Head>
      <div className={styles.back__btn}>
        <BackButton />
      </div>
      <section>
        <Row gutter={[{ md: 40 }, 50]} justify="space-between">
          <Col {...breakPoints} md={{ span: 9, order: 2 }}>
            <div className={styles.illustration}>
              <p>
                <Text>Kreator</Text>
              </p>
              <div className={styles.kreator__illustration}>
                <Image src={KreatorIllustration} alt="Kreator Illustration" />
              </div>
            </div>
            <Divider className={styles.divider} />
            <div className={styles.illustration}>
              <p>
                <Text>Affiliate</Text>
              </p>
              <div className={styles.affiliate__illustration}>
                <Image
                  src={AffiliateIllustration}
                  alt="Affiliate Illustration"
                />
              </div>
            </div>
          </Col>
          <Col {...breakPoints} md={{ span: 14, order: 1 }}>
            <Card className={styles.card__wrapper}>
              <div className={styles.header}>
                <Title>Set up Bank Details</Title>
                <p>
                  <Text>
                    Choose how you receive payments from your sales as a Kreator
                    or/and commissions as an Affiliate below
                  </Text>
                </p>
              </div>
              <div className={styles.icons__wrapper}>
                <div>
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
                </div>
                <div>
                  <Text>or</Text>
                </div>
                <div>
                  <div className={styles.image_bg}>
                    <div className={styles.image}>
                      <Image src={KreatorImg} alt="Kreator Icon" />
                    </div>
                  </div>
                  <p>
                    <Text>Kreator</Text>
                  </p>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  <Text>
                    Connect a bank account. Money from sales made as a kreator,
                    and affiliate commissions go directly to the assigned bank
                    account, mobile money wallet or PayPal address.
                  </Text>
                </p>
              </div>
              <div className={styles.btn__wrapper}>
                <Button size="large" onClick={showCreateModal}>
                  Connect Account
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
      {createModal && (
        <CreateBankDetails
          createModal={createModal}
          hideCreateModal={hideCreateModal}
          showSuccessModal={showSuccessModal}
        />
      )}
      {successModal && (
        <PayoutsFormSuccess successModal={successModal} title="Added" />
      )}
    </ProfileLayout>
  );
};

export default SetupBankDetails;
