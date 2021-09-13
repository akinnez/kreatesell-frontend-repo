import { GeneralLayout, ResendVerificationEmailForm } from "../components";
import styles from "../public/css/ForgotPassword.module.scss";

const ResendVerificationEmailCode = () => {
	return (
		<GeneralLayout
			Form={ResendVerificationEmailForm}
			formTitle="Verify Email"
			title="KreateSell | Verify Email"
			subTitle="Verify email address"
			socialBtn={false}
			signupStyle={styles.signup}
			subTitleOpacity={true}
		/>
	);
};

export default ResendVerificationEmailCode;
