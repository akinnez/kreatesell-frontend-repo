import { OnboardingLayout } from "components";
import { SignupForm } from "./SignupForm";

const Signup = () => {
	return (
		<OnboardingLayout
			Form={SignupForm}
			formTitle="Get started with a free account"
			title="KreateSell | Signup"
		/>
	);
};

export default Signup;
