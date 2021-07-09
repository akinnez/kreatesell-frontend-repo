import { ForgotPasswordForm } from "../components/forms";
import { OnboardingLayout } from "../components";

const ForgotPassword = () => {
	return (
		<OnboardingLayout
			Form={ForgotPasswordForm}
			formTitle="Forgot Password"
			title="KreateSell | Forgot Password"
			subTitle="Enter your email and a reset link will be sent to you"
			socialBtn={false}
		/>
	);
};

export default ForgotPassword;
