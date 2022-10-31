import Image from 'next/image';
import {Button} from '../';
import {KreateSellBrand} from '../../utils';
import styles from '../../public/css/ResetSuccess.module.scss';

export const ChangePasswordSuccessModal = () => {
	return (
		<div className={styles.resetPasswordModal}>
			<div className={styles.image}>
				<Image src={KreateSellBrand} alt="kreatesell" />
			</div>
			<h5>
				You have successfully changed your <br /> password 🙌
			</h5>

			<p className={styles.webParagraph}>
				You will be required to login with your new password on your
				next login
			</p>
			<Button
				text="Go back"
				bgColor="primaryBlue"
				onClick={() => window.location.reload()}
				className={styles.button}
			/>
		</div>
	);
};
