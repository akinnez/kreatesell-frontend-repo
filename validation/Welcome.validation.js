import * as Yup from "yup";

export const BusinessNameSchema = () => {
	return Yup.object().shape({
		businessName: Yup.string().required("Business name is required"),
	});
};

export const StoreNameSchema = () => {
	return Yup.object().shape({
		storeName: Yup.string().required("Store name is required"),
	});
};
