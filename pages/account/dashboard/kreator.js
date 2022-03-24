import Head from "next/head";
import AuthLayout from "../../../components/authlayout";
import KreatorDashboard from "components/account-dashboard/KreatorDashboard";

const Kreator = () => (
  <AuthLayout headerTitle="Dashboard">
    <Head>
      <title>KreateSell | Kreator Dashboard</title>
    </Head>
    <KreatorDashboard />
  </AuthLayout>
);

export default Kreator;
