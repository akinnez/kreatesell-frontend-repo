import * as Yup from "yup";

export const BusinessNameSchema = () => {
	return Yup.object().shape({
		Brand_Name: Yup.string().required("Business name is required"),
	});
};

export const StoreNameSchema = () => {
	return Yup.object().shape({
		Store_Name: Yup.string().required("Store name is required"),
	});
};
export const CountrySchema = () => {
	return Yup.object().shape({
		Country_Id: Yup.string().required("Store country is required"),
	});
};
