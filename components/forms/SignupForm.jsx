import { Input, Button, Checkbox, FormError } from "../";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignupSchema } from "../../validation";
import ReCAPTCHA from "react-google-recaptcha";
import { isAnEmpytyObject } from "../../utils";
import { Signup } from "../../redux/actions/auth.actions";
import styles from "../../public/css/Signup.module.scss";

export const SignupForm = () => {
	const router = useRouter();
	const signup = Signup();

	const initialValues = {
		Email: "",
		Password: "",
		phoneNo: "",
		terms: false,
	};

	const handleSubmit = (data) => {
		let formData = new FormData();
		for (let value in data) {
			formData.append(value, data[value]);
		}
		/**Signup endpoint is called with data */
		signup(formData, () => {
			router.push("/welcome");
		});
	};

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
					label="Email address"
					name="Email"
					placeholder="Enter your Email address"
					onChange={formik.handleChange}
				/>

				<Input
					label="Phone number"
					name="phoneNo"
					placeholder="Enter your Phone number"
					inputMode="numeric"
					onChange={formik.handleChange}
				/>

				<Input
					label="Password"
					name="Password"
					type="password"
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
