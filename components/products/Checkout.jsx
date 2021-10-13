import { Input, Button, ProductInput } from "components";
import { Radio } from "components/inputPack";
import { useState } from "react";
import { Switch } from "antd";
import styles from "./Checkout.module.scss";
import { SetProductTab } from "redux/actions";

export const CheckoutProductTab = () => {
	const setProductTab = SetProductTab();
	const [priceType, setPriceType] = useState(0);
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

			<div>
				<p className="text-base mb-2">Selling Price</p>
				<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
					<ProductInput prefix="NGN" name="NGN" placeholder="0" />
					<ProductInput prefix="GBP" name="GBP" placeholder="0" />
					<ProductInput prefix="KES" name="KES" placeholder="0" />
					<ProductInput prefix="TZS" name="TZS" placeholder="0" />
					<ProductInput prefix="USD" name="USD" placeholder="0" />
					<ProductInput prefix="GHS" name="GHS" placeholder="0" />
					<ProductInput prefix="ZAR" name="ZAR" placeholder="0" />
					<ProductInput prefix="UGX" name="UGX" placeholder="0" />
				</div>
				<p className="text-base-gray-200 text-xs pt-2">
					Set the equivalent price of your product in the currencies of the
					country you accept. You can always enable or disable any currency in
					your currency settings page.
				</p>
			</div>

			<div>
				<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
					<div className="text-black-100">Show Compare-To Price (Optional)</div>
					<div className="flex">
						<Switch
							onChange={(e) => {
								// setContentFiles((value) => !value);
								setFieldValue("upload_content", e);
							}}
						/>
						<span className="pl-6 text-black-100">
							{/* {contentFiles ? "ON" : "OFF"} */}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
					<div className="text-black-100">Limit Product Sales</div>
					<div className="flex">
						<Switch
							onChange={(e) => {
								// setContentFiles((value) => !value);
								setFieldValue("upload_content", e);
							}}
						/>
						<span className="pl-6 text-black-100">
							{/* {contentFiles ? "ON" : "OFF"} */}
						</span>
					</div>
				</div>

				<div>
					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Publicly Show Total Sales on Store Page
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									// setContentFiles((value) => !value);
									setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{/* {contentFiles ? "ON" : "OFF"} */}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Buyer Pays for Transaction Fee</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									// setContentFiles((value) => !value);
									setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{/* {contentFiles ? "ON" : "OFF"} */}
							</span>
						</div>
					</div>
				</div>

				<p>Settings</p>
				<div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg mt-3">
					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Allow Affiliates to Market Product
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									// setContentFiles((value) => !value);
									setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{/* {contentFiles ? "ON" : "OFF"} */}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Limit Product Sales</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									// setContentFiles((value) => !value);
									setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{/* {contentFiles ? "ON" : "OFF"} */}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Publicly Show Total Sales on Store Page
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									// setContentFiles((value) => !value);
									setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{/* {contentFiles ? "ON" : "OFF"} */}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Buyer Pays for Transaction Fee</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									// setContentFiles((value) => !value);
									setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{/* {contentFiles ? "ON" : "OFF"} */}
							</span>
						</div>
					</div>
				</div>

				<p className="text-center text-sm text-base-gray pt-4 md:text-base">
					Almost there, now click the button to proceed to create product from
					template
				</p>

				<div className="flex flex-col-reverse lg:flex-row justify-center items-center pb-4">
					<div className="">
						<Button
							text="Previous"
							className={styles.digitalBtn}
							onClick={() => setProductTab(0)}
						/>
					</div>
					<div className="pl-0 mb-4 lg:pl-4 lg:mb-0">
						<Button
							text="Save and continue"
							bgColor="blue"
							className={styles.digitalBtn}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
