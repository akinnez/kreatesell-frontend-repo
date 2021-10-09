import { useState } from "react";
import Image from "next/image";
import { Button, Input, TextArea } from "components";
import { CloudUpload } from "utils";
import styles from "./CreateProduct.module.scss";
import { DeleteIcon } from "components/IconPack";
import { Radio } from "components/inputPack";
import { Switch } from "antd";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { CreateProductSchema } from "validation/Product.validation";

export const CreateProductForm = ({ productType = "digitalDownload" }) => {
	const [preOrder, setPreOrder] = useState(false);
	const [contentFiles, setContentFiles] = useState(false);

	const onDrop = () => {};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const initialValues = {
		product_name: "string",
		product_description: "string",
		enable_preorder: false,
		upload_content: false,
		product_visibility_status: 0,
	};

	const handleSubmit = () => {};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: CreateProductSchema,
		validateOnChange: false,
	});

	const { errors, setFieldValue, values } = formik;

	return (
		<div className={styles.digitalDownload}>
			<h5 className="text-primary-blue font-medium text-2xl">
				{productType === "digitalDownload" && "DIGITAL DOWNLOAD"}
				{productType === "oneTimeSubscription" && "ONE-TIME SUBSCRIPTION"}
				{productType === "membership" && "MEMBERSHIP "}
			</h5>
			<form className="pt-3">
				<div className={styles.inputCont}>
					<Input
						placeholder="Buyers see this name on the store front page; choose a simple and catchy name!"
						label="Name"
						labelStyle={styles.inputLabel}
						className={`${styles.input} w-3/4`}
						name="product_name"
						onChange={formik.handleChange}
						errorMessage={errors.product_name}
					/>
				</div>

				<div className="w-3/4">
					<TextArea
						name="product_description"
						label="Description"
						placeholder="A well detailed, persuasive and intriguing description about the product drives more sales. Don't forget, it is all about the product audience, So keep it simple and personal."
						rows={6}
						labelStyle={styles.inputLabel}
						onChange={formik.handleChange}
						errorMessage={errors.product_description}
					/>
				</div>

				<div className="mt-4 w-3/4">
					<p className={styles.inputLabel}>Product Image</p>
					<div className="bg-base-white-100 flex p-4">
						<div className="w-1/2 pr-8 pt-3">
							<p className="text-base-gray-200 text-xs">
								This image will be displayed on your store page!
							</p>
							<div className={styles.uploadCont} {...getRootProps()}>
								<div>
									<Image src={CloudUpload} alt="upload image" />
								</div>
								<input {...getInputProps()} />
								<h5 className="text-primary-blue text-base pt-2 font-normal text-center">
									Drag & Drop or Upload Image
								</h5>
							</div>
							<p className="text-red-500 text-xs pt-4">
								Allowed Files: PNG, JPG | Maximum file size: 5MB
							</p>
						</div>
						<div className={`w-1/2 p-2 ${styles.noImage} relative`}>
							<div className="absolute right-4 cursor-pointer">
								<DeleteIcon />
							</div>
							<div className="absolute inset-1/3 text-center py-4">
								<p className="text-base-gray-200 text-sm">No image available</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-4 w-3/4">
					{productType === "digitalDownload" && (
						<div className="flex justify-between items-center w-2/4">
							<div className="text-black-100">Enable pre-orders</div>
							<div className="flex">
								<Switch
									onChange={(e) => {
										setPreOrder((value) => !value);
										setFieldValue("enable_preorder", e);
									}}
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
							/>
						</div>
					)}

					{productType === "digitalDownload" && (
						<div className="flex justify-between items-center w-2/4 pt-4">
							<div className="text-black-100">Content Files</div>
							<div className="flex">
								<Switch
									onChange={(e) => {
										setContentFiles((value) => !value);
										setFieldValue("upload_content", e);
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
							<div className={styles.contentFileUpload} {...getRootProps()}>
								<input {...getInputProps()} />
								<Image src={CloudUpload} alt="upload image" />
								<p className="text-primary-blue text-sm pl-4 my-auto">
									Drag and Drop or Upload your product files
								</p>
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
							label="Activated"
							extralable="- Your product will go live and visible to audience for a purchase once you complete creating the sales template"
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							onChange={(e) => setFieldValue("product_visibility_status", e)}
						/>

						<Radio
							value={values.product_visibility_status}
							content={0}
							label="Deactivated"
							extralable="- Nobody would be able to access or purchase this product until you activate it."
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							onChange={(e) => setFieldValue("product_visibility_status", e)}
						/>

						<Radio
							value={values.product_visibility_status}
							content={2}
							label="Unlisted"
							extralable="- Product would not be visible on the store page but anyone with direct link can purchase it."
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							onChange={(e) => setFieldValue("product_visibility_status", e)}
						/>
					</div>
				</div>

				<p className="text-center text-base-gray pt-4 text-base">
					Almost there, Click the next button to continue
				</p>

				<div className="flex justify-center pb-4">
					<div className="">
						<Button text="Previous" className={styles.digitalBtn} />
					</div>
					<div className="pl-4">
						<Button
							text="Save and continue"
							bgColor="blue"
							className={styles.digitalBtn}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
