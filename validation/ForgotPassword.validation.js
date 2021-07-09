import * as Yup from "yup";

export const ForgotPasswordSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
	});
};

export const ResetPasswordSchema = () => {
	return Yup.object().shape({
		password: Yup.string().string().required("New password is required"),
		confirmPassword: Yup.string().string().required("Confirm password"),
	});
};
