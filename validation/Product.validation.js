import * as Yup from "yup";

export const DigitalProductSchema = () => {
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
		preorder_details: Yup.object().shape({
			preorder_release_date: Yup.date(),
			// preorder_release_date: Yup.date().nullable(),
			is_preorder_downloadable: Yup.boolean(),
		}),
		product_type_id: Yup.number(),
		content_file_details: Yup.object().shape({
			product_files: Yup.array(),
			file_access_type: Yup.number(),
		}),
		// upload_preview: true,
		// is_preview_only: true,
		// redirect_buyer: true,
		cover_image: Yup.string(),
	});
};

export const oneTimeSubscriptionAndMembershipSchema = () => {
	return Yup.object().shape({
		product_name: Yup.string().required("Product name is required"),
		product_description: Yup.string().required(
			"Product description is required"
		),
		product_visibility_status: Yup.number().required(
			"Product Visibility status is required"
		),
		product_type_id: Yup.number(),
		cover_image: Yup.string(),
	});
};

export const membershipProductSchema = () => {};

export const CheckoutProductSchema = () => {
	return Yup.object().shape({
		cta_button: Yup.string(),
	});
};

export const ConsumerSalesCheckoutSchema = () => {
	return Yup.object().shape({
		firstName: Yup.string().required("First name is required"),
		lastName: Yup.string().required("Last name is required"),
		email: Yup.string().email().required("Please input a valid email address"),
		phoneNo: Yup.string().required("Phone number is required"),
		currency: Yup.string().required("Currency is required"),
		couponCode: Yup.string(),
	});
};
