import Link from "next/link";
import { useFormik } from "formik";
import AuthCode from "react-auth-code-input";
import { Button, FormError } from "../";
import { AccountVerificationSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import styles from "../../public/css/ForgotPassword.module.scss";

export const TwoFAVerificationForm = () => {
	const initialValues = {
		otp: "",
	};

	const handleSubmit = () => {
		return null;
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: AccountVerificationSchema,
		validateOnChange: false,
	});

	const { setFieldValue } = formik;

	return (
		<div className={styles.body}>
			{!isAnEmpytyObject(formik.errors) && <FormError errors={formik.errors} />}

			<form
				autoComplete="off"
				className={styles.container}
				onSubmit={formik.handleSubmit}
			>
				<div className={styles.enterCode}>Enter Verification Code</div>
				<AuthCode
					characters={6}
					onChange={(e) => {
						setFieldValue("otp", e);
					}}
					containerClassName={styles.twoFaContainer}
					inputClassName={styles.twoFaInput}
					allowedCharacters={/^[0-9]/}
					name="otp"
				/>
				<Button text="Verify Account" bgColor="primaryBlue" />
			</form>

			<div className={styles.footer}>
				Didn’t get OTP?{" "}
				<Link href="/login">
					<a>Resend</a>
				</Link>{" "}
			</div>
		</div>
	);
};
