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
		// upload_preview: true,
		// product_visibility_status: 0,
		// is_preview_only: true,
		// redirect_buyer: true,
		// cover_image: "string",
	});
};
