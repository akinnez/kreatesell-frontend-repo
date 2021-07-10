import { GeneralLayout } from "../components";
import { SignupForm } from "../components/forms";

const Signup = () => {
	return (
		<GeneralLayout
			Form={SignupForm}
			formTitle="Get started with a free account"
			title="KreateSell | Signup"
		/>
	);
};

export default Signup;
