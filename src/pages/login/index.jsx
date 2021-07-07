import { OnboardingLayout } from "components";
import { LoginForm } from "./LoginForm";

const Login = () => {
	return (
		<OnboardingLayout
			Form={LoginForm}
			formTitle="Login to your account"
			title="KreateSell | Login"
		/>
	);
};

export default Login;
