import { Input, Button, FormError } from "../";
import { useFormik } from "formik";
import Link from "next/link";
import { EmailSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import { ResendConfirmationEmail } from "../../redux/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "../../public/css/Login.module.scss";

export const ResendVerificationEmailForm = () => {
	const resendEmail = ResendConfirmationEmail();
	const router = useRouter();

	const { loading } = useSelector((state) => state.auth);

	const initialValues = {
		email: "",
	};

	const handleSubmit = (data) => {
		resendEmail(data?.email, () => {
			router.push("/login");
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: EmailSchema,
		validateOnChange: false,
	});

	const { errors } = formik;

	return (
		<>
			{!isAnEmpytyObject(errors) && <FormError errors={errors} />}

			<form onSubmit={formik.handleSubmit} autoComplete="off">
				<Input
					label="Email"
					name="email"
					placeholder="Enter your Email"
					onChange={formik.handleChange}
				/>

				<div className={styles.terms}>
					<Link href="/forgot-password">
						<a>Forgot Password?</a>
					</Link>
				</div>

				<Button
					type="submit"
					text="Submit"
					bgColor="primaryBlue"
					loading={loading}
				/>
			</form>

			<div className={styles.footer}>
				Don’t have an account?{" "}
				<Link href="/signup">
					<a>Get Started</a>
				</Link>{" "}
			</div>
		</>
	);
};
