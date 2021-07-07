import * as Yup from "yup";

export const SignupSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
		password: Yup.string().required("Please enter a valid password"),
		terms: Yup.bool().oneOf([true], "Terms and conditions must be accepted"),
	});
};
