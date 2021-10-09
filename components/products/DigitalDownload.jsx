import Image from "next/image";
import { Button, Input, TextArea } from "components";
import { CloudUpload, BlogHero } from "utils";
import styles from "./CreateProduct.module.scss";

export const DigitalDownload = () => {
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
						className={styles.input}
					/>
				</div>

				<div>
					<TextArea
						name="description"
						label="Description"
						placeholder="A well detailed, persuasive and intriguing description about the product drives more sales. Don't forget, it is all about the product audience, So keep it simple and personal."
						rows={6}
						labelStyle={styles.inputLabel}
					/>
				</div>

				<div className="mt-4">
					<p className={styles.inputLabel}>Product Image</p>
					<div className="bg-base-white-100 flex p-4 w-full">
						<div className="w-1/2">
							<p className="text-base-gray-200 text-xs">
								This image will be displayed on your store page!
							</p>
							<div className={styles.uploadCont}>
								{/* <Image
									// src={CloudUpload}
									src={BlogHero}
									alt="upload image"
									width="100"
									height="100"
								/> */}
								{/* <Image src={BlogHero} width="635" height="380" /> */}
								{/* <CloudUpload /> */}
								<h5>Drag & Drop or Upload Image </h5>
							</div>
						</div>
						<div className="w-1/2">
							<p>No image available</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
