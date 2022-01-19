// import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
	Modal,
	Button,
	StatsCard,
	DateHeader,
	// RecentAnalytics,
} from "../../../components";
import AuthLayout from "../../../components/authlayout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../../public/css/Dashboard.module.scss";
import { GetStoreDetails } from "../../../redux/actions";

const Dashboard = () => {
	const router = useRouter();
	const getStoreDetails = GetStoreDetails();

	const [modalVisible, setVisible] = useState(false);
	const { user } = useSelector((state) => state.utils);

	useEffect(() => {
		setVisible(true);
		getStoreDetails();
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

				{/* <RecentAnalytics /> */}

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
							{user?.percentage_completed !== 100 && (
								<Button
									text="Setup Store"
									bgColor="white"
									className={styles.tipBtn}
									onClick={() => router.push("/account/kreator/store")}
								/>
							)}

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
