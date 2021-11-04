import { useState } from "react";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import { PricingCard, Button, UpgradeAccountForm } from "components";
import styles from "./Settings.module.scss";

const Billing = () => {
	const [modal, setModal] = useState(true);

	const openModal = () => setModal(true);
	const closeModal = () => setModal(false);

	return (
		<>
			<div>
				<div className="md:text-center pt-4 pb-4">
					<h3 className="text-black-100 font-bold text-xl">
						Upgrade Your Account
					</h3>
					<p className="text-base-gray-200">
						Upgrade your account to a premium account to enjoy more benefits.
					</p>
				</div>

				<div className="flex flex-col md:flex-row justify-center mb-12">
					<div className="md:pr-4">
						<PricingCard
							title="basic"
							price="0"
							btnText=""
							subTitle="All of the features you need to start selling your contents"
							priceType="100% Free"
							currentPlan
						/>
					</div>

					<div className="pt-4 md:pt-0 md:pl-4">
						<PricingCard
							title="business"
							subTitle="The combination of core tools, custom options, and automated events for professional course creators looking for the growing of their businesses."
							price="4,999"
							btnText="Select This Plan"
							priceType="Billed Annually"
							subPriceType="NGN 9989"
							btnOnClick={openModal}
						/>
					</div>
				</div>

				<DialogOverlay isOpen={modal} onDismiss={closeModal} className="pt-12 ">
					<DialogContent className={styles.modal} aria-label="modal">
						<UpgradeAccountForm />
					</DialogContent>
				</DialogOverlay>
			</div>
		</>
	);
};

export default Billing;
