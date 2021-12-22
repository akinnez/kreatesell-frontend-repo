import { useState, useEffect } from "react";
import { Button, Input } from "components";
import { Switch } from "antd";
import styles from "./Settings.module.scss";
import { useSelector } from "react-redux";
import {
	GetStoreDetails,
	UpdateStoreSettings,
	UpdateCTAButton,
} from "redux/actions";
import { _getMyStoreDetails } from "utils";

const StoreSettings = () => {
	const getStoreDetails = GetStoreDetails();
	const updateStoreSettings = UpdateStoreSettings();
	const updateCTAButton = UpdateCTAButton();
	const store = _getMyStoreDetails();

	const { loading } = useSelector((state) => state.store);

	const [userStoreSettings, setUserStoreSettings] = useState(() => ({
		enable_disable_tax: store?.customer_pay_tax,
		is_enable_product_cross_sell: store?.is_enable_product_cross_sell,
	}));

	const [ctaBtnValue, setCtaBtnValue] = useState({
		option: "store",
		cta_button: "",
	});

	const handleCTAButton = (e) => {
		e.preventDefault();
		updateCTAButton(ctaBtnValue, () => {
			getStoreDetails();
		});
	};

	useEffect(() => {
		getStoreDetails();
	}, []);

	return (
		<form
			className="bg-white rounded-lg px-3 lg:px-0 py-6 lg:py-0"
			onSubmit={handleCTAButton}
		>
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
					<Input
						placeholder="Checkout Page CTA Button"
						height="small"
						onChange={(e) => {
							setCtaBtnValue((value) => ({
								...value,
								cta_button: e.target.value,
							}));
						}}
						required
					/>
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
						loading={loading}
						onclick={handleCTAButton}
					/>
				</div>
			</div>

			<div className="flex justify-between items-center w-full lg:w-2/4 pt-4 mt-4">
				<div className="text-black-100 text-base">
					Enable products cross-sell on store product page
				</div>
				<div className="flex pb-4 md:pb-0">
					<Switch
						checked={userStoreSettings.is_enable_product_cross_sell}
						onChange={async () => {
							await setUserStoreSettings((value) => ({
								...value,
								is_enable_product_cross_sell:
									!value.is_enable_product_cross_sell,
							}));

							await updateStoreSettings(userStoreSettings, () => {
								getStoreDetails();
							});
						}}
					/>
					<span className="pl-6 text-black-100">
						{userStoreSettings?.is_enable_product_cross_sell ? "ON" : "OFF"}
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
						checked={userStoreSettings.enable_disable_tax}
						onChange={async () => {
							await setUserStoreSettings((value) => ({
								...value,
								enable_disable_tax: !value.enable_disable_tax,
							}));
							await updateStoreSettings(userStoreSettings, () => {
								getStoreDetails();
							});
						}}
					/>
					<span className="pl-6 text-black-100">
						{userStoreSettings.enable_disable_tax ? "ON" : "OFF"}
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
					loading={loading}
					onclick={handleCTAButton}
				/>
			</div>
		</form>
	);
};

export default StoreSettings;
