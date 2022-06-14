import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Typography, Card } from "antd";
import Spinner from "components/Spinner";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import SuccessModalBox from "components/SuccessModalBox";
import AbandonedCartsForm from "components/kreatorAbandonedCarts/components/AbandonedCartsForm";
import useFetchData from "hooks/useFetchData";
import styles from "public/css/AbandonedCartsMail.module.scss";

const { Title, Text } = Typography;

const Edit = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { query, push } = useRouter();

  const { data: campaign, error } = useFetchData(
    query.id
      ? `${process.env.BASE_URL}v1/kreatesell/product/campaign/get/${query.id}`
      : null
  );

  if (error) {
    return (
      <ProfileLayout>
        <Head>
          <title>KreateSell | Edit Mail</title>
        </Head>
        <header className={styles.back__btn}>
          <BackButton />
        </header>
        <section className={styles.error}>{error}</section>
      </ProfileLayout>
    );
  }

  if (!campaign) {
    return (
      <ProfileLayout>
        <Head>
          <title>KreateSell | Edit Mail</title>
        </Head>
        <header className={styles.back__btn}>
          <BackButton />
        </header>
        <Spinner />
      </ProfileLayout>
    );
  }

  const showModal = () => {
    setModalIsVisible(true);
  };

  const redirect = () => {
    push("/account/kreator/abandoned-carts");
  };

  return (
    <>
      <ProfileLayout>
        <Head>
          <title>KreateSell | Edit Mail</title>
        </Head>
        <div className={styles.back__btn}>
          <BackButton />
        </div>
        <header className={styles.header}>
          <Title>Campaigns</Title>
          <Text>
            Create valuable, personal touches at scale with your email
            campaigns.
          </Text>
        </header>
        <section>
          <Card className={styles.card__container}>
            <div className={styles.container}>
              <div className={styles.title}>
                <Title level={2}>Edit Email</Title>
                <Text>Edit your custom email</Text>
              </div>
              <div>
                <AbandonedCartsForm
                  showModal={showModal}
                  campaign={campaign.data.result}
                />
              </div>
            </div>
          </Card>
        </section>
      </ProfileLayout>
      {modalIsVisible && (
        <SuccessModalBox modalIsVisible={modalIsVisible} closeModal={redirect}>
          <section className={styles.content}>
            <p>Email Successfully Edited</p>
          </section>
        </SuccessModalBox>
      )}
    </>
  );
};

export default Edit;
