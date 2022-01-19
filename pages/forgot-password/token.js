import { GeneralLayout, VerifyResetPasswordTokenForm } from "../../components";
import styles from "../../public/css/ForgotPassword.module.scss";

const VerifyResetPasswordToken = () => {
	return (
		<GeneralLayout
			Form={VerifyResetPasswordTokenForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Enter token sent to your email"
			socialBtn={false}
			signupStyle={styles.signup}
			subTitleOpacity={true}
		/>
	);
};

export default VerifyResetPasswordToken;
