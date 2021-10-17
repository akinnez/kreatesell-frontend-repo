import { useState } from "react";
import { Button, Input } from "components";
import { Switch } from "antd";
import styles from "./Settings.module.scss";

const StoreSettings = () => {
	const [crossSellProduct, setCrossSellProduct] = useState(false);
	const [enableTax, setEnableTax] = useState(false);

	return (
		<form className="">
			<div>
				<h3 className="text-black-100 font-medium text-2xl">Store Settings</h3>
				<p className="text-sm text-base-gray-200 lg:hidden">
					Enable store settings here.
				</p>
			</div>
			<div className="lg:productBorder w-full lg:w-9/12">
				<p className="text-black-100 text-sm md:text-base mb-0">
					Store Checkout Button CTA (Call To Action)
				</p>
				<div className="w-full lg:w-1/2">
					<Input placeholder="Checkout Page CTA Button" height="small" />
				</div>
				<p className="text-base-gray-200 text-xs">
					Customize your CTA button with best action requests. i.e. I want this!
					(Kindly leave it blank to use the default BUY NOW button.)
				</p>

				<div className="hidden lg:block mt-8 w-1/5">
					<Button
						text="Save Changes"
						bgColor="blue"
						className={styles.btnStyle}
					/>
				</div>
			</div>

			<div className="flex justify-between items-center w-full lg:w-2/4 pt-4 mt-4">
				<div className="text-black-100 text-base">
					Enable products cross-sell on store product page
				</div>
				<div className="flex pb-4 md:pb-0">
					<Switch
						onChange={(e) => {
							setCrossSellProduct((value) => !value);
							// setFieldValue("upload_content", e);
						}}
					/>
					<span className="pl-6 text-black-100">
						{crossSellProduct ? "ON" : "OFF"}
					</span>
				</div>
			</div>
			<p className="text-base-gray-200 text-xs pt-2">
				Switch on to enable cross sell, buyers will get to see other products
				from your store listings when it is on.
			</p>

			<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
				<div className="text-black-100 text-base">
					Enable Tax on buyer’s checkout
				</div>
				<div className="flex">
					<Switch
						onChange={(e) => {
							setEnableTax((value) => !value);
							// setFieldValue("upload_content", e);
						}}
					/>
					<span className="pl-6 text-black-100">
						{enableTax ? "ON" : "OFF"}
					</span>
				</div>
			</div>
			<p className="text-base-gray-200 text-xs pt-2">
				By Switching on, your buyers will be responsible for the payment of any
				tax fee imposed by Kreatesell.
			</p>

			<div className="mt-8 w-4/12 lg:hidden">
				<Button
					text="Save Changes"
					bgColor="blue"
					className={styles.btnStyle}
				/>
			</div>
		</form>
	);
};

export default StoreSettings;
