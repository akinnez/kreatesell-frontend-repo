import * as Yup from 'yup';

export const SignupSchema = () => {
	return Yup.object().shape({
		Email: Yup.string()
			.email()
			.required('Please input a valid email address'),
		Password: Yup.string()
			.required('Please enter a valid password')
			.min(6, 'Password must have six to eleven characters')
			.max(11, 'Password must have six to eleven characters'),
		FullName: Yup.string()
			.required('Please enter your full name')
			// regex accounting for whites in between first and last name.
			.matches(
				/^[a-z ,.'-]+$/i,
				'Unsupported character. The full name field only accepts alphabets.'
			),
		phoneNo: Yup.string()
			.required('Phone number is required')
			// .matches(/^[0-9]+$/, 'Phone number can only be digits')
			.matches(/^[\+\d]?(?:[\d-.\s()]*)$/, 'Invalid character supplied')
			// .length(11, 'Phone number must be 11 digits'),
			.max(15, "Phone number can't be more than 15 characters"),
		terms: Yup.bool().oneOf(
			[true],
			'Terms and conditions must be accepted'
		),
		// recaptchaToken: Yup.string().required("Verify you're not a robot!"),
	});
};

export const LoginSchema = () => {
	return Yup.object().shape({
		username: Yup.string()
			.email()
			.required('Please input a valid email address'),
		password: Yup.string().required('Please enter a valid password'),
	});
};

export const EmailSchema = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email()
			.required('Please input a valid email address'),
	});
};

export const TwoFAVerificationSchema = () => {
	return Yup.object().shape({
		token: Yup.string()
			.required('Token is required')
			.length(6, 'Token must be a six digit character'),
	});
};

export const ForgotPasswordSchema = () => {
	return Yup.object().shape({
		username: Yup.string().required(
			'Please input registered email address or phone number'
		),
	});
};

export const TwoFactorAuthSchema = () => {
	return Yup.object().shape({
		token: Yup.string().required('Please input token'),
	});
};

export const VerifyPasswordTokenSchema = () => {
	return Yup.object().shape({
		token: Yup.string()
			.required('Please input token sent to your email')
			.length(6, 'Reset token must be six characters'),
	});
};

export const ResetPasswordSchema = () => {
	return Yup.object().shape({
		password: Yup.string().required('New password is required'),
		confirm_password: Yup.string()
			.oneOf([Yup.ref('password'), undefined], 'Passwords must match')
			.required('Confirm new password'),
	});
};
