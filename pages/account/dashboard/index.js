import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Modal, Button, Typography } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import { StatsCard } from "components/account-dashboard/StatsCard";
import AuthLayout from "components/authlayout";
import DashboardFilters from "components/account-dashboard/DashboardFilters";
import StatsHeader from "components/account-dashboard/StatsHeader";
import styles from "public/css/DashboardPage.module.scss";

const { Text, Title } = Typography;

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [_, setFiltered] = useState(null);

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Dashboard</title>
      </Head>
      <header>
        <DashboardFilters data={[]} setFiltered={setFiltered} />
      </header>
      <section>
        <div className={styles.stats__container}>
          <StatsHeader title="Kreator" url="/account/dashboard/kreator" />
          <StatsCard
            totalVisits="123,456"
            unitSales="123,456"
            grossSales="123,456"
            profit="123,456"
          />
        </div>
        <div className={styles.stats__container}>
          <StatsHeader title="Affiliate" url="/account/dashboard/affiliate" />
          <StatsCard
            totalVisits="123,456"
            unitSales="123,456"
            grossSales="123,456"
            profit="123,456"
          />
        </div>
      </section>

      <Modal
        title={null}
        footer={null}
        closable={false}
        onCancel={hideModal}
        visible={modalVisible}
        maskClosable={false}
        width={700}
      >
        <div className={styles.modal__wrapper}>
          <header className={styles.header}>
            <Title>Thrilled to welcome you on board </Title>
          </header>
          <div className={styles.content}>
            <p>
              <Text>
                You’re a few minutes away from selling your e-books, online
                courses, memberships and subscriptions on an all-in-one
                e-commerce platform.
              </Text>
            </p>
          </div>
          <footer className={styles.footer}>
            {/* {user?.percentage_completed !== 100 && ( */}
            <Link href="/account/dashboard/affiliate">
              <a>Tips to sell your contents</a>
            </Link>
            <Button size="large" type="primary" onClick={hideModal}>
              Proceed to Dashboard
            </Button>
          </footer>
        </div>
      </Modal>
    </AuthLayout>
  );
};

export default Dashboard;
