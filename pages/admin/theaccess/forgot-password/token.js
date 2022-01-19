import {
	AdminVerifyResetPasswordTokenForm,
	GeneralLayout,
} from "../../../../components";
import styles from "../../../../public/css/ForgotPassword.module.scss";

const AdminVerifyResetPasswordToken = () => {
	return (
		<GeneralLayout
			Form={AdminVerifyResetPasswordTokenForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Enter token sent to your email"
			socialBtn={false}
			signupStyle={styles.signup}
			subTitleOpacity={true}
		/>
	);
};

export default AdminVerifyResetPasswordToken;
