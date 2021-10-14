import { Radio } from "components/inputPack";
import { Input, Button, ProductInput } from "components";
import { Switch } from "antd";
import styles from "./Checkout.module.scss";
import { useState } from "react";

export const CheckoutForm = ({ ctaBtnText, priceType }) => {
	/**
	 * PriceType Values
	 * FixedPrice: 0
	 * Pay What You Want: 1
	 * Installment Payment: 2
	 * Make It Free: 3
	 */
	console.log("ctaBtnText -->", ctaBtnText);
	console.log("priceType -->", priceType);

	const [compareToPrice, setCompareToPrice] = useState(false);
	const [applyCoupon, setApplyCoupon] = useState(false);
	const [couponType, setCouponType] = useState(0);
	const [allowAffiliateMarket, setAllowAffiliateMarket] = useState(false);
	const [limitProductSale, setLimitProductSale] = useState(false);
	const [showTotalSales, setShowTotalSales] = useState(false);
	const [buyerPaysTransactionFee, setBuyerPaysTransactionFee] = useState(false);

	return (
		<form>
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
								setCompareToPrice((value) => !value);
								// setFieldValue("upload_content", e);
							}}
						/>
						<span className="pl-6 text-black-100">
							{compareToPrice ? "ON" : "OFF"}
						</span>
					</div>
				</div>

				{compareToPrice && (
					<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mt-4">
						<ProductInput prefix="NGN" name="NGN" placeholder="0" />
						<ProductInput prefix="GBP" name="GBP" placeholder="0" />
						<ProductInput prefix="KES" name="KES" placeholder="0" />
						<ProductInput prefix="TZS" name="TZS" placeholder="0" />
						<ProductInput prefix="USD" name="USD" placeholder="0" />
						<ProductInput prefix="GHS" name="GHS" placeholder="0" />
						<ProductInput prefix="ZAR" name="ZAR" placeholder="0" />
						<ProductInput prefix="UGX" name="UGX" placeholder="0" />
					</div>
				)}

				<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
					<div className="text-black-100">Apply Coupon Code</div>
					<div className="flex">
						<Switch
							onChange={(e) => {
								setApplyCoupon((value) => !value);
								// setFieldValue("upload_content", e);
							}}
						/>
						<span className="pl-6 text-black-100">
							{applyCoupon ? "ON" : "OFF"}
						</span>
					</div>
				</div>

				{applyCoupon && (
					<div className="my-2">
						<div className="w-full md:w-2/5">
							<Input
								// label="Checkout Call-To-Action Button"
								placeholder="Enter coupon code"
								className={styles.ctaBtn}
								name="ctaBtnText"
								onChange={(e) => setCtaBtnText(e.target.value)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4 lg:grid-cols-2 w-full md:w-3/5 lg:w-2/5 ">
							<div>
								<Radio
									value={couponType}
									content={0}
									label="Percentage(%)"
									onChange={(e) => setCouponType(e)}
									labelStyle={styles.radioLabelStyle}
								/>
								<div className="w-full">
									<Input
										// label="Checkout Call-To-Action Button"
										placeholder="0"
										className={styles.ctaBtn}
										name="ctaBtnText"
										onChange={(e) => setCtaBtnText(e.target.value)}
									/>
								</div>
							</div>

							<div>
								<Radio
									value={couponType}
									content={1}
									label="Fixed Amount(NGN)"
									onChange={(e) => setCouponType(e)}
									labelStyle={styles.radioLabelStyle}
								/>
								<div className="w-full">
									<Input
										// label="Checkout Call-To-Action Button"
										placeholder="0"
										className={styles.ctaBtn}
										name="ctaBtnText"
										onChange={(e) => setCtaBtnText(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div className="grid w-full lg:w-3/5 grid-cols-1 lg:grid-cols-2">
							<div className="flex items-center w-1/2">
								<p className="text-base-gray-200 pr-3">From</p>
								<Input
									type="datetime-local"
									className={styles.couponDateTimeLocaleContInput}
								/>
							</div>

							<div className="flex items-center w-1/2">
								<p className="text-base-gray-200 pr-8 lg:pr-3">to</p>
								<Input
									type="datetime-local"
									className={styles.couponDateTimeLocaleContInput}
								/>
							</div>
						</div>
					</div>
				)}

				{/* <div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
					<div className="text-black-100">Limit Product Sales</div>
					<div className="flex">
						<Switch
							onChange={(e) => {
								setLimitProductSale((value) => !value);
								// setFieldValue("upload_content", e);
							}}
						/>
						<span className="pl-6 text-black-100">
							{limitProductSale ? "ON" : "OFF"}
						</span>
					</div>
				</div> */}

				<div>
					{/* <div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Publicly Show Total Sales on Store Page
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setShowTotalSales((value) => !value);
									// setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{showTotalSales ? "ON" : "OFF"}
							</span>
						</div>
					</div> */}

					{/* <div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Buyer Pays for Transaction Fee</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setBuyerPaysTransactionFee((value) => !value);
									// setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{buyerPaysTransactionFee ? "ON" : "OFF"}
							</span>
						</div>
					</div> */}
				</div>

				<p className="mt-4">Settings</p>
				<div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg mt-3">
					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Allow Affiliates to Market Product
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setAllowAffiliateMarket((value) => !value);
									// setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{allowAffiliateMarket ? "ON" : "OFF"}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Limit Product Sales</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setLimitProductSale((value) => !value);
									// setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{limitProductSale ? "ON" : "OFF"}
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
									setShowTotalSales((value) => !value);
									// setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{showTotalSales ? "ON" : "OFF"}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Buyer Pays for Transaction Fee</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setBuyerPaysTransactionFee((value) => !value);
									// setFieldValue("upload_content", e);
								}}
							/>
							<span className="pl-6 text-black-100">
								{buyerPaysTransactionFee ? "ON" : "OFF"}
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
		</form>
	);
};
