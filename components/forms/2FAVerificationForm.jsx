import Link from "next/link";
import { useFormik } from "formik";
import AuthCode from "react-auth-code-input";
import { Button, FormError } from "../";
import { TwoFAVerificationSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import styles from "../../public/css/ForgotPassword.module.scss";
import { Resolve2FALogin } from "../../redux/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const TwoFAVerificationForm = () => {
	const router = useRouter();
	const resolve2FALogin = Resolve2FALogin();

	const { loading } = useSelector((state) => state.auth);

	const initialValues = {
		token: "",
	};

	const handleSubmit = (data) => {
		resolve2FALogin(data, () => {
			router.push("/account/kreator/dashboard");
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: TwoFAVerificationSchema,
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
						setFieldValue("token", e);
					}}
					containerClassName={styles.twoFaContainer}
					inputClassName={styles.twoFaInput}
					// allowedCharacters={/^[0-9]/}
					name="token"
				/>
				<Button text="Verify Account" bgColor="primaryBlue" loading={loading} />
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
