import { Layout, Input, Button, Checkbox } from "components";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import styles from "./ForgotPassword.module.scss";
import { ForgotPasswordSchema } from "./ForgotPassword.validation";

const ForgotPassword = () => {
	const initialValues = {
		email: "",
		password: "",
		terms: false,
	};

	const handleSubmit = () => {};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ForgotPasswordSchema,
		validateOnChange: false,
	});

	return (
		<Layout>
			<div className={styles.signup}>
				<div className={styles.formContainer}>
					<div className={styles.form}>
						<h5 className={styles.formTitle}>Forgot Password</h5>

						<p className={styles.continue}>
							Enter your email and a reset link will be sent to you
						</p>

						<form onSubmit={formik.handleSubmit} autoComplete="off">
							<Input
								label="Email or Phone number"
								name="email"
								placeholder="Enter your Email or Phone number"
								onChange={formik.handleChange}
								errorMessage={formik?.errors?.email}
							/>

							<div className={styles.terms}>
								<Checkbox name="terms" onChange={formik.handleChange} />
								<p>I agree to terms & conditions</p>
							</div>
							<Button text="Sign up" bgColor="primaryBlue" />
						</form>

						<div className={styles.footer}>
							Already have an account?{" "}
							<Link href="/login">
								<a>Login</a>
							</Link>{" "}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ForgotPassword;
