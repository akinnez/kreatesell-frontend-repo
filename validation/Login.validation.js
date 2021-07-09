import * as Yup from "yup";

export const LoginSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required("Please input a valid email address"),
		password: Yup.string().required("Please enter a valid password"),
	});
};
