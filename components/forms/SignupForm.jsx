import { useEffect } from "react";
import { Input, PasswordInput, Button, Checkbox, FormError } from "../";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignupSchema } from "../../validation";
// import ReCAPTCHA from "react-google-recaptcha";
import { isAnEmpytyObject } from "../../utils";
import { Signup } from "../../redux/actions";
import { useSelector } from "react-redux";
import styles from "../../public/css/Signup.module.scss";

export const SignupForm = () => {
	const router = useRouter();
	const signup = Signup();
	const email = router.query?.email;

	const { loading } = useSelector((state) => state.auth);

	const initialValues = {
		Email: "",
		FullName: "",
		Password: "",
		phoneNo: "",
		terms: false,
		// recaptchaToken: "",
	};

	const handleSubmit = async (values) => {
		/**Destructuring the values below so that data used for validation on client side not required by the endpoint isn't passed along */
		const { Email, Password, phoneNo, FullName } = values;
		const data = { Email, Password, phoneNo, FullName };

		let formData = new FormData();
		for (let value in data) {
			formData.append(value, data[value]);
		}

		/**Signup endpoint is called with data */
		await signup(formData, () => {
			return router.push("/login");
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: SignupSchema,
		validateOnChange: false,
	});

	const { errors, setFieldValue } = formik;

	useEffect(() => {
		if (email) setFieldValue("Email", email);
	}, [email]);

	return (
		<>
			{!isAnEmpytyObject(errors) && <FormError errors={errors} />}

			<form onSubmit={formik.handleSubmit} autoComplete="off">
				<Input
					label="Full Name"
					name="FullName"
					placeholder="Enter your Full name"
					onChange={formik.handleChange}
				/>

				<Input
					label="Email address"
					name="Email"
					placeholder="Enter your Email address"
					onChange={formik.handleChange}
					value={formik.values.Email}
				/>

				<Input
					label="Phone number"
					name="phoneNo"
					placeholder="Enter your Phone number"
					inputMode="numeric"
					onChange={formik.handleChange}
				/>

				<PasswordInput
					label="Password"
					name="Password"
					placeholder="Create Password"
					onChange={formik.handleChange}
				/>

				{/* <ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
					size="normal"
					onChange={(value) => setFieldValue("recaptchaToken", value)}
				/> */}

				<div className={styles.terms}>
					<Checkbox name="terms" onChange={formik.handleChange} />
					<p>I agree to terms & conditions</p>
				</div>
				<Button
					text="Sign up"
					type="submit"
					bgColor="primaryBlue"
					loading={loading}
				/>
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
