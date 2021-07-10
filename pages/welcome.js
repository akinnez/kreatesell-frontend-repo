import { GeneralLayout, WelcomeForm } from "../components";
import styles from "../public/css/Welcome.module.scss";

const WelcomeOnboarding = () => {
	return (
		<GeneralLayout
			socialBtn={false}
			Form={WelcomeForm}
			formStyle={styles.formStyle}
		/>
	);
};

export default WelcomeOnboarding;
