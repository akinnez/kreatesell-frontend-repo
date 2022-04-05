import { useState } from "react";
import Head from "next/head";
import { RecentAnalytics, StatsCard, DateHeader } from "../../../components";
import AuthLayout from "../../../components/authlayout";
import UserFilters from "components/account-dashboard/UserFilters";
import StatsHeader from "components/account-dashboard/StatsHeader";
import DashboardLinks from "components/account-dashboard/DashboardLinks";

const Affiliate = () => {
  const [_, setFiltered] = useState(null);

  return (
    <AuthLayout headerTitle="Dashboard">
      <Head>
        <title>KreateSell | Affiliate Dashboard</title>
      </Head>
      <div>
        <UserFilters data={[]} searchQuery="" setFiltered={setFiltered} />
        <section>
          <DashboardLinks />
        </section>
        <StatsHeader title="Affiliate" orderUrl="/account/sales/transactions" />
        <StatsCard totalVisits="0" unitSales="0" grossSales="0" profit="0" />
        <RecentAnalytics />
      </div>
    </AuthLayout>
  );
};

export default Affiliate;
