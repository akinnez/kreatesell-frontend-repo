import { useState } from "react";
import Image from "next/image";
import { Button, Input, TextArea } from "components";
import { CloudUpload } from "utils";
import styles from "./CreateProduct.module.scss";
import { DeleteIcon } from "components/IconPack";
import { Radio } from "components/inputPack";
import { Switch } from "antd";

export const DigitalDownload = () => {
	const [preOrder, setPreOrder] = useState(false);
	const [contentFiles, setContentFiles] = useState(false);

	return (
		<div className={styles.digitalDownload}>
			<h5 className="text-primary-blue font-medium text-2xl">
				DIGITAL DOWNLOAD
			</h5>
			<form className="pt-3">
				<div className={styles.inputCont}>
					<Input
						placeholder="Buyers see this name on the store front page; choose a simple and catchy name!"
						label="Name"
						labelStyle={styles.inputLabel}
						className={`${styles.input} w-3/4`}
					/>
				</div>

				<div className="w-3/4">
					<TextArea
						name="description"
						label="Description"
						placeholder="A well detailed, persuasive and intriguing description about the product drives more sales. Don't forget, it is all about the product audience, So keep it simple and personal."
						rows={6}
						labelStyle={styles.inputLabel}
					/>
				</div>

				<div className="mt-4 w-3/4">
					<p className={styles.inputLabel}>Product Image</p>
					<div className="bg-base-white-100 flex p-4">
						<div className="w-1/2 pr-8 pt-3">
							<p className="text-base-gray-200 text-xs">
								This image will be displayed on your store page!
							</p>
							<div className={styles.uploadCont}>
								<div>
									<Image src={CloudUpload} alt="upload image" />
								</div>
								<h5 className="text-primary-blue text-base pt-2 font-normal">
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
					<div className="flex justify-between items-center w-2/4">
						<div className="text-black-100">Enable pre-orders</div>
						<div className="flex">
							<Switch onChange={() => setPreOrder((value) => !value)} />
							<span className="pl-6 text-black-100">
								{preOrder ? "ON" : "OFF"}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-2/4 pt-4">
						<div className="text-black-100">Content Files</div>
						<div className="flex">
							<Switch onChange={() => setContentFiles((value) => !value)} />
							<span className="pl-6 text-black-100">
								{contentFiles ? "ON" : "OFF"}
							</span>
						</div>
					</div>
				</div>

				<div className="pt-4">
					<div className={styles.inputLabel}>Listing Status</div>
					<p className="text-base-gray-200 text-sm pt-2">
						Choose whether product should be available on your store and
						audience dashboard.
					</p>
					<div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg">
						<Radio
							// value={values.product_visibility_status}
							content={1}
							label="Activated"
							extralable="- Your product will go live and visible to audience for a purchase once you complete creating the sales template"
							// labelStyle={styles.inputLabel}
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							// onChange={(e) => setFieldValue("product_visibility_status", e)}
						/>

						<Radio
							// value={values.product_visibility_status}
							content={0}
							label="Deactivated"
							extralable="- Nobody would be able to access or purchase this product until you activate it."
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							// onChange={(e) => setFieldValue("product_visibility_status", e)}
						/>

						<Radio
							// value={values.product_visibility_status}
							content={2}
							label="Unlisted"
							extralable="- Product would not be visible on the store page but anyone with direct link can purchase it."
							labelStyle={styles.radioLabel}
							extralableStyle={styles.extralableStyle}
							// onChange={(e) => setFieldValue("product_visibility_status", e)}
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
