import { OnboardingLayout, ForgotPasswordForm } from "../components";
import styles from "../public/css/ForgotPassword.module.scss";

const ForgotPassword = () => {
	return (
		<OnboardingLayout
			Form={ForgotPasswordForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Enter your email and a reset link will be sent to you"
			socialBtn={false}
			signupStyle={styles.signup}
		/>
	);
};

export default ForgotPassword;
