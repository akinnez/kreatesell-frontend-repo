import {useState} from 'react';
import Head from 'next/head';
import {RecentAnalytics, StatsCard, DateHeader} from '../../../components';
import AuthLayout from '../../../components/authlayout';
import UserFilters from 'components/account-dashboard/UserFilters';
import StatsHeader from 'components/account-dashboard/StatsHeader';
import DashboardLinks from 'components/account-dashboard/DashboardLinks';
import TelegramFloatingDiv from 'components/FloatingDivs/TelegramFloatingDiv';

const Affiliate = () => {
	const [_, setFiltered] = useState(null);

	return (
		<AuthLayout headerTitle="Dashboard">
			<Head>
				<title>KreateSell | Affiliate Dashboard</title>
			</Head>
			<div>
				<TelegramFloatingDiv left="15%" top="60%" />
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
					totalVisits="0"
					unitSales="0"
					grossSales="0"
					profit="0"
				/>
				<RecentAnalytics />
			</div>
		</AuthLayout>
	);
};

export default Affiliate;
