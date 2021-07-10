import { Input, Button, FormError } from "../";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import styles from "../../public/css/ForgotPassword.module.scss";

export const ResetPasswordForm = () => {
	const router = useRouter();

	const initialValues = {
		email: "",
	};

	const handleSubmit = () => router.push("/reset-successful");

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ResetPasswordSchema,
		validateOnChange: false,
	});

	return (
		<>
			{!isAnEmpytyObject(formik.errors) && <FormError errors={formik.errors} />}

			<form
				onSubmit={formik.handleSubmit}
				autoComplete="off"
				className={styles.container}
			>
				<Input
					label="Enter New Password"
					name="password"
					placeholder="Create new password"
					onChange={formik.handleChange}
				/>

				<Input
					label="Confirm New Password"
					name="confirmPassword"
					placeholder="Confirm new password"
					onChange={formik.handleChange}
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
