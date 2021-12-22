import { Button } from "components/button/Button";
import Image from "next/image";
import {
	ActiveTick,
	InactiveMasterCard,
	InactivePaypal,
	ActiveStripe,
} from "utils";
import { RightArrow } from "utils/icons/RightArrow";

export const UpgradeAccountForm = () => {
	return (
		<>
			<div className="px-0 md:px-8">
				<div className="text-center mb-4">
					<h3 className="text-black-100 font-bold text-xl">
						Upgrade Your Account
					</h3>
					<h4 className="text-black-100 pt-2">BUSINESS</h4>

					<div className="divider"></div>

					<div className="text-base-green-200 font-bold text-2xl">
						<sup className="font-normal text-xs text-black-100">NGN</sup> 4,167
						<sub className="font-normal text-xs text-black-100">/ Month</sub>
					</div>
				</div>

				<form className="px-2 md:px-8 pt-4">
					<div className="text-primary-blue font-medium text-lg">
						Payment Details
					</div>
					<div className="divider"></div>

					<div>
						<div>Select Currency</div>
						<p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
							Select your preferred currency and get price equivalent
						</p>
					</div>

					<div className="grid gap-4 grid-cols-3 md:grid-cols-6 pt-3">
						<div className="activeCard px-2 flex items-center justify-between">
							<p className="pt-2">NGN</p>
							<div>
								<Image src={ActiveTick} alt="active" width="16" height="16" />
							</div>
						</div>
						<div className="card p-2 flex items-center">USD</div>
						<div className="card p-2 flex items-center">GBP</div>
						<div className="card p-2 flex items-center">KES</div>
						<div className="card p-2 flex items-center">ZAR</div>
						<div className="card p-2 flex items-center">GHS</div>
					</div>

					<div className="pt-6">
						<div>Payment Method</div>
						<p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
							Select your preferred payment method
						</p>
					</div>

					<div className="grid gap-4 grid-cols-3 pt-3">
						<div className="activeCard p-2 flex justify-between items-center">
							<div>
								<Image src={ActiveStripe} alt="stripe" />
							</div>
							<div>
								<Image src={ActiveTick} alt="active" width="16" height="16" />
							</div>
						</div>

						<div className="flex justify-center card p-2">
							<Image src={InactivePaypal} alt="stripe" />
						</div>

						<div className="flex justify-center card p-2">
							<Image src={InactiveMasterCard} alt="stripe" />
						</div>
					</div>

					<div className="priceMenu my-6 py-3 px-8">
						<div className="flex justify-between pt-2">
							<p>SubTotal</p>
							<p>NGN 4,167</p>
						</div>
						<div className="divider"> </div>
						<div className="flex justify-between">
							<p>Total</p>
							<p className="text-primary-blue font-medium">NGN 4,167</p>
						</div>
					</div>

					<div className="w-full">
						<Button
							text="Pay NGN 4,167"
							bgColor="blue"
							style={{ width: "100%" }}
							icon={<RightArrow />}
						/>
					</div>
				</form>
			</div>

			<style jsx>{`
				.activeCard {
					border: 1px solid #2dc071;
					border-radius: 0.5rem;
					cursor: pointer;
					color: #8c8c8c;
					font-size: 12px;
				}

				.card {
					border-radius: 0.5rem;
					border: 1px solid #f0f0f0;
					cursor: pointer;
					color: #8c8c8c;
					font-size: 12px;
				}

				.priceMenu {
					box-shadow: 0px 20px 200px rgba(34, 34, 34, 0.1);
					background: #ffffff;
					color: #262626;
				}
			`}</style>
		</>
	);
};
