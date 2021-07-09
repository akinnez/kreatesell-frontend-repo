import { OnboardingLayout } from "components/auth/Onboarding";
import { WelcomeForm } from "./WelcomeForm";
import styles from "./Welcome.module.scss";

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
