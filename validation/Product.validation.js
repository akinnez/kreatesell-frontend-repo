import * as Yup from "yup";

export const CreateProductSchema = () => {
	return Yup.object().shape({
		product_name: Yup.string().required("Product name is required"),
		product_description: Yup.string().required(
			"Product description is required"
		),
		enable_preorder: Yup.boolean(),
		upload_content: Yup.boolean(),
		product_visibility_status: Yup.number().required(
			"Product Visibility status is required"
		),
		preorder_details: {
			preorder_release_date: Yup.date(),
			is_preorder_downloadable: Yup.boolean(),
		},
		product_type_id: Yup.number(),
		content_file_details: {
			product_files: Yup.string(),
			file_access_type: Yup.number(),
		},
		// upload_preview: true,
		// product_visibility_status: 0,
		// is_preview_only: true,
		// redirect_buyer: true,
		cover_image: Yup.string(),
	});
};

export const CheckoutProductSchema = () => {
	return Yup.object().shape({
		cta_button: Yup.string(),
	});
};
