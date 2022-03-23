import { useState } from "react";
import Head from "next/head";
import AuthLayout from "../../../components/authlayout";
import { RecentAnalytics, StatsCard, DateHeader } from "../../../components";
import UserFilters from "components/account-dashboard/UserFilters";
import StatsHeader from "components/account-dashboard/StatsHeader";
import DashboardLinks from "components/account-dashboard/DashboardLinks";

const Kreator = () => {
  const [_, setFiltered] = useState(null);

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Kreator Dashboard</title>
      </Head>
      <div>
        <UserFilters data={[]} searchQuery="" setFiltered={setFiltered} />
        <section>
          <DashboardLinks />
        </section>
        <StatsHeader
          title="Kreator"
          orderUrl="/account/dashboard/kreator/orders"
        />
        <StatsCard
          name="Kreator"
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

export default Kreator;
