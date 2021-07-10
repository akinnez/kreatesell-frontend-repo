import * as Yup from "yup";

export const SignupSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
		password: Yup.string().required("Please enter a valid password"),
		terms: Yup.bool().oneOf([true], "Terms and conditions must be accepted"),
	});
};

export const LoginSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
		password: Yup.string().required("Please enter a valid password"),
	});
};

export const ForgotPasswordSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
	});
};

export const ResetPasswordSchema = () => {
	return Yup.object().shape({
		password: Yup.string().required("New password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), undefined], "Passwords must match")
			.required("Confirm new password"),
	});
};

// newPassword: Yup.string().required("Enter your new password"),
// confirmPassword: Yup.string()
// 	.oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
// 	.required("Password confirmation is required"),
