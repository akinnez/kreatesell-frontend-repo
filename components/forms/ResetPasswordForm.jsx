import { useState } from "react";
import { Input, Button, FormError, Modal, ResetPasswordSuccesModal } from "../";
import Link from "next/link";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import styles from "../../public/css/ForgotPassword.module.scss";

export const ResetPasswordForm = () => {
	const [modalVisible, setVisible] = useState(false);

	const initialValues = {
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = () => setVisible(true);

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
					type="password"
				/>

				<Input
					label="Confirm New Password"
					name="confirmPassword"
					placeholder="Confirm new password"
					onChange={formik.handleChange}
					type="password"
				/>

				<Button text="Reset password" bgColor="primaryBlue" />
			</form>

			<div className={styles.footer}>
				Already have an account?{" "}
				<Link href="/login">
					<a>Login here</a>
				</Link>{" "}
			</div>

			<Modal
				onClose={() => setVisible(false)}
				visible={modalVisible}
				cancelPropagation={true}
			>
				<ResetPasswordSuccesModal />
			</Modal>
		</>
	);
};
