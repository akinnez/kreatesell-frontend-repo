import * as Yup from "yup";

export const SubscribeEmailSchema = () => {
	return Yup.object().shape({
		customer_email: Yup.string()
			.email()
			.required("Please input a valid email address"),
		customer_name: Yup.string().required("Name is required"),
	});
};
