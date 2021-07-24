import { AuthLayout } from "../../../components/authlayout";
import styles from "../../../public/css/Dashboard.module.scss";

const Dashboard = () => {
	return (
		<AuthLayout>
			<div className={styles.container}>
				<h3>Hello Dashboard screen</h3>
			</div>
		</AuthLayout>
	);
};

export default Dashboard;
