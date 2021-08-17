import { GeneralLayout, ForgotPasswordForm } from "../../components";
import styles from "../../public/css/ForgotPassword.module.scss";

const ForgotPassword = () => {
	return (
		<GeneralLayout
			Form={ForgotPasswordForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Enter your email and a reset token will be sent to you"
			socialBtn={false}
			signupStyle={styles.signup}
			subTitleOpacity={true}
		/>
	);
};

export default ForgotPassword;
