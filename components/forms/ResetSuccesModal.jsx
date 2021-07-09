import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "components";
import { KreateSellBrand } from "assets";
import styles from "./ResetSuccess.module.scss";

export const ResetPasswordSuccesModal = () => {
	const router = useRouter();

	return (
		<div className={styles.resetPasswordModal}>
			<div className={styles.image}>
				<Image src={KreateSellBrand} alt="kreatesell" />
			</div>
			<h5>Successful password reset!</h5>
			<p>
				You can now use your new password to log in to <br /> your account! 🙌
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
