import { Input, Button, FormError } from "../";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import styles from "../../public/css/ForgotPassword.module.scss";

export const ForgotPasswordForm = () => {
	const router = useRouter();
	const initialValues = {
		email: "",
	};

	const handleSubmit = () => router.push("/reset-password");

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ForgotPasswordSchema,
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
					label="Email or Phone number"
					name="email"
					placeholder="Enter your Email or Phone number"
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
