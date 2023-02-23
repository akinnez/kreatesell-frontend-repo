import Head from 'next/head';
import AuthLayout from '../../../components/authlayout';
import KreatorDashboard from 'components/account-dashboard/KreatorDashboard';
import TelegramFloatingDiv from 'components/FloatingDivs/TelegramFloatingDiv';

const Kreator = () => (
	<AuthLayout headerTitle="Dashboard">
		<Head>
			<title>KreateSell | Kreator Dashboard</title>
		</Head>
		<TelegramFloatingDiv left="15%" top="60%" />
		<KreatorDashboard />
	</AuthLayout>
);

export default Kreator;
