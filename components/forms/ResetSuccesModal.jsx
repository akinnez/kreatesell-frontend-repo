import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../";
import { KreateSellBrand } from "../../utils";
import styles from "../../public/css/ResetSuccess.module.scss";

export const ResetPasswordSuccesModal = () => {
	const router = useRouter();

	return (
		<div className={styles.resetPasswordModal}>
			<div className={styles.image}>
				<Image src={KreateSellBrand} alt="kreatesell" />
			</div>
			<h5>Password Successfully Reset</h5>

			<p className={styles.webParagraph}>
				You have successfully changed your password. You can now use <br /> your
				new set password to login into your account. 🙌
			</p>
			<p className={styles.mobileParagraph}>
				You have successfully changed your password. You can now use your new
				set password to login into your account. 🙌
			</p>
			<Button
				text="Login"
				bgColor="primaryBlue"
				onClick={() => router.push("/login")}
				className={styles.button}
			/>
		</div>
	);
};
