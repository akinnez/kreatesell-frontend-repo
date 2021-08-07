import { Input, Button, Checkbox, FormError } from "../";
import { useFormik } from "formik";
import Link from "next/link";
import { SignupSchema } from "../../validation";
import ReCAPTCHA from "react-google-recaptcha";
import { isAnEmpytyObject } from "../../utils";
import styles from "../../public/css/Signup.module.scss";

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

	const errors = formik.errors;

	return (
		<>
			{!isAnEmpytyObject(errors) && <FormError errors={errors} />}

			<form onSubmit={formik.handleSubmit} autoComplete="off">
				<Input
					label="Email or Phone number"
					name="email"
					placeholder="Enter your Email or Phone number"
					onChange={formik.handleChange}
				/>

				<Input
					label="Password"
					name="password"
					placeholder="Create Password"
					onChange={formik.handleChange}
				/>

				<ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
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
