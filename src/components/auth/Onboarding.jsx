import Image from "next/image";
import { Layout } from "components";
import { FacebookBtn, GoogleBtn } from "assets";
import styles from "./Onboarding.module.scss";

export const OnboardingLayout = ({
	Form,
	formTitle,
	socialBtn = true,
	title,
	keywords,
	description,
	subTitle,
}) => {
	return (
		<Layout title={title} keywords={keywords} description={description}>
			<div className={styles.signup}>
				<div className={styles.formContainer}>
					<div className={styles.form}>
						<h5 className={styles.formTitle}>{formTitle}</h5>

						<p className={styles.continue}>{subTitle}</p>

						{socialBtn && (
							<>
								<p className={styles.continue}>Continue with</p>

								<div className={styles.socialBtn}>
									<div className={styles.google}>
										<Image src={GoogleBtn} alt="sign up with google" />
									</div>
									<div className="cursor">
										<Image src={FacebookBtn} alt="sign up with facebook" />
									</div>
								</div>

								<div className={styles.midline}>
									<span className={styles.lineA}></span>
									<p className={styles.text}>or</p>
									<span className={styles.lineB}></span>
								</div>
							</>
						)}

						<Form />
					</div>
				</div>
			</div>
		</Layout>
	);
};
