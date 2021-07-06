import { Layout } from "components";
import styles from "./Signup.module.scss";

const Signup = () => {
	return (
		<Layout>
			<div className={styles.signup}>
				<div className={styles.formContainer}>
					<div className={styles.form}>
						<h5 className={styles.formTitle}>
							Get started with a free account
						</h5>
						<p className={styles.continue}>Continue with</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
