import * as Yup from "yup";

export const WelcomeSchema = () => {
	return Yup.object().shape({
		businessName: Yup.string().required("Business name is required"),
		storeName: Yup.string().required("Store name is required"),
	});
};
