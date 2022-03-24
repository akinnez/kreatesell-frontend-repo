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
        <StatsCard
          totalVisits="123,456"
          unitSales="123,456"
          grossSales="123,456"
          profit="123,456"
        />
        <RecentAnalytics />
      </div>
    </AuthLayout>
  );
};

export default Affiliate;
