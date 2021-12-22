import { AdminResetPasswordForm, GeneralLayout } from "../../../components";

const AdminResetPassword = () => {
	return (
		<GeneralLayout
			Form={AdminResetPasswordForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Set up a new password"
			socialBtn={false}
		/>
	);
};

export default AdminResetPassword;
