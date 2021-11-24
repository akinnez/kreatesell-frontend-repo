import { Percentage, Radio } from "components/inputPack";
import { Input, Button, ProductInput } from "components";
import { Switch } from "antd";
import styles from "./Checkout.module.scss";
import { useState, useEffect } from "react";
import { CloudUpload } from "utils";
import Image from "next/image";
import { useFormik } from "formik";
import { Select } from "components/select/Select";
import { useSelector } from "react-redux";
import {
	GetProductByID,
	GetBillingInterval,
	CreateProduct,
	SetProductTab,
} from "redux/actions";
import { useHandleProductInputDebounce, useUpload } from "hooks";

export const CheckoutForm = ({ ctaBtnText, priceType }) => {
	/**
	 * PriceType Values
	 * FixedPrice: 1
	 * Pay What You Want: 2
	 * Installment Payment: 3
	 * Make It Free: 4
	 */
	const getProductByID = GetProductByID();
	const getBillingInterval = GetBillingInterval();
	const createProduct = CreateProduct();
	const setProductTab = SetProductTab();

	const [compareToPrice, setCompareToPrice] = useState(false);
	const [applyCoupon, setApplyCoupon] = useState(false);
	const [couponType, setCouponType] = useState(0);
	const [allowAffiliateMarket, setAllowAffiliateMarket] = useState(false);
	const [uploadPromotionalMaterial, setUploadPromotionalMaterial] =
		useState(false);
	const [limitProductSale, setLimitProductSale] = useState(false);
	const [showTotalSales, setShowTotalSales] = useState(false);
	const [buyerPaysTransactionFee, setBuyerPaysTransactionFee] = useState(false);
	const [promotionalMaterial, setPromotionalMaterial] = useState([]);
	const [frequencyOptions, setFrequencyOptions] = useState([]);
	const [numberOfInputs, setNumberOfInputs] = useState(1);

	const [couponVariance, setCouponVariance] = useState({
		isPercentage: true,
		is_fixed_amount: false,
	});

	const { data: minimumPrice, handleDebounce: handleMinimumPrice } =
		useHandleProductInputDebounce();
	const { data: sellingPrice, handleDebounce: handleSellingPrice } =
		useHandleProductInputDebounce();
	const { data: originalPrice, handleDebounce: handleOriginalPrice } =
		useHandleProductInputDebounce();
	const { data: suggestedPrice, handleDebounce: handleSuggestedPrice } =
		useHandleProductInputDebounce();
	const { data: initialPrice, handleDebounce: handleInitialPrice } =
		useHandleProductInputDebounce();
	const { data: installmentPrice, handleDebounce: handleInstallmentPrice } =
		useHandleProductInputDebounce();

	const { preview, getRootProps, getInputProps } = useUpload({
		setFileChange: setPromotionalMaterial,
	});

	const { productID, product, billingInterval, loading } = useSelector(
		(state) => state.product
	);

	const mappedBillingInterval = billingInterval?.map((billing) => ({
		label: billing.billing_types,
		value: billing.billing_durations,
	}));

	const paymentFrequencyOptions = async () => {
		let opt = [];
		for (let i = 1; i < 10; i++) {
			opt.push(i);
			const values = opt.map((item) => ({ label: item, value: item }));
			setFrequencyOptions(values);
		}
	};

	useEffect(() => {
		paymentFrequencyOptions();
	}, []);

	useEffect(() => {
		getBillingInterval();
	}, []);

	useEffect(() => {
		if (productID) {
			getProductByID(productID);
		}
	}, [productID]);

	const handleSubmit = (data) => {
		delete data?.cover_image;
		delete data?.product_details?.product_cover_picture;
		delete data?.upload_content || data?.product_details?.upload_content;
		delete data?.upload_preview;
		delete data?.product_listing_status;

		if (promotionalMaterial.length < 1) {
			delete data?.promotional_items;
		}
		if (!data.cta_button) {
			delete data.cta_button;
		}
		if (data?.selling_prices.length < 1) {
			delete data.selling_prices;
		}
		if (data?.minimum_prices.length < 1) {
			delete data.minimum_prices;
		}
		if (data?.original_prices.length < 1) {
			delete data.original_prices;
		}
		if (data?.suggested_prices.length < 1) {
			delete data.suggested_prices;
		}
		if (data?.initial_prices.length < 1) {
			delete data.initial_prices;
		}
		if (data?.installment_prices.length < 1) {
			delete data.installment_prices;
		}
		if (!data.checkout.is_coupon) {
			delete data.coupon_settings;
			delete data.checkout;
		}
		if (!data.product_settings.allow_affiliates) {
			delete data.product_settings.affiliate_percentage_on_sales;
		}
		if (!data.is_show_compare_price) {
			delete data.is_show_compare_price;
		}

		createProduct(data, () => setProductTab(2));
	};

	const initialValues = {
		checkout: {
			cta_button: "",
			is_coupon: false,
			coupon_code: "",
		},
		is_show_compare_price: false,
		pricing_type_id: 1,
		selling_prices: [],
		minimum_prices: [],
		original_prices: [],
		suggested_prices: [],
		initial_prices: [],
		installment_prices: [],
		coupon_settings: {
			start_date: "",
			end_date: "",
			fixed_amount_value: 0,
			percentage_value: 0,
			is_percentage: false,
			is_fixed_amount: false,
		},
		product_settings: {
			allow_affiliates: false,
			affiliate_percentage_on_sales: 0,
			is_limited_sales: false,
			show_number_of_sales: false,
		},
		promotional_items: {
			allow_promotional_items: false,
			promotional_files: [],
		},
		action: "e",
		set_price: false,
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		// validationSchema: "",
		validateOnChange: false,
	});

	const { errors, setFieldValue, values } = formik;

	useEffect(() => {
		if (!values.enable_preorder) {
			delete values.preorder_details;
			delete values.enable_preorder;
		}
	}, [values]);

	useEffect(() => {
		if (
			values[
				"minimum_prices" ||
					"suggested_prices" ||
					"original_prices" ||
					"suggested_prices" ||
					"initial_prices" ||
					"installment_prices"
			]?.length > 0
		) {
			setFieldValue("set_price", true);
		}
	}, [values, setFieldValue]);

	useEffect(() => {
		setFieldValue("pricing_type_id", priceType);
		setFieldValue("checkout.cta_button", ctaBtnText);
		setFieldValue("selling_prices", sellingPrice);
		setFieldValue("minimum_prices", minimumPrice);
		setFieldValue("is_show_compare_price", compareToPrice);
		setFieldValue("checkout.is_coupon", applyCoupon);
		setFieldValue("coupon_settings.is_percentage", couponVariance.isPercentage);
		setFieldValue(
			"coupon_settings.is_fixed_amount",
			couponVariance.is_fixed_amount
		);
		setFieldValue("product_settings.allow_affiliates", allowAffiliateMarket);
		setFieldValue("product_settings.is_limited_sales", limitProductSale);
		setFieldValue("product_settings.show_number_of_sales", showTotalSales);
		setFieldValue("who_bear_fee", buyerPaysTransactionFee);
		setFieldValue("minimum_prices", minimumPrice);
		setFieldValue("selling_prices", sellingPrice);
		setFieldValue("original_prices", originalPrice);
		setFieldValue("suggested_prices", suggestedPrice);
		setFieldValue("initial_prices", initialPrice);
		setFieldValue("installment_prices", installmentPrice);
		setFieldValue(
			"promotional_items.allow_promotional_items",
			uploadPromotionalMaterial
		);
		setFieldValue(
			"promotional_items.promotional_files",
			preview?.map((item) => item.url)
		);
	}, [
		setFieldValue,
		priceType,
		ctaBtnText,
		sellingPrice,
		compareToPrice,
		applyCoupon,
		couponVariance,
		allowAffiliateMarket,
		limitProductSale,
		showTotalSales,
		buyerPaysTransactionFee,
		minimumPrice,
		sellingPrice,
		originalPrice,
		suggestedPrice,
		uploadPromotionalMaterial,
		preview,
		promotionalMaterial,
		initialPrice,
		installmentPrice,
	]);

	useEffect(() => {
		setFieldValue("product_name", product?.product_details?.product_name);
		setFieldValue(
			"product_description",
			product?.product_details?.product_description
		);
		setFieldValue("enable_preorder", product?.product_details?.enable_preorder);
		setFieldValue("upload_content", product?.product_details?.upload_content);
		setFieldValue(
			"product_visibility_status",
			product?.product_details?.product_visibility
		);
		setFieldValue("upload_preview", product?.product_details?.is_preview_only);
		setFieldValue(
			"preorder_details.preorder_release_date",
			product?.product_details?.preoder_date
		);
		setFieldValue(
			"preorder_details.is_preorder_downloadable",
			product?.product_details?.is_preoder_downloadable ?? false
		);
		setFieldValue(
			"kreatesell_id",
			product?.product_details?.kreasell_product_id
		);
		setFieldValue("product_type_id", product?.product_details?.product_type_id);
		setFieldValue("product_id", product?.product_details?.id);
		setFieldValue(
			"product_listing_status_id",
			product?.product_details?.product_listing_status
		);
	}, [product]);

	return (
		<form onSubmit={formik.handleSubmit}>
			{[1, 3].includes(priceType) && (
				<div>
					<p className="text-base mb-2">Selling Price</p>
					<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
						<ProductInput
							prefix="NGN"
							name="NGN"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>

						<ProductInput
							prefix="GBP"
							name="GBP"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>

						<ProductInput
							prefix="KES"
							name="KES"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>

						<ProductInput
							prefix="TZS"
							name="TZS"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>

						<ProductInput
							prefix="USD"
							name="USD"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>

						<ProductInput
							prefix="GHS"
							name="GHS"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>

						<ProductInput
							prefix="ZAR"
							name="ZAR"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>

						<ProductInput
							prefix="UGX"
							name="UGX"
							placeholder="0"
							onChange={(e) => handleSellingPrice(e)}
						/>
					</div>
					<p className="text-base-gray-200 text-xs pt-2">
						Set the equivalent price of your product in the currencies of the
						country you accept. You can always enable or disable any currency in
						your currency settings page.
					</p>
				</div>
			)}

			{priceType === 2 && (
				<div>
					<div>
						<p className="text-base mb-2">Minimum Amount</p>
						<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
							<ProductInput
								prefix="NGN"
								name="NGN"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
							<ProductInput
								prefix="GBP"
								name="GBP"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
							<ProductInput
								prefix="KES"
								name="KES"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
							<ProductInput
								prefix="TZS"
								name="TZS"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
							<ProductInput
								prefix="USD"
								name="USD"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
							<ProductInput
								prefix="GHS"
								name="GHS"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
							<ProductInput
								prefix="ZAR"
								name="ZAR"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
							<ProductInput
								prefix="UGX"
								name="UGX"
								placeholder="0"
								onChange={(e) => handleMinimumPrice(e)}
							/>
						</div>
					</div>

					<div className="pt-4">
						<p className="text-base mb-2">Suggested Amount</p>
						<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
							<ProductInput
								prefix="NGN"
								name="NGN"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
							<ProductInput
								prefix="GBP"
								name="GBP"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
							<ProductInput
								prefix="KES"
								name="KES"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
							<ProductInput
								prefix="TZS"
								name="TZS"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
							<ProductInput
								prefix="USD"
								name="USD"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
							<ProductInput
								prefix="GHS"
								name="GHS"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
							<ProductInput
								prefix="ZAR"
								name="ZAR"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
							<ProductInput
								prefix="UGX"
								name="UGX"
								placeholder="0"
								onChange={(e) => handleSuggestedPrice(e)}
							/>
						</div>
					</div>
				</div>
			)}

			{priceType === 3 && (
				<div>
					<div className="pt-4">
						<p className="text-base mb-2">Initial Payment at Checkout</p>
						<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
							<ProductInput
								prefix="NGN"
								name="NGN"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
							<ProductInput
								prefix="GBP"
								name="GBP"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
							<ProductInput
								prefix="KES"
								name="KES"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
							<ProductInput
								prefix="TZS"
								name="TZS"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
							<ProductInput
								prefix="USD"
								name="USD"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
							<ProductInput
								prefix="GHS"
								name="GHS"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
							<ProductInput
								prefix="ZAR"
								name="ZAR"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
							<ProductInput
								prefix="UGX"
								name="UGX"
								placeholder="0"
								onChange={(e) => handleInitialPrice(e)}
							/>
						</div>
					</div>

					<div className="mt-3 w-full">
						<p className="text-base mb-2">Select Frequency of payments</p>
						<div className="w-full lg:w-1/5">
							<Select
								options={frequencyOptions}
								onChange={(e) => setNumberOfInputs(e.value)}
							/>
						</div>
					</div>

					<div className="mt-3">
						<p className="text-base mb-2">
							Division of the remaining payment by the frequency
						</p>

						{[...Array(numberOfInputs)].map((item, i) => (
							<BatchInput key={i} handleChange={handleInstallmentPrice} />
						))}
					</div>

					<div className="mt-3 w-full">
						<p className="text-base mb-2">Interval between each payment</p>
						<div className="w-full lg:w-1/5">
							<Select options={mappedBillingInterval} />
						</div>
					</div>
				</div>
			)}

			<div>
				{[1].includes(priceType) && (
					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Show Compare-To Price (Optional)
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setCompareToPrice((value) => !value);
								}}
								checked={compareToPrice}
							/>
							<span className="pl-6 text-black-100">
								{compareToPrice ? "ON" : "OFF"}
							</span>
						</div>
					</div>
				)}

				{compareToPrice && (
					<div className="mt-4">
						<p className="text-sm">Original price (NGN) </p>
						<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mt-1">
							<ProductInput
								prefix="NGN"
								name="NGN"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
							<ProductInput
								prefix="GBP"
								name="GBP"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
							<ProductInput
								prefix="KES"
								name="KES"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
							<ProductInput
								prefix="TZS"
								name="TZS"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
							<ProductInput
								prefix="USD"
								name="USD"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
							<ProductInput
								prefix="GHS"
								name="GHS"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
							<ProductInput
								prefix="ZAR"
								name="ZAR"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
							<ProductInput
								prefix="UGX"
								name="UGX"
								placeholder="0"
								onChange={(e) => handleOriginalPrice(e)}
							/>
						</div>
					</div>
				)}

				{priceType !== 4 && (
					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Apply Coupon Code</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setApplyCoupon((value) => !value);
								}}
								checked={applyCoupon}
							/>
							<span className="pl-6 text-black-100">
								{applyCoupon ? "ON" : "OFF"}
							</span>
						</div>
					</div>
				)}

				{priceType !== 4 && applyCoupon && (
					<div className="my-2">
						<div className="w-full md:w-2/5">
							<Input
								placeholder="Enter coupon code"
								className={styles.ctaBtn}
								name="checkout.coupon_code"
								onChange={formik.handleChange}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4 lg:grid-cols-2 w-full md:w-3/5 lg:w-3/5 xl:w-3/5 ">
							<div>
								<Radio
									value={couponType}
									content={0}
									label="Percentage(%)"
									onChange={(e) => {
										setCouponType(e);
										setCouponVariance((value) => ({
											...value,
											isPercentage: !value.isPercentage,
											is_fixed_amount: !value.is_fixed_amount,
										}));
									}}
									labelStyle={styles.radioLabelStyle}
								/>
								<div className="w-full">
									<Input
										placeholder="0"
										className={styles.ctaBtn}
										name="ctaBtnText"
										name="coupon_settings.percentage_value"
										onChange={formik.handleChange}
									/>
								</div>
							</div>

							<div>
								<Radio
									value={couponType}
									content={1}
									label="Fixed Amount(NGN)"
									onChange={(e) => {
										setCouponType(e);
										setCouponVariance((value) => ({
											...value,
											isPercentage: !value.isPercentage,
											is_fixed_amount: !value.is_fixed_amount,
										}));
									}}
									labelStyle={styles.radioLabelStyle}
								/>
								<div className="w-full">
									<Input
										placeholder="0"
										className={styles.ctaBtn}
										name="coupon_settings.fixed_amount_value"
										onChange={formik.handleChange}
									/>
								</div>
							</div>
						</div>

						<div className="grid gap-3 w-full lg:w-full xl:w-3/5 grid-cols-1 lg:grid-cols-2">
							<div className="flex items-center gap-3">
								<p className="text-base-gray-200">From</p>
								<Input
									type="datetime-local"
									className={styles.couponDateTimeLocaleContInput}
									onChange={(e) => {
										setFieldValue("coupon_settings.start_date", e.target.value);
									}}
								/>
							</div>

							<div className="flex items-center gap-3">
								<p className="text-base-gray-200 pr-5 lg:pr-0">to</p>
								<Input
									type="datetime-local"
									className={styles.couponDateTimeLocaleContInput}
									onChange={(e) => {
										setFieldValue("coupon_settings.end_date", e.target.value);
									}}
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
				<div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg mt-3 w-11/12">
					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Allow Affiliates to Market Product
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setAllowAffiliateMarket((value) => !value);
								}}
								checked={allowAffiliateMarket}
							/>
							<span className="pl-6 text-black-100">
								{allowAffiliateMarket ? "ON" : "OFF"}
							</span>
						</div>
					</div>

					{allowAffiliateMarket && (
						<>
							<div className="w-3/5">
								<Percentage
									border={true}
									name="product_settings.affiliate_percentage_on_sales"
									onChange={formik.handleChange}
								/>
							</div>

							<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
								<div className="text-black-100">
									Upload a Promotional Material for affiliates
								</div>
								<div className="flex">
									<Switch
										onChange={(e) => {
											setUploadPromotionalMaterial((value) => !value);
										}}
										checked={uploadPromotionalMaterial}
									/>
									<span className="pl-6 text-black-100">
										{uploadPromotionalMaterial ? "ON" : "OFF"}
									</span>
								</div>
							</div>

							{uploadPromotionalMaterial && (
								<div className="pt-2 w-3/5">
									<p className="text-base-gray-200 text-xs">
										Only one file is allowed to be uploaded. Bundle all your
										files into single RAR or ZIP file. <br /> The maximum
										allowed file size is 1GB.
									</p>

									<div
										className={`${styles.contentFileUpload} ${
											promotionalMaterial?.length > 0 && styles.activeUpload
										}`}
										{...getRootProps()}
									>
										<input {...getInputProps()} />
										<Image src={CloudUpload} alt="upload image" />
										<p className="hidden md:block text-primary-blue text-sm pl-4 my-auto">
											Drag and Drop or Upload your product files
										</p>
										<p className="md:hidden text-primary-blue text-sm pl-4 my-auto">
											Upload your product files
										</p>
									</div>
								</div>
							)}
						</>
					)}

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">Limit Product Sales</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setLimitProductSale((value) => !value);
								}}
								checked={limitProductSale}
							/>
							<span className="pl-6 text-black-100">
								{limitProductSale ? "ON" : "OFF"}
							</span>
						</div>
					</div>

					{limitProductSale && (
						<div className="w-3/5 items-center flex justify-between pt-3">
							<p className="text-base-gray-200 ">Product Sales Limit</p>
							<div className="">
								<Input placeholder="100" className={styles.limitProductInput} />
							</div>
						</div>
					)}

					<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
						<div className="text-black-100">
							Publicly Show Total Sales on Store Page
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setShowTotalSales((value) => !value);
								}}
								checked={showTotalSales}
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
								}}
								checked={buyerPaysTransactionFee}
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
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</form>
	);
};

const BatchInput = ({ handleChange }) => {
	return (
		<div className="w-4/5 md:w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8 py-2">
			<ProductInput
				prefix="NGN"
				name="NGN"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>
			<ProductInput
				prefix="GBP"
				name="GBP"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>
			<ProductInput
				prefix="KES"
				name="KES"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>
			<ProductInput
				prefix="TZS"
				name="TZS"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>
			<ProductInput
				prefix="USD"
				name="USD"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>
			<ProductInput
				prefix="GHS"
				name="GHS"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>
			<ProductInput
				prefix="ZAR"
				name="ZAR"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>
			<ProductInput
				prefix="UGX"
				name="UGX"
				placeholder="0"
				onChange={(e) => handleChange(e)}
			/>

			<div className="pt-2 lg:hidden">
				<div className="divider"></div>
			</div>
		</div>
	);
};
