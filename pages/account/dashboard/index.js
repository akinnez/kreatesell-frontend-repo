// import { format } from "date-fns";
import { AuthLayout } from "../../../components/authlayout";
import styles from "../../../public/css/Dashboard.module.scss";
import { RecentAnalytics, StatsCard, DateHeader } from "./partials";

const Dashboard = () => {
	return (
		<AuthLayout>
			<div className={styles.container}>
				<DateHeader />

				<StatsCard
					name="Kreator"
					totalVisits="123456"
					unitSales="123456"
					grossSales="123456"
					profit="123456"
				/>

				<StatsCard
					name="Affiliate"
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

export default Dashboard;
