import Head from "next/head";
import { Typography, Card } from "antd";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import AbandonedCartsForm from "components/kreatorAbandonedCarts/components/AbandonedCartsForm";
import { editMailData } from "components/kreatorAbandonedCarts/data/editMailData";
import styles from "public/css/AbandonedCartsEditMail.module.scss";

const { Title, Text } = Typography;

const Edit = () => (
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
        Create valuable, personal touches at scale with your email campaigns.
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
            <AbandonedCartsForm editMailData={editMailData} />
          </div>
        </div>
      </Card>
    </section>
  </ProfileLayout>
);

export default Edit;
