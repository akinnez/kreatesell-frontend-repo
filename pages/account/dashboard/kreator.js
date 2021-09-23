import AuthLayout from "../../../components/authlayout";
import { RecentAnalytics, StatsCard, DateHeader } from "../../../components";

const kreator = () => {
	return (
		<AuthLayout>
			<div>
				<DateHeader />
				<StatsCard
					name="Kreator"
					totalVisits="123456"
					unitSales="123456"
					grossSales="123456"
					profit="123456"
				/>
				<RecentAnalytics />
			</div>
		</AuthLayout>
	);
};

export default kreator;
