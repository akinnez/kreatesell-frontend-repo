import { useState, useEffect } from "react";
import Image from "next/image";
import { Button, Input, TextArea } from "components";
import { CloudUpload, isAnEmpytyObject } from "utils";
import styles from "./CreateProduct.module.scss";
import { DeleteIcon } from "components/IconPack";
import { Radio } from "components/inputPack";
import { Switch } from "antd";
import { useFormik } from "formik";
import {
	DigitalProductSchema,
	// oneTimeSubscriptionSchema,
	oneTimeSubscriptionAndMembershipSchema,
	// membershipProductSchema,
} from "validation";
import filesize from "filesize";
import {
	SetProductTab,
	GetListingStatus,
	CreateProduct,
	GetProductByID,
	SetProductID,
} from "redux/actions";
import { useSelector } from "react-redux";
import { useUpload } from "hooks";

export const CreateProductForm = ({
	productType = "digitalDownload",
	productTypeId,
}) => {
	const setProductTab = SetProductTab();
	const getListingStatus = GetListingStatus();
	const createProduct = CreateProduct();
	const getProductByID = GetProductByID();
	const setProductID = SetProductID();

	const [preOrder, setPreOrder] = useState(false);
	const [contentFiles, setContentFiles] = useState(false);

	/**product is for single product fetched by ID */
	const { listingStatus, loading, productID, product } = useSelector(
		(state) => state.product
	);

	const [files, setFiles] = useState([]);
	const [productFile, setProductFile] = useState([]);

	const filterListingStatus = (id) =>
		listingStatus?.filter((item) => item.id === id);

	const activateStatus = filterListingStatus(1);
	const deActivateStatus = filterListingStatus(2);
	const unListStatus = filterListingStatus(3);

	const {
		files: customFile,
		preview,
		getRootProps,
		getInputProps,
		removeFile,
	} = useUpload({
		setFileChange: setFiles,
	});

	const {
		files: productFileFile,
		preview: productFilePreview,
		getRootProps: getProductFileRootProps,
		getInputProps: getProductFileInputProps,
		removeFile: removeProductFile,
	} = useUpload({
		setFileChange: setProductFile,
	});

	const initialValues = {
		product_name: "",
		product_description: "",
		enable_preorder: false,
		upload_content: false,
		product_visibility_status: 0,
		upload_preview: false,
		preorder_details: {
			preorder_release_date: "",
			is_preorder_downloadable: true,
		},
		content_file_details: {
			product_files: [""],
			file_access_type: 1,
		},
		action: !isAnEmpytyObject(product) ? "e" : "c",
		kreatesell_id: "",
		product_type_id: 0,
		product_listing_status_id: 0,
		product_status: 0,
		cta_button: "",
		product_id: 0,
	};

	const handleSubmit = (data) => {
		if (["oneTimeSubscription", "membership"].includes(productType)) {
			delete data?.content_file_details;
			// delete data?.preorder_details;
			// delete data?.enable_preorder;
			delete data?.upload_content;
			delete data?.upload_preview;
		}
		if (!data.enable_preorder) {
			delete data.preorder_details;
		}
		if (preview.length < 1) {
			delete data.cover_image;
		}
		if (productFilePreview.length < 1) {
			// delete data.content_file_details.product_files;
			delete data.content_file_details;
		}

		createProduct(data, (data) => {
			setProductID(
				product?.product_details?.kreasell_product_id || data?.token
			);
			setProductTab(1);
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema:
			productType === "digitalDownload"
				? DigitalProductSchema
				: oneTimeSubscriptionAndMembershipSchema,
		validateOnChange: false,
	});

	const { errors, setFieldValue, values } = formik;

	useEffect(() => {
		setFieldValue("product_type_id", productTypeId);
		setFieldValue("cover_image", preview[0]?.url);
		setFieldValue(
			"content_file_details.product_files",
			productFilePreview?.map((item) => item.url)
		);
	}, [setFieldValue, preview, productTypeId, productFilePreview]);

	useEffect(() => {
		if (files.length > 0) {
			setFieldValue("upload_preview", true);
		} else {
			setFieldValue("upload_preview", false);
		}
	}, [files]);

	useEffect(() => {
		getListingStatus();
	}, []);

	useEffect(() => {
		if (productID) {
			getProductByID(productID);
		}
	}, [productID]);

	useEffect(() => {
		setFieldValue("product_name", product?.product_details?.product_name);
		setFieldValue(
			"product_description",
			product?.product_details?.product_description
		);
		setFieldValue(
			"enable_preorder",
			product?.product_details?.enable_preorder ?? false
		);
		setFieldValue("upload_content", product?.product_details?.upload_content);
		setFieldValue(
			"product_visibility_status",
			product?.product_details?.product_visibility
		);
		setFieldValue("upload_preview", product?.product_details?.is_preview_only);
		setFieldValue(
			"preorder_details.preorder_release_date",
			product?.product_details?.preoder_date ?? ""
		);
		setFieldValue(
			"preorder_details.is_preorder_downloadable",
			product?.product_details?.is_preoder_downloadable ?? false
		);
		setFieldValue(
			"kreatesell_id",
			product?.product_details?.kreasell_product_id
		);
		setFieldValue("product_type_id", product?.product_details?.product_type_id);
		setFieldValue("product_id", product?.product_details?.id);
		setFieldValue(
			"product_listing_status",
			product?.product_details?.product_listing_status
		);
	}, [product]);

	return (
		<div className={styles.digitalDownload}>
			<h5 className="text-primary-blue font-medium text-2xl">
				{productType === "digitalDownload" && "DIGITAL DOWNLOAD"}
				{productType === "oneTimeSubscription" && "ONE-TIME SUBSCRIPTION"}
				{productType === "membership" && "MEMBERSHIP "}
			</h5>

			<form className="pt-3" onSubmit={formik.handleSubmit}>
				<div className={styles.inputCont}>
					<Input
						placeholder="Buyers see this name on the store front page; choose a simple and catchy name!"
						label="Name"
						labelStyle={styles.inputLabel}
						className={`${styles.input} w-full lg:w-3/4`}
						name="product_name"
						onChange={formik.handleChange}
						errorMessage={errors.product_name}
						value={values?.product_name}
					/>
				</div>

				<div className="w-full lg:w-3/4">
					<TextArea
						name="product_description"
						label="Description"
						placeholder="A well detailed, persuasive and intriguing description about the product drives more sales. Don't forget, it is all about the product audience, So keep it simple and personal."
						rows={6}
						labelStyle={styles.inputLabel}
						onChange={formik.handleChange}
						errorMessage={errors.product_description}
						value={values?.product_description}
					/>
				</div>

				<div className="mt-4 w-full lg:w-3/4">
					<p className={styles.inputLabel}>Product Image</p>
					<div className="bg-base-white-100 flex flex-col lg:flex-row p-4">
						<div className="w-full lg:w-1/2 lg:pr-8 pt-3">
							<p className="text-base-gray-200 text-xs">
								This image will be displayed on your store page!
							</p>

							<div
								className={`${styles.upload} ${
									files?.length > 0 && styles.activeUpload
								}`}
								{...getRootProps()}
							>
								{preview.length > 0 && (
									<div className="flex justify-between px-4 pt-3 text-base-gray text-sm font-light">
										<p>{files?.[0]?.name}</p>
										<p>{filesize(files[0]?.size)}</p>
									</div>
								)}
								<div className={styles.uploadCont}>
									<div>
										<Image src={CloudUpload} alt="upload image" />
									</div>
									<input {...getInputProps()} />
									<h5 className="hidden lg:block text-primary-blue text-base pt-2 font-semibold text-center">
										Drag & Drop or Upload Image
									</h5>
									<h5 className="lg:hidden text-primary-blue text-base font-normal text-center">
										Upload Image
									</h5>
								</div>
							</div>
							<p className="text-red-500 text-xs pt-4">
								Allowed Files: PNG, JPG | Maximum file size: 5MB
							</p>
						</div>

						{preview.length < 1 && (
							<div className={`w-full lg:w-1/2 p-2 ${styles.noImage} relative`}>
								<div className="absolute right-4 cursor-pointer">
									<DeleteIcon />
								</div>

								<div
									className={`absolute inset-1/3 text-center py-4 ${styles.emptyImg}`}
								>
									<p className="text-base-gray-200 text-sm">
										No image available
									</p>
								</div>
							</div>
						)}

						{preview.length > 0 && (
							<div className={`w-full lg:w-1/2 p-2 ${styles.noImage}`}>
								<div
									className="z-10 float-right cursor-pointer"
									onClick={() => removeFile()}
								>
									<DeleteIcon color="#FF4D4F" />
								</div>
								{preview.length && (
									<div
										className={`flex justify-center text-center py-4 ${styles.emptyImg}`}
									>
										{preview.length && (
											<img src={preview?.[0]?.url} alt="product preview" />
										)}
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				<div className="mt-4 w-full lg:w-3/4">
					{productType === "digitalDownload" && (
						<div className="flex justify-between items-center w-full lg:w-2/4">
							<div className="text-black-100">Enable pre-orders</div>
							<div className="flex">
								<Switch
									onChange={(e) => {
										setPreOrder((value) => !value);
										setFieldValue("enable_preorder", e);
									}}
									checked={preOrder}
								/>
								<span className="pl-6 text-black-100">
									{preOrder ? "ON" : "OFF"}
								</span>
							</div>
						</div>
					)}

					{preOrder && (
						<div className={styles.enablePreOrderCont}>
							<Input
								type="datetime-local"
								label="Release date & time"
								className={styles.inputHeight}
								onChange={(e) => {
									setFieldValue(
										"preorder_details.preorder_release_date",
										e.target.value
									);
								}}
								value={values?.preorder_details?.preorder_release_date}
							/>
						</div>
					)}

					{productType === "digitalDownload" && (
						<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
							<div className="text-black-100">Content Files</div>
							<div className="flex">
								<Switch
									onChange={(e) => {
										setContentFiles((value) => !value);
										setFieldValue("upload_content", contentFiles);
									}}
								/>
								<span className="pl-6 text-black-100">
									{contentFiles ? "ON" : "OFF"}
								</span>
							</div>
						</div>
					)}

					{contentFiles && (
						<div className="pt-2">
							<p className="text-base-gray-200 text-xs">
								Only one file is allowed to be uploaded. Bundle all your files
								into single RAR or ZIP file. <br /> The maximum allowed file
								size is 1GB.
							</p>
							<div
								className={`${styles.contentFileUpload} ${
									productFile?.length > 0 && styles.activeUpload
								}`}
								{...getProductFileRootProps()}
							>
								{productFile.length > 0 && (
									<p className="float-left px-4 pt-3 text-base-gray text-sm font-light">
										{productFile[0]?.name}
									</p>
								)}

								<div className="flex justify-center items-center">
									<input {...getProductFileInputProps()} />
									<Image src={CloudUpload} alt="upload image" />
									<p className="hidden md:block text-primary-blue text-sm pl-4 my-auto">
										Drag and Drop or Upload your product files
									</p>
									<p className="md:hidden text-primary-blue text-sm pl-4 my-auto">
										Upload your product files
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="pt-4">
					<div className={styles.inputLabel}>Listing Status</div>
					<p className="text-base-gray-200 text-sm pt-2">
						Choose whether product should be available on your store and
						audience dashboard.
					</p>
					<div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg">
						<Radio
							value={values.product_visibility_status}
							content={1}
							label="Activate"
							extralable="- Your product will go live and visible to audience for a purchase once you complete creating the sales template"
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							onChange={(e) =>
								setFieldValue(
									"product_visibility_status",
									e || activateStatus[0]?.id
								)
							}
						/>

						<Radio
							value={values.product_visibility_status}
							content={2}
							label="Deactivate"
							extralable="- Nobody would be able to access or purchase this product until you activate it."
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							onChange={(e) =>
								setFieldValue(
									"product_visibility_status",
									e || deActivateStatus[0]?.id
								)
							}
						/>

						<Radio
							value={values.product_visibility_status}
							content={3}
							label="Unlist"
							extralable="- Product would not be visible on the store page but anyone with direct link can purchase it."
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							onChange={(e) =>
								setFieldValue(
									"product_visibility_status",
									e || unListStatus[0]?.id
								)
							}
						/>
					</div>
				</div>

				<p className="text-center text-sm text-base-gray pt-4 md:text-base">
					Almost there, Click the next button to continue
				</p>

				<div className="flex flex-col-reverse lg:flex-row justify-center items-center pb-4">
					<div className="">
						<Button text="Previous" className={styles.digitalBtn} />
					</div>
					<div className="pl-0 mb-4 lg:pl-4 lg:mb-0">
						<Button
							text="Save and continue"
							bgColor="blue"
							className={styles.digitalBtn}
							loading={loading}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
