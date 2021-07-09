import { OnboardingLayout } from "../components/auth/Onboarding";
import { WelcomeForm } from "../components/forms";
import styles from "../public/css/Welcome.module.scss";

const WelcomeOnoarding = () => {
	return (
		<OnboardingLayout
			socialBtn={false}
			Form={WelcomeForm}
			formStyle={styles.formStyle}
		/>
	);
};

export default WelcomeOnoarding;