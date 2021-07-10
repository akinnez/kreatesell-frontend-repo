import { useState, useEffect } from "react";
import {
	OnboardingLayout,
	Modal,
	ResetPasswordSuccesModal,
} from "../components";

const SuccessfulPasswordReset = () => {
	return (
		<OnboardingLayout
			Form={SuccessfulPasswordResetForm}
			socialBtn={false}
			isForm={false}
		/>
	);
};

export const SuccessfulPasswordResetForm = () => {
	const [modalVisible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<Modal
			onClose={() => setVisible(false)}
			visible={modalVisible}
			cancelPropagation={true}
		>
			<ResetPasswordSuccesModal />
		</Modal>
	);
};

export default SuccessfulPasswordReset;
