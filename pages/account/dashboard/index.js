import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Modal, Button, Typography } from "antd";
import { StatsCard } from "components/account-dashboard/StatsCard";
import AuthLayout from "components/authlayout";
import DashboardFilters from "components/account-dashboard/DashboardFilters";
import StatsHeader from "components/account-dashboard/StatsHeader";
import styles from "public/css/DashboardPage.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";

const { Text, Title } = Typography;

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [_, setFiltered] = useState(null);

  const user = useSelector((state) => state?.auth?.user);
  const isFirstTimer = useSelector(
    (state) => state?.store?.store?.user?.is_first_time
    // (state) => state?.store?.store
  );

  // const User = localStorage.getItem("user");

  const hideModal = async () => {
    setModalVisible(false);
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}v1/kreatesell/store/welcome-message`
      );
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isAffiliate = user?.is_affiliate;

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
          <StatsCard totalVisits="0" unitSales="0" grossSales="0" profit="0" />
        </div>
        {/* show only when user is an affiliate */}
        {isAffiliate && (
          <div className={styles.stats__container}>
            <StatsHeader title="Affiliate" url="/account/dashboard/affiliate" />
            <StatsCard
              totalVisits="0"
              unitSales="0"
              grossSales="0"
              profit="0"
            />
          </div>
        )}
      </section>

      {isFirstTimer && (
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
                  You&apos;re few minutes away from selling your e-books, online
                  courses, templates, memberships and subscriptions on an
                  amazing all-in-one edtech platform.
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
      )}
    </AuthLayout>
  );
};

export default Dashboard;
