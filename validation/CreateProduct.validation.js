import * as yup from 'yup';

export const CreateProductSchema = yup.object({
	name: yup.string().required('Enter product name'),
	description: yup.string().required('Enter product description'),
	// image: yup
	//   .string()
	//   .email("Enter a valid email address")
	//   .required("Enter an email address"),
	preOrder: yup.boolean().required('Select pre-order value'),
	// releaseDate: yup.string().required("Enter email subject"),
	// contentFile: "",
	status: yup.string().required('Select product status'),
});
