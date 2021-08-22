import * as Yup from "yup";

export const EmailSchema = () => {
	return Yup.object().shape({
		Email: Yup.string().email().required("Please input a valid email address"),
	});
};
