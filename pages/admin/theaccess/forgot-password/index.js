import { AdminForgotPasswordForm, GeneralLayout } from "../../../../components";
import styles from "../../../../public/css/ForgotPassword.module.scss";

const AdminForgotPassword = () => {
	return (
		<GeneralLayout
			Form={AdminForgotPasswordForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Enter your email and a reset token will be sent to you"
			socialBtn={false}
			signupStyle={styles.signup}
			subTitleOpacity={true}
		/>
	);
};

export default AdminForgotPassword;
