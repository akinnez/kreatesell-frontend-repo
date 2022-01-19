import React, { useState, useEffect } from "react";
import AuthLayout from "../../../../components/authlayout";
import { Card, Tabs } from "antd";
import style from "../../../../public/css/payout.module.scss";
import HelpHeader from "components/HelpComponents/header";
import useSWR from "swr";
import axios from "axios";
import Loader from "components/loader";
import { getUserToken } from "utils";
import TicketTable from "components/KreatorTickets/TicketTable";
import CustomErrorPage from "components/CustomErrorPage/CustomErrorPage";

const Index = (props) => {
  const ticketsURL = `${process.env.BASE_URL}auth/KreatorTickets`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tickets, setTickets] = useState([]);

  const getUsertTickets = async () => {
    const token = await getUserToken();
    try {
      const res = await axios.get(ticketsURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets(res?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setError(true);
    }
  };

  useEffect(() => {
    getUsertTickets();
  }, []);

  if (error) {
    return <CustomErrorPage />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AuthLayout>
        <HelpHeader />
        <Card bordered={false} className={style.card}>
          <TicketTable tickets={tickets} />
        </Card>
      </AuthLayout>
    </>
  );
};

export default Index;
