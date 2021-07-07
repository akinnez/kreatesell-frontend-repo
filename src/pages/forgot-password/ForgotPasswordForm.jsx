import { Input, Button } from "components";
import Link from "next/link";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "./ForgotPassword.validation";
import styles from "./ForgotPassword.module.scss";

export const ForgotPasswordForm = () => {
	const initialValues = {
		email: "",
	};

	const handleSubmit = () => {};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ForgotPasswordSchema,
		validateOnChange: false,
	});

	return (
		<>
			<form
				onSubmit={formik.handleSubmit}
				autoComplete="off"
				className={styles.container}
			>
				<Input
					label="Email or Phone number"
					name="email"
					placeholder="Enter your Email or Phone number"
					onChange={formik.handleChange}
					errorMessage={formik?.errors?.email}
				/>

				<Button text="Reset password" bgColor="primaryBlue" />
			</form>

			<div className={styles.footer}>
				Already have an account?{" "}
				<Link href="/login">
					<a>Login here</a>
				</Link>{" "}
			</div>
		</>
	);
};
