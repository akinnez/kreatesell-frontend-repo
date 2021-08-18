// import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
	Modal,
	Button,
	RecentAnalytics,
	StatsCard,
	DateHeader,
} from "../../../../components"
import AuthLayout from "../../../../components/authlayout";
import styles from "../../../../public/css/Dashboard.module.scss";

const Dashboard = () => {
	const [modalVisible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);
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

				<Modal
					onClose={() => setVisible(false)}
					visible={modalVisible}
					className={styles.modal}
					cancelPropagation={true}
				>
					<div className={styles.dashboardModal}>
						<div className={styles.modalTitle}>
							You're just getting started.
						</div>
						<p className={styles.content}>
							Welcome to Kreatesell, your simple ecommerce tool to sell your
							content, products <br /> and services across borders.
						</p>
						<div className={styles.buttonContainer}>
							<Button
								text="Setup Store"
								bgColor="white"
								className={styles.tipBtn}
							/>
							<Button
								text="Proceed to Dashboard"
								bgColor="blue"
								className={styles.proceedBtn}
								onClick={() => setVisible(false)}
							/>
						</div>
					</div>
				</Modal>
			</div>
		</AuthLayout>
	);
};

export default Dashboard;
