import { OnboardingLayout } from "../components";
import { SignupForm } from "../components/forms";

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
