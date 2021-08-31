import { useState } from "react";
import {
	Button,
	FormError,
	Modal,
	ResetPasswordSuccesModal,
	PasswordInput,
} from "../../";
import Link from "next/link";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../../../validation";
import { isAnEmpytyObject } from "../../../utils";
import { SuperAdminResetPassword } from "../../../redux/actions";
import { useSelector } from "react-redux";
import styles from "../../../public/css/ForgotPassword.module.scss";

export const AdminResetPasswordForm = () => {
	const resetPassword = SuperAdminResetPassword();
	const { loading } = useSelector((state) => state.auth);

	const [modalVisible, setVisible] = useState(false);

	const initialValues = {
		password: "",
		confirm_password: "",
	};

	const handleSubmit = (data) => {
		resetPassword(data, () => {
			setVisible(true);
			localStorage.clear();
		});
	};

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
				<PasswordInput
					label="Enter New Password"
					name="password"
					placeholder="Create new password"
					onChange={formik.handleChange}
					type="password"
				/>

				<PasswordInput
					label="Confirm New Password"
					name="confirm_password"
					placeholder="Confirm new password"
					onChange={formik.handleChange}
					type="password"
				/>

				<Button text="Reset password" bgColor="primaryBlue" loading={loading} />
			</form>

			<div className={styles.footer}>
				Already have an account?{" "}
				<Link href="/admin/theaccess">
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
