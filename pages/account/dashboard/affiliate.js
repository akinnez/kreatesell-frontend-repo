import { RecentAnalytics, StatsCard, DateHeader } from "../../../components";
import AuthLayout from "../../../components/authlayout";

const Affiliate = () => {
	return (
		<AuthLayout>
			<DateHeader />
			<StatsCard
				name="Affiliate"
				totalVisits="123456"
				unitSales="123456"
				grossSales="123456"
				profit="123456"
			/>
			<RecentAnalytics />
		</AuthLayout>
	);
};

export default Affiliate;
