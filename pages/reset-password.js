import { GeneralLayout, ResetPasswordForm } from "../components";

const ResetPassword = () => {
	return (
		<GeneralLayout
			Form={ResetPasswordForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Set up a new password"
			socialBtn={false}
		/>
	);
};

export default ResetPassword;
