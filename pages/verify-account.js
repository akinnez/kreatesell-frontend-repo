import { GeneralLayout, TwoFAVerificationForm } from "../components";
import styles from "../public/css/ForgotPassword.module.scss";

const VerifyAccount = () => {
	return (
		<GeneralLayout
			Form={TwoFAVerificationForm}
			formTitle="Please verify your account"
			title="KreateSell | Login"
			subTitle="Input the 6 digit code that has been sent to your email"
			socialBtn={false}
			signupStyle={styles.signup}
			subTitleOpacity={true}
		/>
	);
};

export default VerifyAccount;
