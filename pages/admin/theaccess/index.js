import { AdminLoginForm, GeneralLayout } from "../../../components";

const AdminLogin = () => {
	return (
		<GeneralLayout
			Form={AdminLoginForm}
			formTitle="Login to your account"
			title="KreateSell | Admin Login"
			socialBtn={false}
		/>
	);
};

export default AdminLogin;
