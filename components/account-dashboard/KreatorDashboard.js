import { useState } from "react";
import UserFilters from "components/account-dashboard/UserFilters";
import DashboardLinks from "components/account-dashboard/DashboardLinks";
import StatsHeader from "components/account-dashboard/StatsHeader";
import { RecentAnalytics } from "components/account-dashboard/Recent";
import { StatsCard } from "components/account-dashboard/StatsCard";

const KreatorDashboard = () => {
  const [_, setFiltered] = useState(null);

  return (
    <div>
      <UserFilters data={[]} searchQuery="" setFiltered={setFiltered} />
      <section>
        <DashboardLinks />
      </section>
      <StatsHeader title="Kreator" orderUrl="/account/sales/transactions" />
      <StatsCard
        totalVisits="123,456"
        unitSales="123,456"
        grossSales="123,456"
        profit="123,456"
      />
      <RecentAnalytics />
    </div>
  );
};

export default KreatorDashboard;
