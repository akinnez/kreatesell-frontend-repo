import {useState, useEffect} from 'react';

import {useSelector} from 'react-redux';

import UserFilters from 'components/account-dashboard/UserFilters';
import DashboardLinks from 'components/account-dashboard/DashboardLinks';
import StatsHeader from 'components/account-dashboard/StatsHeader';
import {RecentKreatorAnalytics} from 'components/account-dashboard';
import {StatsCard} from 'components/account-dashboard/StatsCard';
import {GetSalesStatistics, GetAffiliateSalesStatistics} from 'redux/actions';

const KreatorDashboard = () => {
	const {salesStatistics} = useSelector((state) => state.store);
	const [_, setFiltered] = useState(null);

	const getSalesStatistics = GetSalesStatistics();
	const getAffiliateSalesStatistics = GetAffiliateSalesStatistics();

	useEffect(() => {
		getSalesStatistics();
		getAffiliateSalesStatistics();
	}, []);

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
			<RecentKreatorAnalytics />
		</div>
	);
};

export default KreatorDashboard;
