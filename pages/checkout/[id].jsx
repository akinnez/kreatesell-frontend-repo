import {useState, useEffect} from 'react';
import Image from 'next/image';
import {DialogOverlay, DialogContent} from '@reach/dialog';
import {
	Row,
	Col,
	// Card, Form, Input as AntInput
} from 'antd';
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js';

import Logo from 'components/authlayout/logo';
import {
	ActiveTick,
	ArrowLeft,
	RightArrow,
	CloudDownload,
	ActiveStripe,
	AdvancedBitcoin,
	AdvancedPaypal,
	splitFullName,
	FlutterwaveLogo,
	ErrorIcon,
	transactionFees,
	PaystackLogo,
	RenderIf,
} from 'utils';
import {Tooltip} from 'antd';
import {SelectV2} from 'components/form-input';
import {PhoneNumberInput} from 'components';
import styles from '../../public/css/checkout.module.scss';
import {Input, Button} from 'components';
import CurrencyCard from 'components/settings/CurrencyCard';
import {ConsumerSalesCheckoutSchema} from 'validation';
import {useFormik, Formik} from 'formik';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {usePaystackPayment} from 'react-paystack';
import {useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import {
	SendPaymentCheckoutDetails,
	ConvertCurrency,
	GetStoreCheckoutCurrencies,
} from 'redux/actions';
import crypto from 'crypto';
import LogoImg from '../../public/images/logo.svg';
import useFetchUtilities from 'hooks/useFetchUtilities';
import Loader from 'components/loader';
import axios from 'axios';
import useCheckoutCurrency from 'hooks/useCheckoutCurrencies';

const countryPayments = {
	NGN: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
		{
			type: 'Paystack',
			icon: PaystackLogo,
			value: 'paystack',
		},
	],
	GHS: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
		{
			type: 'Paystack',
			icon: PaystackLogo,
			value: 'paystack',
		},
	],
	USD: [
		{
			type: 'Stripe',
			icon: ActiveStripe,
			value: 'stripe',
		},
		{
			type: 'Paypal',
			icon: AdvancedPaypal,
			value: 'paypal',
		},
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
		{
			type: 'CryptoCurrency',
			icon: AdvancedBitcoin,
			value: 'crypto',
		},
	],
	GBP: [
		{
			type: 'Stripe',
			icon: ActiveStripe,
			value: 'stripe',
		},
		{
			type: 'Paypal',
			icon: AdvancedPaypal,
			value: 'paypal',
		},
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
		{
			type: 'CryptoCurrency',
			icon: AdvancedBitcoin,
			value: 'crypto',
		},
	],
	CAD: [
		{
			type: 'Stripe',
			icon: ActiveStripe,
			value: 'stripe',
		},
		{
			type: 'Paypal',
			icon: AdvancedPaypal,
			value: 'paypal',
		},
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
		{
			type: 'CryptoCurrency',
			icon: AdvancedBitcoin,
			value: 'crypto',
		},
	],
	XAF: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	XOF: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	GMD: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	KES: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	LRD: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	MWK: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	SLL: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	ZAR: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	TZS: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
	UGX: [
		{
			type: 'Flutterwave',
			icon: FlutterwaveLogo,
			value: 'flutterwave',
		},
	],
};
const Checkout = () => {
	const router = useRouter();
	const productId = router.query.id;
	const productLink = `${process.env.BASE_URL}v1/kreatesell/product/get/${productId}`;
	const [modal, setModal] = useState(false);

	const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies();
	const checkoutDetails = useSelector((state) => state.checkout);
	const {convertedCurrency, loading: currencyConverterLoading} = useSelector(
		(state) => state.currencyConverter
	);
	const {loading: storeCheckoutCurrenciesLoading} = useSelector(
		(state) => state.store
	);

	const [country, setCountry] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [countryId, setCountryId] = useState(null);
	const {countries} = useSelector((state) => state.utils);

	const [isFree, setIsFree] = useState(true); //temporary state control

	const [{options}, dispatch] = usePayPalScriptReducer();

	const {countriesCurrency, filterdWest, filteredCentral} =
		useCheckoutCurrency();

	const [storecheckoutCurrencyLoading, setStorecheckoutCurrencyLoading] =
		useState(true);
	const [activeCurrency, setActiveCurrency] = useState({});
	const [desiredAmount, setDesiredAmount] = useState('');

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

	// converted price + transaction fees
	const [totalPrice, setTotalPrice] = useState();

	// this is the product details for a product whose price has been defined by
	// kreator and is also the active currency selected
	const [alreadyDefinedPrice, setAlreadyDefinedPrice] = useState(null);
	const sendPaymentCheckoutDetails = SendPaymentCheckoutDetails();
	const convertCurrency = ConvertCurrency();

	const closeModal = () => setModal(false);

	const [storeDetails, setStoreDetails] = useState(null);
	const [checkOutDetails, setCheckOutDetails] = useState([]);
	const [storeId, setStoreId] = useState();
	const checkout = checkOutDetails?.filter(
		(item) => item?.price_indicator === 'Selling'
	);
	const currency_name = checkout?.[0]?.currency_name;
	const price = checkout?.[0]?.price;
	const getProductDetails = async (productLink) => {
		try {
			const response = await axios.get(productLink);
			setStoreDetails(response.data.data);
			setCheckOutDetails(response?.data?.data?.check_out_details);
			setStoreId(response?.data?.data?.store_dto?.store_id);
		} catch (error) {
			console.log(error);
		}
	};

	const getCurrency = (priceOrName) => {
		if (priceOrName === 'currency') {
			return activeCurrency?.currency || activeCurrency?.currency_name;
		} else if (priceOrName === 'price') {
			return (
				alreadyDefinedPrice?.price ||
				convertedCurrency?.buy_rate * checkOutInNaira?.price ||
				checkOutInNaira?.price
			);
		}
	};

	const handlePhoneCode = (countryParam) => {
		let phoneCode = countries.find(
			(country) => country.name === countryParam
		);
		setCountryCode(phoneCode?.country_code);
		setCountryId(phoneCode?.id);
		// setCountryId(phoneCode?.id)
	};

	const randomId = `kreate-sell-${crypto.randomBytes(16).toString('hex')}`;
	const paymentStatusList = {
		success: 's',
		failed: 'f',
		// abandoned: "a"
	};
	const paymentDetails = ({reference = '', status = ''}) => {
		const statusValue = paymentStatusList[status];
		const value = {
			fullname: `${values?.firstName} ${values?.lastName}`,
			email_address: values?.email,
			mobile_number: values?.phoneNo,
			datetime: new Date().toISOString(),
			// total: getCurrency('price'),
			total: totalPrice,
			reference_id: reference,
			purchase_details: [],
			status: statusValue,
			card_type: '',
			last_four: '',
			currency: getCurrency('currency'),
			payment_type: 'purchase',
			is_affiliate: values?.is_affiliate || false,
			affiliate_product_link: '',
			user_identifier: values?.id || '',
			is_free_flow: true,
		};
		return value;
	};

	const calculatePriceWithFees = () => {
		let feePercentage;
		switch (activeCurrency?.currency) {
			case 'NGN':
				feePercentage = transactionFees[activeCurrency?.currency];
				break;
			case 'USD':
				feePercentage = transactionFees[activeCurrency?.currency];
			case 'GBP':
				feePercentage = transactionFees[activeCurrency?.currency];
			default:
				feePercentage = transactionFees['Others'];
				break;
		}
		setTotalPrice(
			(feePercentage / 100) * getCurrency('price') + getCurrency('price')
		);
		return totalPrice;
	};

	useEffect(() => {
		if (!!productId) {
			getProductDetails(productLink);
		}
	}, [productId]);

	useEffect(() => {
		if (!!storeId) {
			getStoreCheckoutCurrencies(
				storeId,
				setStorecheckoutCurrencyLoading(false)
			);
		}
	}, [storeId]);

	// set currency on mount
	// TODO: set to the base currency
	useEffect(() => {
		if (checkOutDetails.length) {
			setActiveCurrency(checkOutDetails[0]);
		}
	}, [checkOutDetails.length]);

	useEffect(() => {
		// TODO: if the active currency is equal to the base currency, no need to convert
		if (activeCurrency?.currency || activeCurrency?.currency_name) {
			setSelectedPaymentMethod(
				countryPayments[
					activeCurrency?.currency || activeCurrency.currency_name
				][0].value
			);
		}
		handleCurrencyConversion(activeCurrency.currency);
		// }
	}, [activeCurrency?.currency, activeCurrency?.currency_name]);
	const checkOutInNaira = checkOutDetails?.find(
		(item) =>
			item?.currency_name === 'NGN' && item?.price_indicator === 'Selling'
	);

	// calculate price + fees
	useEffect(() => {
		if (
			alreadyDefinedPrice?.price ||
			convertedCurrency?.buy_rate ||
			checkOutInNaira?.price
		) {
			calculatePriceWithFees();
		}
	}, [
		alreadyDefinedPrice?.price,
		convertedCurrency?.buy_rate,
		checkOutInNaira?.price,
	]);

	useEffect(() => {
		if (country) {
			handlePhoneCode(country);
		}
	}, [country]);

	// TODO: check if price in a particular currency has been specified before,
	// if it has, use that instead of converting, just use the specified value
	const handleCurrencyConversion = (toCurrency) => {
		let index = checkOutDetails.findIndex(
			(detail) =>
				detail?.currency_name === toCurrency &&
				detail?.price_indicator === 'Selling'
		);
		if (index !== -1) {
			setAlreadyDefinedPrice(checkOutDetails[index]);
		} else if (price && toCurrency) {
			setAlreadyDefinedPrice(null);
			const data = {
				amount: price,
				from_currency_name: currency_name,
				to_currency_name: toCurrency,
			};
			convertCurrency(
				data,
				() => console.log('success'),
				() => console.log('error')
			);
		}
	};

	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNo: '',
		currency: 'NGN',
		couponCode: '',
	};

	const handleSubmit = () => {
		// console.log('price with fees is', calculatePriceWithFees());
		// console.log('price without fees is', getCurrency('price'));
		// if we are using paypal
		console.log('form submitted');

		if (selectedPaymentMethod === 'flutterwave') {
			handleFlutterPayment({
				callback: async (response) => {
					await sendPaymentCheckoutDetails(
						paymentDetails({
							reference: response?.tx_ref,
							status: response?.status,
						})
					);
					closePaymentModal();
					//   openModal();
				},
				onClose: () => {},
			});
		}
		if (selectedPaymentMethod === 'paystack') {
			return initializePaystackPayment(
				onPaystackSuccess,
				onPaystackClose
			);
		}
		/** Currencies using PayStack are listed here */

		// currencies using stripe

		/** Currencies using FlutterWave are listed here. When other payment options for USD and GBP are implemented, remember to consider it here also */
		// if (
		// 	(!['NGN', 'GHS'].includes(
		// 		activeCurrency.currency || activeCurrency.currency_name
		// 	) ||
		// 		selectedPaymentMethod === 'flutterwave') &&
		// 	!['paypal', 'stripe', 'crypto'].includes(selectedPaymentMethod)
		// ) {
		// 	handleFlutterPayment({
		// 		callback: async (response) => {
		// 			// console.log('response ', response)
		// 			await sendPaymentCheckoutDetails(
		// 				paymentDetails({
		// 					reference: response?.tx_ref,
		// 					status: response?.status,
		// 				})
		// 			);
		// 			closePaymentModal();
		// 			//   openModal();
		// 		},
		// 		onClose: () => {},
		// 	});
		// }
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ConsumerSalesCheckoutSchema,
		validateOnChange: true,
	});

	const {errors, setFieldValue, values} = formik;

	// ====================================================================================
	//              PAYMENT CONFIG STARTS HERE
	// ===================================================================================
	// Flutterwave configurations
	const flutterConfig = {
		public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
		tx_ref: randomId,
		// amount: desiredAmount ? desiredAmount : getCurrency('price'),
		amount: desiredAmount ? desiredAmount : totalPrice,
		currency: getCurrency('currency'),
		payment_options: 'card, mobilemoney, ussd, mobile_money_ghana',
		customer: {
			email: values?.email,
			phonenumber: values?.phoneNo,
			name: `${values?.firstName} ${values?.lastName}`,
		},
		type: '',
		customizations: {
			title: 'Kreatesell Title',
			description: 'Kreatesell description',
			logo: 'https://res.cloudinary.com/salvoagency/image/upload/v1636216109/kreatesell/mailimages/KreateLogo_sirrou.png',
		},
	};

	const handleFlutterPayment = useFlutterwave(flutterConfig);

	// Flutterwave configurations end here

	// paystack config
	const payStackConfig = {
		reference: randomId,
		email: values?.email,
		// amount: desiredAmount
		// 	? desiredAmount
		// 	: Number(getCurrency('price')).toFixed() * 100,
		amount: desiredAmount
			? desiredAmount
			: Number(totalPrice).toFixed() * 100,
		publicKey:
			activeCurrency?.currency === 'GHS'
				? process.env.NEXT_PUBLIC_PAYSTACK_GHANA_PUBLIC_KEY
				: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
		firstName: values?.firstName,
		lastname: values?.lastName,
		phone: values?.phoneNo,
		currency: getCurrency('currency'), //`${activeCurrency?.currency}`,
		channels: [
			'card',
			'bank',
			'ussd',
			'qr',
			'mobile_money',
			'bank_transfer',
		],
	};
	const onPaystackSuccess = (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		const status = paymentStatusList[reference?.status];
		sendPaymentCheckoutDetails(
			paymentDetails({reference: reference?.reference, status})
		);
	};

	const onPaystackClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed');
	};

	const initializePaystackPayment = usePaystackPayment(payStackConfig);
	// paystack config ends here

	// ===================================================================================
	//              PAYMENT CONFIG ENDS HERE
	// ===================================================================================

	const handleSelect = (currency) => {
		setActiveCurrency(currency);
	};

	const handlePaymentMethod = (method) => {
		setSelectedPaymentMethod(method);
	};

	useFetchUtilities();

	const handleMakeItFreePayment = async () => {
		await sendPaymentCheckoutDetails(
			paymentDetails({total: null, reference: ''})
		);
	};

	// this is to trigger rerender for paypal options
	function onCurrencyChange() {
		if (['USD', 'GBP'].includes(activeCurrency?.currency)) {
			dispatch({
				type: 'resetOptions',
				value: {
					...options,
					currency: activeCurrency.currency,
				},
			});
		}
	}

	if (storecheckoutCurrencyLoading || storeCheckoutCurrenciesLoading)
		return (
			<div
				style={{
					minHeight: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Loader />
			</div>
		);

	return (
		<>
			<nav
				className={
					styles.nav +
					' white relative py-8 px-10 flex shadow items-center text-center'
				}
			>
				<Image src={LogoImg} alt="logo" width={140} height={35} />
				<h2 className=" font-bold mb-0 text-lg lg:text-2xl">
					Checkout
				</h2>
			</nav>

			<div className={`${styles.container}`}>
				<div className="flex py-6 items-center">
					<div
						className="flex cursor-pointer"
						onClick={() => router.back()}
					>
						<div>
							<Image src={ArrowLeft} alt="go back" />{' '}
						</div>
						<span className="pl-2 font-semibold text-primary-blue">
							BACK
						</span>
					</div>

					<div className="mx-auto font-medium text-lg lg:text-2xl">
						Payment Details
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-6 w-full">
					<div
						style={{height: 'fit-content'}}
						className="bg-white shadow rounded-lg w-full md:w-2/5 p-10 lg:p-5 lg:px-16"
					>
						<form>
							<div>
								<div className="text-black-100 font-bold text-lg mb-4">
									Personal Info
								</div>
								<p className="text-base-gray-200">
									Complete your purchase by filling in the
									following details
								</p>
							</div>

							<Input
								name="firstName"
								placeholder="Enter your Name"
								label="First Name"
								height="small"
								onChange={formik.handleChange}
								errorMessage={errors.firstName}
								// validateOnChange
							/>

							<Input
								name="lastName"
								placeholder="Enter your Name"
								label="Last Name"
								height="small"
								onChange={formik.handleChange}
								errorMessage={errors.lastName}
								// validateOnChange
							/>

							<Input
								name="email"
								placeholder="Enter your Email"
								label="Email Address"
								height="small"
								onChange={formik.handleChange}
								errorMessage={errors.email}
							/>

							<Row gutter={{xs: 0, sm: 0, md: 8}}>
								<Col
									xs={24}
									md={12}
									className={styles.phoneNumberLabel}
								>
									Phone Number
								</Col>

								<div className={styles.phoneCode}>
									<Col xs={24} md={12}>
										<SelectV2
											label=""
											size="large"
											setCountry={setCountry}
											list={countries}
											placeholder="Nigeria (+234)"
											// name="Country_Id"
											isCheckout={true}
											// rules={[
											//   {
											//     required: true,
											//     message: "Country is a required field",
											//   },
											// ]}
										/>
									</Col>
									<div className={styles.phoneBox}>
										<Col>
											<PhoneNumberInput
												type="tel"
												placeholder={
													'Enter your phone number'
												}
												height="small"
												name="phoneNo"
												// value={values.phoneNo}
												maxLength={11}
												inputMode="numeric"
												onChange={formik.handleChange}
												errorMessage={errors.phoneNo}
											/>
										</Col>
									</div>
								</div>
							</Row>
						</form>
					</div>

					<div
						className={`bg-white shadow rounded-lg w-full md:w-3/5 p-4 lg:p-8`}
					>
						<form
							// validateOnChange
							onSubmit={formik.handleSubmit}
							autoComplete="off"
							className="w-full"
						>
							<div className="pb-4">
								<div className="text-black-100">
									Select Currency
								</div>
								<p className="text-base-gray-200">
									Select your preferred currency and get price
									equivalent
								</p>

								<div className="grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
									{countriesCurrency?.map(
										({currency, currency_id, flag}) => (
											<CurrencyCard
												key={currency_id}
												handleSelect={() =>
													handleSelect({
														currency_id,
														currency,
													})
												}
												{...{
													currency,
													currency_id,
													flag,
													activeCurrency,
												}}
											/>
										)
									)}
								</div>
							</div>
							<div className="py-7">
								<h2>West African CFA Franc BCEAO(XOF)</h2>
								<div className="grid gap-4 grid-cols-4 ">
									{filterdWest.map(
										({id, currency, flag, name}, index) => (
											<div
												key={index}
												className={
													activeCurrency?.id === id
														? styles.activeCard
														: styles.card
												}
												onClick={() =>
													handleSelect({id, currency})
												}
											>
												<div
													className={
														styles.checFlag +
														' mr-2'
													}
													style={{
														borderRadius: '50%',
													}}
												>
													<Image
														src={flag}
														alt="flag"
														layout="fill"
													/>
												</div>
												<div className="">{name}</div>
												{activeCurrency?.id === id && (
													<div className="pl-1 pt-1">
														<Image
															src={ActiveTick}
															alt="active"
															width="16"
															height="16"
														/>
													</div>
												)}
											</div>
										)
									)}
								</div>
							</div>

							<div className="py-7">
								<h2>Central African CFA Franc BEAC(XAF)</h2>
								<div className="grid gap-4 grid-cols-4 ">
									{filteredCentral.map(
										({id, currency, name, flag}, index) => (
											<div
												key={index}
												className={
													activeCurrency?.id === id
														? styles.activeCard
														: styles.card
												}
												onClick={() =>
													handleSelect({id, currency})
												}
											>
												<div
													className={
														styles.checFlag +
														' mr-2'
													}
													style={{
														borderRadius: '50%',
													}}
												>
													<Image
														src={flag}
														alt="flag"
														layout="fill"
													/>
												</div>
												<div className="">{name}</div>
												{activeCurrency?.id === id && (
													<div className="pl-1 pt-1">
														<Image
															src={ActiveTick}
															alt="active"
															width="16"
															height="16"
														/>
													</div>
												)}
											</div>
										)
									)}
								</div>
							</div>

							{/* start the pay as you want  */}
							{isFree && (
								<div className="">
									<h2 className={styles.desiredPayTitle}>
										Pay what you want
									</h2>
									<p className={styles.desiredPayText}>
										For this product, you can pay any price
										above the minimum amount.
									</p>
									<div
										className={styles.minimumPriceContainer}
									>
										<div
											className={styles.minimumPriceText}
										>
											Minimum price:{' '}
											{convertedCurrency.to_currency_name}{' '}
											{Number(
												convertedCurrency.total_amount
											).toFixed(2)}
										</div>
									</div>
									{desiredAmount &&
										desiredAmount <
											convertedCurrency.total_amount && (
											<div
												className={
													styles.desiredAmountError
												}
											>
												<Image
													src={ErrorIcon}
													alt="error_icon"
												/>
												<p className={styles.errorText}>
													Please read carefully <br />
													Your desired amount is too
													low. The minimum amount for
													this product is GBP 1000.
												</p>
											</div>
										)}
									<div className={styles.desiredPayContainer}>
										<p className={styles.desiredPayText}>
											Desired Amount
										</p>
										<div className="w-4/5 border rounded-md border-gray-200 p-2 mt-0 mb-2">
											<Input
												placeholder={`Suggested Amount: ${
													convertedCurrency.to_currency_name
												} ${Number(
													convertedCurrency.total_amount
												).toFixed(2)}`}
												onChange={(e) =>
													setDesiredAmount(
														e.target.value
													)
												}
											/>
										</div>
									</div>
								</div>
							)}
							<div className="divider"></div>
							<div className="pb-6">
								<div className="text-black-100">
									Payment Method
								</div>
								<p className="text-base-gray-200">
									Select your preferred payment method
								</p>

								<div className="grid gap-4 grid-cols-3">
									{countryPayments[
										activeCurrency?.currency ||
											activeCurrency.currency_name
									]
										?.filter(({value}) => {
											{
												/* if (value !== 'paypal') {
												return true;
											} */
											}
											{
												/* check that the user has upgraded and has done KYC */
											}
											if (
												storeDetails?.kyc_status?.kyc_status?.toLowerCase() ===
													'approved' &&
												storeDetails?.user_plan?.toLowerCase() ===
													'business' &&
												value !== 'paypal'
											) {
												return true;
											} else if (
												storeDetails?.kyc_status?.kyc_status?.toLowerCase() !==
													'approved' &&
												storeDetails?.user_plan?.toLowerCase() !==
													'business'
											) {
												{
													/* return false if currency is cad, usd or gbp */
												}
												if (
													[
														activeCurrency?.currency,
														activeCurrency.currency_name,
													].includes('USD') ||
													[
														activeCurrency?.currency,
														activeCurrency.currency_name,
													].includes('GBP') ||
													[
														activeCurrency?.currency,
														activeCurrency.currency_name,
													].includes('CAD')
												) {
													return false;
												}
											}
										})
										.map(({type, icon, value}) => (
											<div
												key={value}
												onClick={() =>
													handlePaymentMethod(value)
												}
												className={`${
													selectedPaymentMethod ===
													value
														? 'activeCard'
														: 'card'
												} p-2 flex justify-around items-center`}
											>
												<Image
													src={icon}
													alt={type}
													height="26"
												/>
												{selectedPaymentMethod ===
													value && (
													<Image
														src={ActiveTick}
														alt="active"
														width="16"
														height="16"
													/>
												)}
											</div>
										))}
									{/* active currency */}
									{/* */}
									<RenderIf
										condition={
											[
												activeCurrency?.currency,
												activeCurrency.currency_name,
											].includes('USD') ||
											[
												activeCurrency?.currency,
												activeCurrency.currency_name,
											].includes('GBP') ||
											[
												activeCurrency?.currency,
												activeCurrency.currency_name,
											].includes('CAD')
										}
									>
										<Tooltip
											title={
												(!formik.values.firstName ||
													!formik.values.lastName ||
													!formik.values.email ||
													!formik.values.phoneNo) &&
												'Fill in all Customer Details to be able to select paypal'
											}
										>
											<div>
												<PayPalButtons
													style={{
														layout: 'horizontal',
														label: 'pay',
													}}
													disabled={
														!formik.values
															.firstName ||
														!formik.values
															.lastName ||
														!formik.values.email ||
														!formik.values.phoneNo
													}
													className={`flex justify-around items-center`}
													createOrder={(
														data,
														actions
													) => {
														return actions.order.create(
															{
																purchase_units:
																	[
																		{
																			description:
																				'customDescription',
																			amount: {
																				// value: Number(
																				// 	convertedPrice
																				// ).toFixed(2),
																				value: Number(
																					getCurrency(
																						'price'
																					)
																				).toFixed(
																					2
																				),
																				currency:
																					getCurrency(
																						'currency'
																					),
																			},
																		},
																	],
															}
														);
													}}
													onApprove={(
														data,
														actions
													) => {
														console.log(
															'data is',
															data
														);
														console.log(
															'actions is',
															actions
														);
														alert(
															'You have successfully completed the transaction'
														);
													}}
												/>
											</div>
										</Tooltip>
									</RenderIf>
								</div>
							</div>
							{/**This is reserved for Premium users who have activated tier 2 payment options. Uncomment the code block below to and implement the functionality */}

							{/**Apply coupon feature is yet to be implemented */}
							{isFree && (
								<div className="w-full flex gap-2 items-center pr-4 lg:hidden">
									<div className="w-3/5 xs:w-3/4 md:w-4/5">
										<Input
											placeholder="Coupon Code"
											name="couponCode"
											onChange={formik.handleChange}
										/>
									</div>
									<div className="w-30 xs:w-1/4 md:w-1/5 pb-2">
										<Button
											text="Apply Coupon"
											className={styles.couponBtn}
										/>
									</div>
								</div>
							)}

							{isFree && (
								<div className="w-full lg:w-5/6 mx-auto hidden lg:flex gap-4 items-center">
									<div className="w-4/5">
										<Input
											placeholder=" Enter Coupon Code"
											name="couponCode"
											onChange={formik.handleChange}
										/>
									</div>
									<div className="w-1/5 pb-2">
										<Button
											text="Apply Coupon"
											className={styles.couponBtn}
										/>
									</div>
								</div>
							)}

							{isFree && (
								<div
									className={`p-6 w-full lg:w-5/6 mx-auto shadow rounded-md bg-white flex flex-col ${styles.boxShadow}`}
								>
									<div className="flex justify-between">
										<p>SubTotal</p>
										<div className="flex gap-4">
											{/* {checkoutDetails?.product_details
                      ?.is_strike_original_price && (
                      <s className="text-base-gray-200">
                        {currency_name} 10000
                      </s>
                    )} */}
											<p>
												{/* {currency_name} {price ?? checkoutDetails?.default_price} */}
												{/* {checkOutInNaira?.currency_name} {checkOutInNaira?.price} */}
												{getCurrency('currency')}{' '}
												{desiredAmount
													? desiredAmount
													: Number(
															getCurrency('price')
													  ).toFixed(2)}
											</p>
										</div>
									</div>

									<div className="flex justify-between">
										<p>Transaction Fee</p>
										<p>0</p>
									</div>

									<div className="flex justify-between">
										<p>Tax</p>
										<p>0</p>
									</div>

									<div className="divider"></div>

									<div className="flex justify-between">
										<p>Total</p>
										<p className="text-primary-blue font-medium">
											{/* {currency_name}{' '} */}
											{getCurrency('currency')}{' '}
											{/* {new Intl.NumberFormat().format(
                      price ?? checkoutDetails?.default_price
                    )} */}
											{desiredAmount
												? desiredAmount
												: Number(
														getCurrency('price')
												  ).toFixed(2)}
										</p>
									</div>
								</div>
							)}

							{isFree ? (
								<p className="text-base-gray text-center py-6 text-xs md:text-sm">
									Get instant access to this product once your
									payment is successful!
								</p>
							) : (
								<>
									<p className="text-base-gray text-center py-6 text-xs md:text-sm">
										<span className="text-base text-gray-700">
											You are getting this product for
											free!
										</span>
										<br /> Get instantly access this product
										once your click the button
									</p>
								</>
							)}

							{isFree && (
								<div className=" w-full lg:w-5/6 mx-auto">
									<Button
										text={`Pay Now`}
										bgColor="blue"
										className={styles.btnCont}
										icon={<RightArrow />}
										disabled={currencyConverterLoading}
									/>
								</div>
							)}

							{/* {isFree ? (
                <div className=" w-full lg:w-5/6 mx-auto">
                  <Button
                    text={`Pay Now`}
                    bgColor="blue"
                    className={styles.btnCont}
                    icon={<RightArrow />}
                    disabled={currencyConverterLoading}
                  />
                </div>
              ) : (
                <div className=" w-full lg:w-5/6 mx-auto">
                  <Button
                    text={`Get Now`}
                    bgColor="blue" 
                    className={styles.btnCont}
                  />
                </div>
              )} */}
						</form>
						{!isFree && (
							<div className=" w-full lg:w-5/6 mx-auto">
								<Button
									text={`Get Now`}
									bgColor="blue"
									className={styles.btnCont}
									onClick={handleMakeItFreePayment}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			<DialogOverlay
				isOpen={modal}
				onDismiss={closeModal}
				className="pt-12 "
			>
				<DialogContent className={styles.modal} aria-label="modal">
					<SuccessfulCheckoutModal
						productDetails={checkoutDetails}
						price={price ?? checkoutDetails?.default_price}
						currency={currency_name}
					/>
				</DialogContent>
			</DialogOverlay>
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

const SuccessfulCheckoutModal = ({productDetails, price, currency}) => {
	return (
		<div className="p-0 md:p-6 lg:p-12 text-center">
			<Image src={ActiveTick} width="45" height="45" />
			<h3 className="text-black-100 font-bold text-lg">
				Thank you for your purchase!
			</h3>
			<p className="text-base-gray-200 text-xs">
				Your purchase was successful and a receipt will be sent to your
				mail.
			</p>

			<div className="text-left py-4">
				<p className="text-base-gray">Purchase Summary</p>
				<div className="flex justify-between">
					<div className="text-primary-blue font-medium text-base">
						{productDetails?.product_details?.product_name}
					</div>
					<div className="text-base-green-100 font-medium text-base">
						{currency} {new Intl.NumberFormat().format(price)}
					</div>
				</div>
				{/* <p className="text-xs text-base-gray">by Viktor Franklyn</p> */}
			</div>

			<div className="w-full">
				<Button
					text="Download File"
					className={styles.btnCont}
					bgColor="blue"
					icon={<CloudDownload />}
				/>
			</div>
		</div>
	);
};

export default Checkout;
