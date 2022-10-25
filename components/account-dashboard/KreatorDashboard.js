import {useState} from 'react';
import UserFilters from 'components/account-dashboard/UserFilters';
import DashboardLinks from 'components/account-dashboard/DashboardLinks';
import StatsHeader from 'components/account-dashboard/StatsHeader';
import {RecentAnalytics} from 'components/account-dashboard/Recent';
import {StatsCard} from 'components/account-dashboard/StatsCard';
import {useSelector} from 'react-redux';
const KreatorDashboard = () => {
	const {salesStatistics} = useSelector((state) => state.store);
	const [_, setFiltered] = useState(null);

	return (
		<div>
			<UserFilters data={[]} searchQuery="" setFiltered={setFiltered} />
			<section>
				<DashboardLinks />
			</section>
			<StatsHeader
				title="Kreator"
				orderUrl="/account/sales/transactions"
			/>
			<StatsCard
				totalVisits={salesStatistics.total_visits}
				unitSales={salesStatistics.total_sales}
				grossSales={salesStatistics.gross_sales}
				profit={salesStatistics.profits}
			/>
			<RecentAnalytics />
		</div>
	);
};

export default KreatorDashboard;
