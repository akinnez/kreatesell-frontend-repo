import { Input, CheckoutForm } from "components";
import { Radio } from "components/inputPack";
import { useState } from "react";
import styles from "./Checkout.module.scss";

export const CheckoutProductTab = () => {
	const [priceType, setPriceType] = useState(0);
	const [ctaBtnText, setCtaBtnText] = useState("");
	// const [free, setFree] = useState("");
	// const [installment, setInstallment] = useState("");
	// const [payWhatever, setPayWhatever] = useState("");

	return (
		<div className={`px-0 lg:px-8 ${styles.container}`}>
			<h3 className="text-black-100 font-medium text-2xl">Checkout details</h3>

			<div>
				<div className="w-full md:w-2/5">
					<Input
						label="Checkout Call-To-Action Button"
						placeholder="Buy now"
						className={styles.ctaBtn}
						name="ctaBtnText"
						onChange={(e) => setCtaBtnText(e.target.value)}
					/>
				</div>
				<p className="text-xs text-base-gray-200">
					Leave blank if you want the default{" "}
					<span className="text-black">BUY NOW</span>, else, change it to best
					action request of your taste.
				</p>
			</div>

			<div className="lg:w-11/12 grid grid-cols-2 lg:grid-cols-4">
				<div>
					<Radio
						value={priceType}
						content={0}
						label="Fixed Price"
						onChange={(e) => setPriceType(e)}
						labelStyle={styles.radioLabelStyle}
					/>
				</div>

				<div>
					<Radio
						value={priceType}
						content={1}
						label="Pay What You Want"
						onChange={(e) => setPriceType(e)}
						labelStyle={styles.radioLabelStyle}
					/>
				</div>

				<div>
					<Radio
						value={priceType}
						content={2}
						label="Installment Payment"
						onChange={(e) => setPriceType(e)}
						labelStyle={styles.radioLabelStyle}
					/>
				</div>

				<div className="flex items-center">
					<Radio
						value={priceType}
						content={3}
						label="Make It Free"
						onChange={(e) => setPriceType(e)}
						labelStyle={styles.disabledRadio}
					/>
					<div className="bg-base-green-100 ml-2 p-1 text-base-white-100 font-semibold">
						BUSINESS
					</div>
				</div>
			</div>

			<CheckoutForm priceType={priceType} ctaBtnText={ctaBtnText} />
		</div>
	);
};
