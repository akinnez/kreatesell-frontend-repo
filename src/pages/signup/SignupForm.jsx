import { Input, Button, Checkbox } from "components";
import { useFormik } from "formik";
import Link from "next/link";
import { SignupSchema } from "./Signup.validation";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Signup.module.scss";

export const SignupForm = () => {
	const initialValues = {
		email: "",
		password: "",
		terms: false,
	};

	const handleSubmit = () => {};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: SignupSchema,
		validateOnChange: false,
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit} autoComplete="off">
				<Input
					label="Email or Phone number"
					name="email"
					placeholder="Enter your Email or Phone number"
					onChange={formik.handleChange}
					errorMessage={formik?.errors?.email}
				/>

				<Input
					label="Password"
					name="password"
					placeholder="Create Password"
					onChange={formik.handleChange}
					errorMessage={formik?.errors?.password}
				/>

				<ReCAPTCHA
					sitekey="6LcHGn0bAAAAALTtYkBrcDA1pbaRiSXmkADz8khK"
					size="normal"
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
		</>
	);
};
