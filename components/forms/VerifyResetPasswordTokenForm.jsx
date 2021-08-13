import { Input, Button, FormError } from "../";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { VerifyPasswordTokenSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import { ValidateResetToken } from "../../redux/actions";
import { useSelector } from "react-redux";
import styles from "../../public/css/ForgotPassword.module.scss";

export const VerifyResetPasswordTokenForm = () => {
	const router = useRouter();
	const validateToken = ValidateResetToken();

	const { loading } = useSelector((state) => state.auth);

	const initialValues = {
		token: "",
	};

	const handleSubmit = (data) => {
		validateToken(data, () => {
			router.push("/reset-password");
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: VerifyPasswordTokenSchema,
		validateOnChange: false,
	});

	return (
		<div className={styles.body}>
			{!isAnEmpytyObject(formik.errors) && <FormError errors={formik.errors} />}

			<form
				onSubmit={formik.handleSubmit}
				autoComplete="off"
				className={styles.container}
			>
				<Input
					label="Token"
					name="token"
					placeholder="Enter token"
					onChange={formik.handleChange}
				/>

				<Button text="Verify Token" bgColor="primaryBlue" loading={loading} />
			</form>

			<div className={styles.footer}>
				Already have an account?{" "}
				<Link href="/login">
					<a>Login here</a>
				</Link>{" "}
			</div>
		</div>
	);
};
