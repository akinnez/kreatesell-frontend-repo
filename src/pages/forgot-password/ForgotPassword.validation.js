import * as Yup from "yup";

export const ForgotPasswordSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
	});
};
