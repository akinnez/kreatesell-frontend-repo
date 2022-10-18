import FacebookLoginComponent from 'components/forms/FacebookLoginComponent';
import GoogleLoginComponent from 'components/forms/GoogleLoginComponent';
import {Layout} from '..';
import styles from './GeneralLayout.module.scss';

export const GeneralLayout = ({
	Form,
	formTitle,
	socialBtn = true,
	title,
	keywords,
	description,
	subTitle,
	subTitleOpacity = false,
	formStyle,
	signupStyle,
	isForm = true,
	withMargin = false,
}) => {
	return (
		<Layout title={title} keywords={keywords} description={description}>
			<div className={`${signupStyle} ${styles.signup} `}>
				{!isForm && <Form />}
				{isForm && (
					<div
						className={`${formStyle} ${styles.formContainer} ${
							withMargin ? styles.withMargin : ''
						}`}
					>
						<div className={styles.form}>
							<h5 className={styles.formTitle}>{formTitle}</h5>

							<p
								className={
									subTitleOpacity
										? styles.opacity
										: styles.continue
								}
							>
								{subTitle}
							</p>

							{socialBtn && (
								<>
									<p className={styles.continue}>
										Continue with
									</p>

									<div className={styles.socialBtn}>
										<div className={styles.google}>
											{/* <Image src={GoogleBtn} alt="sign up with google" /> */}
											<GoogleLoginComponent />
										</div>
										<div className="cursor">
											{/* <Image src={FacebookBtn} alt="sign up with facebook" /> */}
											<FacebookLoginComponent />
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
				)}
			</div>
		</Layout>
	);
};
