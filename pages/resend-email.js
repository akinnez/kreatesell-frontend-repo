import { GeneralLayout, ResendVerificationEmailForm } from "../components";

const ResendVerificationEmailCode = () => {
	return (
		<GeneralLayout
			Form={ResendVerificationEmailForm}
			formTitle="Verify Email"
			title="KreateSell | Verify Email"
			subTitle="Verify email address"
			socialBtn={false}
		/>
	);
};

export default ResendVerificationEmailCode;
