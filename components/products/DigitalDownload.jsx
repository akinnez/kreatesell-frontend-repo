import { Button, Input, TextArea } from "components";
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
				</div>
			</form>
		</div>
	);
};
