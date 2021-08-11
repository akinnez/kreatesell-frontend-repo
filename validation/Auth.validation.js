import * as Yup from "yup";

export const SignupSchema = () => {
	return Yup.object().shape({
		Email: Yup.string().email().required("Please input a valid email address"),
		Password: Yup.string().required("Please enter a valid password"),
		phoneNo: Yup.number()
			.required("Please enter a valid phone number")
			.min(11, "Phone number must be 11 digits")
			.max(11, "Phone number must be 11 digits"),
		terms: Yup.bool().oneOf([true], "Terms and conditions must be accepted"),
	});
};

export const LoginSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
		password: Yup.string().required("Please enter a valid password"),
	});
};

export const AccountVerificationSchema = () => {
	return Yup.object().shape({
		otp: Yup.number()
			.required("OTP Code is required")
			.min(6, "OTP must be a six digit number")
			.max(6, "OTP must be a six digit number"),
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
