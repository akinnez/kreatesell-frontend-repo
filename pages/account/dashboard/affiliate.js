import {useState, useEffect} from 'react';
import Head from 'next/head';

import {useSelector} from 'react-redux';

import {RecentAnalytics, StatsCard, DateHeader} from '../../../components';
import AuthLayout from '../../../components/authlayout';
import UserFilters from 'components/account-dashboard/UserFilters';
import StatsHeader from 'components/account-dashboard/StatsHeader';
import DashboardLinks from 'components/account-dashboard/DashboardLinks';
import {GetSalesStatistics, GetAffiliateSalesStatistics} from 'redux/actions';

const Affiliate = () => {
	const [_, setFiltered] = useState(null);
	const {affiliateSalesStatistics} = useSelector((state) => state.store);

	const getSalesStatistics = GetSalesStatistics();
	const getAffiliateSalesStatistics = GetAffiliateSalesStatistics();

	useEffect(() => {
		getSalesStatistics();
		getAffiliateSalesStatistics();
	}, []);

	return (
		<AuthLayout headerTitle="Dashboard">
			<Head>
				<title>KreateSell | Affiliate Dashboard</title>
			</Head>
			<div>
				<UserFilters
					data={[]}
					searchQuery=""
					setFiltered={setFiltered}
				/>
				<section>
					<DashboardLinks />
				</section>
				<StatsHeader
					title="Affiliate"
					orderUrl="/account/sales/revenue"
				/>
				<StatsCard
					totalVisits={affiliateSalesStatistics.total_visits}
					unitSales={affiliateSalesStatistics.total_sales}
					grossSales={affiliateSalesStatistics.gross_sales}
					profit={affiliateSalesStatistics.profits}
					isAffiliateCard={true}
				/>
				<RecentAnalytics />
			</div>
		</AuthLayout>
	);
};

export default Affiliate;
