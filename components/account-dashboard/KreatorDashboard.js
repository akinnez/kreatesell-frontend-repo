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
      <StatsCard totalVisits="0" unitSales="0" grossSales="0" profit="0" />
      <RecentAnalytics />
    </div>
  );
};

export default KreatorDashboard;
