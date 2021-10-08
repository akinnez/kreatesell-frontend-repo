import { Button, Input } from "components";
import styles from "./CreateProduct.module.scss";

Button;
export const DigitalDownload = () => {
	return (
		<div className={styles.digitalDownload}>
			<h5 className="text-primary-blue font-medium text-2xl">
				DIGITAL DOWNLOAD
			</h5>
			<form className="pt-8">
				<div className={styles.inputCont}>
					<Input
						placeholder="Buyers see this name on the store front page; choose a simple and catchy name!"
						label="Name"
						labelStyle={styles.inputLabelStyle}
						className={styles.input}
					/>
				</div>
			</form>
		</div>
	);
};
