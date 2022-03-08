import Head from "next/head";
import { Typography, Card } from "antd";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import AbandonedCartsForm from "components/kreatorAbandonedCarts/components/AbandonedCartsForm";
import styles from "public/css/AbandonedCartsAddMail.module.scss";

const { Title, Text } = Typography;

const Add = () => (
  <ProfileLayout>
    <Head>
      <title>KreateSell | Add Abandoned Cart Mail</title>
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
            <Title level={2}>Add Email</Title>
            <Text>Create your custom email</Text>
          </div>
          <div>
            <AbandonedCartsForm />
          </div>
        </div>
      </Card>
    </section>
  </ProfileLayout>
);

export default Add;