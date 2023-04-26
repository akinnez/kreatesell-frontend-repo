import {useState, useEffect} from 'react';
import Image from 'next/image';
import {DialogOverlay, DialogContent} from '@reach/dialog';
import {
	Row,
	Col,
	// Card, Form, Input as AntInput
} from 'antd';
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js';

import {
	ActiveTick,
	ArrowLeft,
	MobileBackArrow,
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
	MakeItFreeIcon,
	QuestionIcon,
} from 'utils';
import {Tooltip} from 'antd';
import {SelectV2} from 'components/form-input';
import {PhoneNumberInput} from 'components';
import styles from '../../../public/css/checkout.module.scss';
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
	ApplyCoupon,
} from 'redux/actions';
import crypto from 'crypto';
import LogoImg from '../../../public/images/logo.svg';
import useFetchUtilities from 'hooks/useFetchUtilities';
import Loader from 'components/loader';
import axios from 'axios';
import useCheckoutCurrency from 'hooks/useCheckoutCurrencies';
import {countryPayments} from '../../../utils/paymentOptions';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundaryComponent';

export const pathName = typeof window !== 'undefined' && window;
/**
 *
 * @param {*} host - can either be 'localhost' or the hosted site's url
 * @returns http or https
 */
const resolveProtocol = (host) => {
	if (!host || typeof host !== 'string') return;
	return host.includes('localhost') ? 'http' : 'https';
};
const Checkout = () => {
	const router = useRouter();
	const productId = router.query.id;
	const productLink = `${process.env.BASE_URL}v1/kreatesell/product/get/${productId}`;

	const [modal, setModal] = useState(false);
	const [hostState, setHostState] = useState('');

	const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies();
	const checkoutDetails = useSelector((state) => state.checkout);

	const {convertedCurrency, loading: currencyConverterLoading} = useSelector(
		(state) => state.currencyConverter
	);
	const {loading: storeCheckoutCurrenciesLoading} = useSelector(
		(state) => state.store
	);

	const {loading, applyCouponResponse} = useSelector((state) => state.coupon);

	const [country, setCountry] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [countryId, setCountryId] = useState(null);
	const {countries} = useSelector((state) => state.utils);
	const [defaultCurrency, setDefaultCurrency] = useState('');

	const {countriesCurrency, filterdWest, filteredCentral} =
		useCheckoutCurrency();

	const [storecheckoutCurrencyLoading, setStorecheckoutCurrencyLoading] =
		useState(true);
	const [activeCurrency, setActiveCurrency] = useState({});
	const [desiredAmount, setDesiredAmount] = useState('');

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

	const [disableBtn, setDisableBtn] = useState(false);

	// converted price + transaction fees
	const [totalPrice, setTotalPrice] = useState();

	// this is the product details for a product whose price has been defined by
	// kreator and is also the active currency selected
	const [alreadyDefinedPrice, setAlreadyDefinedPrice] = useState(null);
	const sendPaymentCheckoutDetails = SendPaymentCheckoutDetails();
	const convertCurrency = ConvertCurrency();
	const applyCoupon = ApplyCoupon();

	const closeModal = () => setModal(false);

	const [storeDetails, setStoreDetails] = useState(null);
	const [checkOutDetails, setCheckOutDetails] = useState([]);

	const [pricingTypeDetails, setPricingTypeDetails] = useState('');
	const [couponCode, setCouponCode] = useState('');
	const [couponDetails, setCouponDetails] = useState({});
	const [taxValue, setTaxValue] = useState(0);
	const [isChargable, setIsChargable] = useState(null);

	const [transactionFee, setTransactionFee] = useState(0);

	const testCurrency = activeCurrency?.currency
		? activeCurrency?.currency
		: activeCurrency?.currency_name;

	const MinimumPrices = checkOutDetails.find(
		(item) =>
			item.price_indicator === 'Minimum' &&
			item.currency_name === testCurrency
	);
	const SuggestedPrices = checkOutDetails.find(
		(item) =>
			item.price_indicator === 'Suggested' &&
			item.currency_name === testCurrency
	);

	const OriginalPrices = checkOutDetails.find(
		(item) =>
			item.price_indicator === 'Original' &&
			item.currency_name === testCurrency
	);

	const [storeId, setStoreId] = useState();

	// TODO: set to the base currency

	const baseCurrencyObbject = checkOutDetails?.find(
		(item) => item?.currency_name === defaultCurrency?.currency
	);

	const checkout = checkOutDetails?.filter(
		// (item) => item?.currency_name === activeCurrency?.currency.
		(item) =>
			(item?.price_indicator === pricingTypeDetails) ===
			'Pay What You Want'
				? 'Minimum'
				: 'Selling' &&
				  item?.currency_name === baseCurrencyObbject?.currency_name
	);

	const currency_name = checkout?.[0]?.currency_name;
	const price = checkout?.[0]?.price || 0;

	const getProductDetails = async (productLink) => {
		try {
			const response = await axios.get(productLink, {
				headers: {
					Authorization: 'none',
				},
			});
			// console.log('response.data?.data', response.data?.data);
			setStoreDetails(response.data.data);
			setDefaultCurrency(response.data?.data?.default_currency);
			setPricingTypeDetails(response.data?.data?.product_price_type);
			setCheckOutDetails(response?.data?.data?.check_out_details);
			setStoreId(response?.data?.data?.store_dto?.store_id);
			setTaxValue(response?.data?.data?.store_dto?.custom_tax_amount);
			setIsChargable(response.data?.data?.is_buyer_pays_for_fee);
		} catch (error) {
			console.log(error);
		}
	};

	const getCheckoutPriceInNaira = (indicator) => {
		let priceInNiara = checkOutDetails?.find(
			(item) =>
				item?.currency_name === defaultCurrency?.currency &&
				item?.price_indicator === indicator
		);
		return priceInNiara?.price * convertedCurrency?.buy_rate;
	};

	const getCurrency = (priceOrName) => {
		if (priceOrName === 'currency') {
			return selectedPaymentMethod === 'crypto'
				? 'USDT'
				: activeCurrency?.currency || activeCurrency?.currency_name;
		} else if (priceOrName === 'price') {
			return (
				alreadyDefinedPrice?.price ||
				convertedCurrency?.buy_rate * checkOutInNaira?.price ||
				checkOutInNaira?.price
			);
		} else if (priceOrName === 'total') {
			return taxValue
				? getTaxDeduction('getCal')
				: totalFee + transactionFee;
		} else if (priceOrName === 'minimum') {
			return (
				MinimumPrices?.price ||
				Number(getCheckoutPriceInNaira('Minimum')).toFixed(2)
			);
		} else if (priceOrName === 'suggested') {
			return (
				SuggestedPrices?.price ||
				Number(getCheckoutPriceInNaira('Suggested')).toFixed(2)
			);
		} else if (priceOrName === 'original') {
			return (
				OriginalPrices?.price || null
				// Number(getCurrency('price')).toFixed(2)
			);
		} else if (priceOrName === 'free') {
			return 'NGN';
		}
	};

	const affliateRef = router.query.affiliateRef;
	const getAffiliateRef = () => {
		return affliateRef;
	};

	const affiliateUniqueKey = router.query.affiliateUniqueKey;
	const getAffiliateUniqueKey = () => {
		return affiliateUniqueKey;
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
		abandoned: 'a',
	};

	const getPurchaseDetails = () => {
		return [
			{
				product_id: productId,
				quantity: 1,
				amount: pricingTypeDetails === 'Make it Free' ? 0 : totalFee,
			},
		];
	};

	const paymentDetails = ({reference = '', status = ''}) => {
		const statusValue = paymentStatusList[status];
		const countryCode = countries.find(
			(country) => country?.name === values.Country_code
		);
		const value = {
			fullname: `${values?.firstName} ${values?.lastName}`,
			email_address: values?.email,
			mobile_number: `${values?.phoneNo}`,
			country_code: `${countryCode?.country_code}`,
			datetime: new Date().toISOString(),
			total:
				pricingTypeDetails === 'Make it Free'
					? 0
					: getCurrency('total'),
			reference_id: reference,
			purchase_details: getPurchaseDetails(),
			status: statusValue,
			card_type: selectedPaymentMethod,
			last_four: '',
			currency:
				pricingTypeDetails === 'Make it Free'
					? getCurrency('free')
					: getCurrency('currency'),
			payment_type: 'purchase',
			is_affiliate: affliateRef ? true : false,
			affiliate_product_link: getAffiliateUniqueKey(),
			affiliate_id: getAffiliateRef(),
			user_identifier: 'user-' + randomId,
			is_free_flow: pricingTypeDetails === 'Make it Free' ? true : false,
			coupon_code: couponCode || '',
			TransactionFee: transactionFee,
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

	useEffect(() => {
		if (checkOutDetails.length) {
			// we need to check for the default currency here
			setActiveCurrency(baseCurrencyObbject);
		}
	}, [checkOutDetails.length]);

	useEffect(() => {
		// TODO: if the active currency is equal to the base currency, no need to convert

		if (activeCurrency?.currency || activeCurrency?.currency_name) {
			setSelectedPaymentMethod(
				countryPayments[
					activeCurrency?.currency || activeCurrency.currency_name
				]?.[0].value
			);
		}
		handleCurrencyConversion(activeCurrency.currency);
		// }
	}, [activeCurrency?.currency, activeCurrency?.currency_name]);

	useEffect(() => {
		// TODO: we dont want to convert everytime selected payment method is not crypto but it changes
		if (selectedPaymentMethod && selectedPaymentMethod === 'crypto') {
			handleCurrencyConversion('USD');
		} else if (selectedPaymentMethod !== 'crypto') {
			handleCurrencyConversion(
				activeCurrency?.currency_name || activeCurrency.currency
			);
		}
		// else if its not crypto,
	}, [selectedPaymentMethod]);

	const checkOutInNaira = checkOutDetails?.find(
		(item) =>
			item?.currency_name === defaultCurrency?.currency &&
			item?.price_indicator === 'Selling'
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

	useEffect(() => {
		Number(desiredAmount) < Number(getCurrency('minimum')) &&
		pricingTypeDetails === 'Pay What You Want'
			? setDisableBtn(true)
			: setDisableBtn(false);
	}, [desiredAmount]);

	// FIXME: check if price in a particular currency has been specified before,
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

	const standardPrice =
		pricingTypeDetails === 'Pay What You Want'
			? desiredAmount
				? desiredAmount
				: getCurrency('minimum')
			: Number(getCurrency('price')).toFixed(2);
	const percentagePrice =
		standardPrice - (Number(couponDetails?.value) / 100) * standardPrice;
	const actualPrice = standardPrice - Number(couponDetails?.value);
	const basicSubtotal =
		couponDetails.indicator === 'IsPercentage'
			? percentagePrice
			: actualPrice;
	const subTotal =
		couponDetails.indicator === 'IsPercentage' ||
		couponDetails.indicator === 'IsFixedAmount'
			? basicSubtotal
			: standardPrice;

	const getTaxDeduction = (val) => {
		const calTax = Number(((taxValue / 100) * subTotal).toFixed(2));
		return val === 'getVal'
			? calTax
			: Number(calTax) + Number(subTotal) + Number(transactionFee);
	};

	// calculate bearable fee from customer's indication
	useEffect(() => {
		const getTransactionFees = async () => {
			// if (isChargable === "customer") {
			if (!isChargable) return;
			try {
				await axios
					.get(
						`https://kreatesell.io/api/v1/kreatesell/product/get-bearable-fee/${
							activeCurrency?.currency_name ||
							activeCurrency?.currency
						}`
					)
					//get actual fees and percentage indications
					.then((res) => {
						const value = res?.data?.data?.fee_amount;
						const percentageValue = Number(
							((value / 100) * subTotal).toFixed(2)
						);
						setTransactionFee(percentageValue);
					});
			} catch (err) {
				console.log(err);
				// }
			}
		};
		getTransactionFees();
	}, [
		activeCurrency?.currency,
		activeCurrency?.currency_name,
		subTotal,
		isChargable,
	]);

	// const calcNgN = 5 / 100 * subTotal

	// let transactionFee = Number(((5 / 100) * subTotal).toFixed(2));

	// if (
	// 	[
	// 		'KES',
	// 		'GHS',
	// 		'MWK',
	// 		'SLL',
	// 		'ZAR',
	// 		'TZS',
	// 		'UGX',
	// 		'XOF',
	// 		'XAF',
	// 	].includes(activeCurrency?.currency || activeCurrency?.currency_name)
	// ) {
	// 	transactionFee = Number(((6 / 100) * subTotal).toFixed(2));
	// } else if (
	// 	['USD', 'GBP'].includes(
	// 		activeCurrency?.currency || activeCurrency?.currency_name
	// 	)
	// ) {
	// 	transactionFee = Number(((10 / 100) * subTotal).toFixed(2));
	// } else {
	// 	transactionFee = Number(((5 / 100) * subTotal).toFixed(2));
	// }

	const totalFee = Number(subTotal);

	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNo: '',
		currency: 'NGN',
		couponCode: '',
		Country_code: '',
	};
	const currencyPaidIn = activeCurrency?.currency
		? activeCurrency?.currency
		: activeCurrency?.currency_name;

	const handleSubmit = async () => {
		// if selected is crypto
		if (selectedPaymentMethod === 'crypto') {
			try {
				const data = await axios.post(
					'https://kreatesell.io/api/v1/kreatesell/payment/coinbase-charge',
					{
						name: storeDetails?.product_details?.product_name,
						description:
							storeDetails?.product_details?.product_description.substring(
								0,
								199
							),
						pricing_type: 'fixed_price',
						local_price: {
							amount: Number(getCurrency('price')) / 100,
							currency: 'USDT',
						},
						// TODO: change this to actual customer ID and name
						metadata: {
							customer_id: '342',
							customer_name: 1,
						},
					}
				);
				// console.log('data is', data);
				window.open(data.data.data.hosted_url, '_blank');
			} catch (e) {
				console.error(e);
			} finally {
				return;
			}
		}

		if (selectedPaymentMethod === 'stripe') {
			try {
				const data = await axios.post(
					'https://kreatesell.io/api/v1/kreatesell/payment/stripe/create-checkout-session',
					{
						unit_amount: totalFee
							? Number(getCurrency('total')).toFixed() * 100
							: Number(getCurrency('price')).toFixed() * 100,
						currency: getCurrency('currency').toLowerCase(),
						quantity: 1,
						success_url: storeDetails?.product_details
							?.is_redirect_buyer
							? storeDetails?.product_details?.redirect_url
							: `${resolveProtocol(hostState)}://${
									hostState || 'kreatesell.com'
							  }/checkout/success/${
									storeDetails?.store_dto?.store_name
							  }_${
									router?.query?.id
							  }/?currency=${currencyPaidIn}`,
						cancel_url: `${resolveProtocol(hostState)}://${
							hostState || 'dev.kreatesell.com'
						}/payment/checkout/${productId}?status=fail`,
					}
				);
				window.open(data.data.url, '_blank');
			} catch (e) {
				console.error(e);
			} finally {
				return;
			}
		}

		if (selectedPaymentMethod === 'flutterwave') {
			handleFlutterPayment({
				callback: async (response) => {
					await sendPaymentCheckoutDetails(
						paymentDetails({
							reference: response?.tx_ref,
							status: 'success',
						}),
						() => {
							storeDetails?.product_details?.is_redirect_buyer
								? storeDetails?.product_details?.redirect_url
								: router.push(
										`/checkout/success/${storeDetails?.store_dto?.store_name}_${router?.query?.id}/?currency=${currencyPaidIn}`
								  );
						}
					);
					closePaymentModal();
					//   openModal();
				},
				onClose: async () => {
					// TODO: on abandon flow
				},
			});
		}
		if (selectedPaymentMethod === 'paystack') {
			return initializePaystackPayment(
				onPaystackSuccess,
				onPaystackClose
			);
		}
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
		amount: totalFee ? getCurrency('total') : getCurrency('price'),
		currency: getCurrency('currency'),
		payment_options: 'card, mobilemoney, ussd, mobile_money_ghana',
		customer: {
			email: values?.email,
			phonenumber: values?.phoneNo,
			name: `${values?.firstName} ${values?.lastName}`,
		},
		type: '',
		customizations: {
			title: storeDetails?.product_details?.product_name || '',
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
		amount: totalFee
			? Number(getCurrency('total')).toFixed() * 100
			: Number(getCurrency('price')).toFixed() * 100,
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
		// const status = paymentStatusList[reference?.status];
		const status = 'success';
		sendPaymentCheckoutDetails(
			paymentDetails({reference: reference?.reference, status: status}),
			() => {
				storeDetails?.product_details?.is_redirect_buyer
					? storeDetails?.product_details?.redirect_url
					: router.push(
							`/checkout/success/${storeDetails?.store_dto?.store_name}_${router?.query?.id}/?currency=${currencyPaidIn}`
					  );
			}
		);
	};

	const onPaystackClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed');
		// TODO: on abandon flow
	};

	const initializePaystackPayment = usePaystackPayment(payStackConfig);
	// paystack config ends here

	// paypal success
	const paypalSuccess = (data, actions) => {
		console.log('data', data);
		console.log('actions', actions);
		// sendPaymentCheckoutDetails(
		// 	paymentDetails({reference: reference?.reference, status: status}),
		// 	() =>
		// 		router.push(
		// 			`/checkout/success/${storeDetails?.store_dto?.store_name}/${router?.query?.id}`
		// 		)
		// );
	};

	// stripe logic is being handled on the backend
	const stripeSuccess = () => {};

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
		const status = 'success';
		await sendPaymentCheckoutDetails(
			paymentDetails({total: 0, reference: '', status: status}),
			() =>
				router.push(
					`/checkout/success/${storeDetails?.store_dto?.store_name}/${router?.query?.id}`
				)
		);
	};

	const couponData = {
		coupon_code: couponCode,
		product_kreator_id: productId,
		customer_email: values.email,
	};

	const handleApplyCoupon = async (e) => {
		e.preventDefault();
		await applyCoupon(couponData, (res) => {
			setCouponDetails(res);
		});
	};

	useEffect(() => {
		// console.log('window.location', window.location);
		setHostState(window.location.host);
	}, []);

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

	// TODO: Show screen for if product is not available/deactivated for preview

	return (
		<>
			<nav
				className={
					styles.nav +
					' white relative py-8 px-10 flex shadow items-center text-center'
				}
			>
				<div className={styles.smContent}>
					<div onClick={() => router.back()}>
						<Image
							src={MobileBackArrow}
							alt="backArrow"
							width={20}
							height={20}
						/>
					</div>

					<h2 className="ont-bold mb-0 text-lg lg:text-2xl">
						Checkout
					</h2>
					<Image src={LogoImg} alt="logo" width={140} height={35} />
				</div>
				<div className={styles.lgContent}>
					<Image src={LogoImg} alt="logo" width={140} height={35} />
					<h2 className=" font-bold mb-0 text-lg lg:text-2xl">
						Checkout
					</h2>
				</div>
			</nav>
			<ErrorBoundary resetErrorBoundary={() => router.back()}>
				<div className={`${styles.container}`}>
					<div className="flex py-6 items-center">
						<div
							className={`flex cursor-pointer ${styles.backArrow}`}
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
										xs={12}
										md={12}
										className={styles.phoneNumberLabel}
									>
										Phone Number
									</Col>

									<div className={styles.phoneCode}>
										<Col xs={12} md={12}>
											<SelectV2
												label=""
												size="large"
												setCountry={setCountry}
												list={countries}
												placeholder="Nigeria (+234)"
												name="Country_code"
												isCheckout={true}
												onChange={(country) => {
													formik.setFieldValue(
														'Country_code',
														country
													);
												}}
												errorMessage={
													errors.Country_code
												}
												// rules={[
												// 	{
												// 		required: true,
												// 		message:
												// 			'Country Code is a required field',
												// 	},
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
													onChange={
														formik.handleChange
													}
													errorMessage={
														errors.phoneNo
													}
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
								{pricingTypeDetails !== 'Make it Free' && (
									<div className="pb-4">
										<div className="text-black-100">
											Select Currency
										</div>
										<p className="text-base-gray-200">
											Select your preferred currency and
											get price equivalent
										</p>

										<div
											className={`grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 ${styles.currencyCardCont}`}
										>
											{countriesCurrency?.map(
												({
													currency,
													currency_id,
													flag,
												}) => (
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
								)}
								{pricingTypeDetails !== 'Make it Free' && (
									<div className="py-7">
										<h2>
											West African CFA Franc BCEAO(XOF)
										</h2>
										<div
											className={`grid gap-4 grid-cols-4 ${styles.currencyWestAfCardCont}`}
										>
											{filterdWest.map(
												(
													{id, currency, flag, name},
													index
												) => (
													<div
														key={index}
														className={
															activeCurrency?.id ===
															id
																? styles.activeCard
																: styles.card
														}
														onClick={() =>
															handleSelect({
																id,
																currency,
															})
														}
													>
														<div
															className={
																styles.checFlag +
																' mr-2'
															}
															style={{
																borderRadius:
																	'50%',
															}}
														>
															<Image
																src={flag}
																alt="flag"
																layout="fill"
															/>
														</div>
														<div className="">
															{name}
														</div>
														{activeCurrency?.id ===
															id && (
															<div className="pl-1 pt-1">
																<Image
																	src={
																		ActiveTick
																	}
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
								)}
								{pricingTypeDetails !== 'Make it Free' && (
									<div className="py-7">
										<h2>
											Central African CFA Franc BEAC(XAF)
										</h2>
										<div className="grid gap-4 grid-cols-3 md:grid-cols-4 w-full">
											{filteredCentral.map(
												(
													{id, currency, name, flag},
													index
												) => (
													<div
														key={index}
														className={
															activeCurrency?.id ===
															id
																? styles.activeCard
																: styles.card
														}
														onClick={() =>
															handleSelect({
																id,
																currency,
															})
														}
													>
														<div
															className={
																styles.checFlag +
																' mr-2'
															}
															style={{
																borderRadius:
																	'50%',
															}}
														>
															<Image
																src={flag}
																alt="flag"
																layout="fill"
															/>
														</div>
														<div className="">
															{name}
														</div>
														{activeCurrency?.id ===
															id && (
															<div className="pl-1 pt-1">
																<Image
																	src={
																		ActiveTick
																	}
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
								)}

								{/* start the pay as you want  */}
								{pricingTypeDetails === 'Pay What You Want' && (
									<div className="">
										<h2 className={styles.desiredPayTitle}>
											Pay what you want
										</h2>
										<p className={styles.desiredPayText}>
											For this product, you can pay any
											price above the minimum amount.
										</p>
										<div
											className={
												styles.minimumPriceContainer
											}
										>
											<div
												className={
													styles.minimumPriceText
												}
											>
												Minimum price:{' '}
												{getCurrency('currency')}{' '}
												{getCurrency('minimum')}
												{/* {MinimumPrices ? getCurrency('minimum'): getCurrency('price').toFixed(2)} */}
												{/* {Number( 
													
												).toFixed(2)} */}
											</div>
										</div>
										{desiredAmount &&
											Number(desiredAmount) <
												Number(
													getCurrency('minimum')
												).toFixed(2) && (
												<div
													className={
														styles.desiredAmountError
													}
												>
													<Image
														src={ErrorIcon}
														alt="error_icon"
													/>
													<p
														className={
															styles.errorText
														}
													>
														Please read carefully{' '}
														<br />
														Your desired amount is
														too low. The minimum
														amount for this product
														is{' '}
														{getCurrency(
															'currency'
														)}{' '}
														{Number(
															getCurrency(
																'minimum'
															)
														).toFixed(2)}
														.
													</p>
												</div>
											)}
										<div
											className={
												styles.desiredPayContainer
											}
										>
											<p
												className={
													styles.desiredPayText
												}
											>
												Desired Amount
											</p>
											<div className="w-full md:w-4/5 border rounded-md border-gray-200 p-2 mt-0 mb-2">
												<Input
													placeholder={`Suggested Amount: ${getCurrency(
														'currency'
													)} ${getCurrency(
														'suggested'
													)}.00 `}
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
									<div className="grid gap-4 grid-cols-3 w-full">
										{countryPayments[
											activeCurrency?.currency ||
												activeCurrency?.currency_name
										]
											?.filter(({value}) => {
												if (
													![
														'crypto',
														'stripe',
														'paypal',
													].includes(value)
												) {
													return true;
												} else if (
													(storeDetails?.kyc_status?.kyc_status?.toLowerCase() !==
														'approved' ||
														storeDetails?.user_plan?.toLowerCase() !==
															'business') &&
													[
														'paypal',
														'stripe',
														'crypto',
													].includes(value)
												) {
													return false;
												} else if (
													storeDetails?.kyc_status?.kyc_status?.toLowerCase() ===
														'approved' &&
													storeDetails?.user_plan?.toLowerCase() ===
														'business' &&
													[
														'stripe',
														'crypto',
													].includes(value)
												) {
													return true;
												}
											})
											.map(({type, icon, value}) => (
												<div
													key={value}
													onClick={() =>
														handlePaymentMethod(
															value
														)
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
												([
													activeCurrency?.currency,
													activeCurrency?.currency_name,
												].includes('USD') ||
													[
														activeCurrency?.currency,
														activeCurrency?.currency_name,
													].includes('GBP') ||
													[
														activeCurrency?.currency,
														activeCurrency?.currency_name,
													].includes('CAD')) &&
												storeDetails?.kyc_status?.kyc_status?.toLowerCase() ===
													'approved' &&
												storeDetails?.user_plan?.toLowerCase() ===
													'business'
											}
										>
											<Tooltip
												title={
													(!formik.values.firstName ||
														!formik.values
															.lastName ||
														!formik.values.email ||
														!formik.values
															.phoneNo) &&
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
															!formik.values
																.email ||
															!formik.values
																.phoneNo
														}
														className={`flex justify-around items-center ml-14 md:ml-1`}
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
															paypalSuccess(
																data,
																actions
															);
															// TODO: handle payment success for paypal
															alert(
																'You have successfully completed the transaction'
															);
														}}
														onCancel={(
															data,
															actions
														) => {}}
														onError={(err) => {}}
													/>
												</div>
											</Tooltip>
										</RenderIf>
									</div>
								</div>
								{/**This is reserved for Premium users who have activated tier 2 payment options. Uncomment the code block below to and implement the functionality */}

								{/**Apply coupon feature is yet to be implemented */}
								{pricingTypeDetails !== 'Make it Free' && (
									<div className="w-full flex gap-2 items-center pr-4 lg:hidden">
										<div className="w-3/5 xs:w-3/4 md:w-4/5">
											<Input
												placeholder="Coupon Code"
												name="couponCode"
												onChange={(e) =>
													setCouponCode(
														e.target.value
													)
												}
											/>
										</div>
										<div className="w-30 xs:w-1/4 md:w-1/5 pb-2">
											<Button
												text={
													loading
														? 'wait'
														: 'Apply Coupon'
												}
												className={styles.couponBtn}
												onClick={handleApplyCoupon}
											/>
										</div>
									</div>
								)}

								{pricingTypeDetails !== 'Make it Free' && (
									<div className="w-full lg:w-5/6 mx-auto hidden lg:flex gap-4 items-center">
										<div className="w-4/5">
											<Input
												placeholder=" Enter Coupon Code"
												name="couponCode"
												onChange={(e) =>
													setCouponCode(
														e.target.value
													)
												}
											/>
										</div>
										<div className="w-1/5 pb-2">
											<Button
												text={
													loading
														? 'please wait..'
														: 'Apply Coupon'
												}
												className={styles.couponBtn}
												onClick={handleApplyCoupon}
											/>
										</div>
									</div>
								)}

								{pricingTypeDetails !== 'Make it Free' && (
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
													{OriginalPrices && (
														<span
															style={{
																fontSize:
																	'15px',
																color: '#8C8C8C',
																textDecoration:
																	'line-through',
															}}
														>
															{getCurrency(
																'currency'
															)}{' '}
														</span>
													)}
													<span
														style={{
															fontSize: '15px',
															color: '#8C8C8C',
															textDecoration:
																'line-through',
															marginRight: '7px',
														}}
													>
														{getCurrency(
															'original'
														)}
													</span>
													{getCurrency('currency')}{' '}
													{subTotal}
												</p>
											</div>
										</div>

										{isChargable === true && (
											<div className="flex justify-between">
												<p>Transaction fees</p>
												<p>{transactionFee || 0}</p>
											</div>
										)}

										<div className="flex justify-between">
											<p>
												Tax{' '}
												<span>
													<Tooltip title="You are paying this tax to the kreator, in compliance with their country’s tax policy. KreateSell does not in anyway benefit from the taxes.">
														<Image
															src={QuestionIcon}
															alt=""
														/>
													</Tooltip>
												</span>
											</p>

											<p>
												{getTaxDeduction('getVal') || 0}
											</p>
										</div>

										<div className="divider"></div>

										<div className="flex justify-between">
											<p>Total</p>
											<p className="text-primary-blue font-medium">
												{getCurrency('currency')}{' '}
												{Number(
													getCurrency('total')
												).toFixed(2)}
											</p>
										</div>
									</div>
								)}

								{pricingTypeDetails === 'Make it Free' && (
									<div className="flex items-center justify-center">
										<Image
											src={MakeItFreeIcon}
											width="240"
											height="294"
											alt=""
										/>
									</div>
								)}

								{pricingTypeDetails !== 'Make it Free' ? (
									<p className="text-base-gray text-center py-6 text-xs md:text-sm">
										Get instant access to this product once
										your payment is successful!
									</p>
								) : (
									<>
										<p className="text-base-gray text-center py-6 text-xs md:text-sm">
											<span className="text-base text-gray-700">
												You are getting this product for
												free!
											</span>
											<br /> Get instantly access this
											product once your click the button
										</p>
									</>
								)}

								{pricingTypeDetails !== 'Make it Free' && (
									<div className=" w-full lg:w-5/6 mx-auto">
										<Button
											text={`Pay Now`}
											bgColor="blue"
											className={styles.btnCont}
											icon={<RightArrow />}
											disabled={
												currencyConverterLoading ||
												disableBtn
											}
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
							{pricingTypeDetails === 'Make it Free' && (
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
			</ErrorBoundary>
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
