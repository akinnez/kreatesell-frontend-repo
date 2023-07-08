import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';

import {DialogOverlay, DialogContent} from '@reach/dialog';
import {Row, Col, Select} from 'antd';
import {PayPalButtons} from '@paypal/react-paypal-js';
import {getExample} from 'awesome-phonenumber';
import {Tooltip} from 'antd';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {usePaystackPayment} from 'react-paystack';
import {useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import crypto from 'crypto';
import axios from 'axios';
import {AiFillCheckCircle} from 'react-icons/ai';

import {SelectV2} from 'components/form-input';
import {PhoneNumberInput} from 'components';
import styles from '../../../public/css/checkout.module.scss';
import {Input, Button} from 'components';
import CurrencyCard from 'components/settings/CurrencyCard';
import {ConsumerSalesCheckoutSchema} from 'validation';
import {
	ActiveTick,
	ArrowLeft,
	MobileBackArrow,
	RightArrow,
	CloudDownload,
	ErrorIcon,
	transactionFees,
	RenderIf,
	MakeItFreeIcon,
	QuestionIcon,
	CloseButton,
} from 'utils';
import {
	SendPaymentCheckoutDetails,
	ConvertCurrency,
	GetStoreCheckoutCurrencies,
	ApplyCoupon,
	RevalidateReference,
} from 'redux/actions';
import LogoImg from '../../../public/images/logo.svg';
import useFetchUtilities from 'hooks/useFetchUtilities';
import Loader from 'components/loader';
import useCheckoutCurrency from 'hooks/useCheckoutCurrencies';
import {countryPayments} from '../../../utils/paymentOptions';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundaryComponent';
import useLocation from 'hooks/useLocation';

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
const {Option} = Select;

const Checkout = () => {
	const router = useRouter();
	const productId = router.query.id;
	const productLink = `${process.env.BASE_URL}v1/kreatesell/product/get/${productId}`;
	const paypalRef = useRef();

	const [modal, setModal] = useState(false);
	const [hostState, setHostState] = useState('');
	const [placeholderNumber, setPlaceholderNumber] = useState(
		'Enter your phone number'
	);
	const [countryCode, setCountryCode] = useState('');
	const {countryDetails, countryDetailsLoading} = useLocation();
	const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies();
	const checkoutDetails = useSelector((state) => state.checkout);

	const {convertedCurrency, loading: currencyConverterLoading} = useSelector(
		(state) => state.currencyConverter
	);
	const {loading: storeCheckoutCurrenciesLoading} = useSelector(
		(state) => state.store
	);

	const [country, setCountry] = useState('');
	const [countryId, setCountryId] = useState(null);
	const {countries, loading: countriesLoading} = useSelector(
		(state) => state.utils
	);
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
	const revalidateReference = RevalidateReference();
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
	const [couponSuccess, setCouponSuccess] = useState(false);
	const [isCouponLoading, setIsCouponLoading] = useState(false);
	const [showCoupon, setShowCoupon] = useState(false);

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
		// setCountryCode(phoneCode?.country_code);
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

	useEffect(() => {
		if (selectedPaymentMethod && randomId) {
			if (['flutterwave', 'paystack'].includes(selectedPaymentMethod)) {
				// TODO: Make request to backend
				// console.log('I am making a request here')
			}
		}
	}, [selectedPaymentMethod, randomId]);

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

	/**
     * @description - Send request immediately a payment is triggered
      NOTE: We need this so as to able to settle all monet
       there are instances where people make payment for products but it
      does not reflect, so this is just a means to help us track.
     */
	const revalidateReferenceFn = async () => {
		const countryCode = countries.find(
			(country) => country?.name === values.Country_code
		);

		await revalidateReference(
			{
				payment_identifier: selectedPaymentMethod,
				payment_id: randomId,
				debit_currency:
					pricingTypeDetails === 'Make it Free'
						? getCurrency('free')
						: getCurrency('currency'),
				payment_type: 'purchase',
				product_id: productId,
				is_affiliate: affliateRef ? true : false,
				affiliate_id: getAffiliateRef(),
				affiliate_link: getAffiliateUniqueKey(),
				is_free_flow: pricingTypeDetails === 'Make it Free',
				country_code: countryCode?.country_code,
			},
			() => {},
			() => {}
		);
	};

	const handleSubmit = async () => {
		revalidateReferenceFn();
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
						product_name: productId,
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
								? (window.location.href =
										`${storeDetails?.product_details?.redirect_url}`.includes(
											'http://'
										) ||
										`${storeDetails?.product_details?.redirect_url}`.includes(
											'https://'
										)
											? storeDetails?.product_details
													?.redirect_url
											: `http://${storeDetails?.product_details?.redirect_url}`)
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
					await sendPaymentCheckoutDetails(
						paymentDetails({
							status: 'abandoned',
						}),
						() => {},
						() => {},
						false
					);
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

	const {errors, setFieldValue, values, dirty} = formik;

	const [countryCode2, setCountryCode2] = useState();
	useEffect(() => {
		if (
			activeCurrency instanceof Object &&
			Object.keys(activeCurrency).length > 0
		) {
			setCountryCode2(activeCurrency?.name);
		}
	}, [activeCurrency]);

	useEffect(() => {
		if (countryCode) {
			// console.log('country code', countryCode);
			const sampleNumber = getExample(`${countryCode}`, 'mobile');
			setPlaceholderNumber(sampleNumber.number.national);
		}
	}, [countryCode]);
	const paymentDetails = ({
		reference = '',
		status = '',
		card_type = selectedPaymentMethod,
	}) => {
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
			card_type,
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

	// console.log('values', values);
	// console.log('countryCode2', countryCode2);
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
					? (window.location.href =
							`${storeDetails?.product_details?.redirect_url}`.includes(
								'http://'
							) ||
							`${storeDetails?.product_details?.redirect_url}`.includes(
								'https://'
							)
								? storeDetails?.product_details?.redirect_url
								: `http://${storeDetails?.product_details?.redirect_url}`)
					: router.push(
							`/checkout/success/${storeDetails?.store_dto?.store_name}_${router?.query?.id}/?currency=${currencyPaidIn}`
					  );
			}
		);
	};

	const onPaystackClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		// Abandon transaction
		sendPaymentCheckoutDetails(
			paymentDetails(
				{status: 'abandoned'},
				() => {},
				() => {},
				false
			)
		);
	};

	const initializePaystackPayment = usePaystackPayment(payStackConfig);
	// paystack config ends here

	// paypal success
	const paypalSuccess = (data /*, actions, order*/) => {
		const status = 'success';
		sendPaymentCheckoutDetails(
			paymentDetails({
				reference: data?.orderID,
				status: status,
				card_type: 'paypal',
			}),
			() => {
				router.push(
					`/checkout/success/${storeDetails?.store_dto?.store_name}_${router?.query?.id}/?currency=${currencyPaidIn}`
				);
			}
		);
	};

	const paypalHandler = async (data, actions) => {
		revalidateReferenceFn();
		// paypalRef.current = values;
		return actions.order
			.create({
				intent: 'CAPTURE',
				purchase_units: [
					{
						description:
							storeDetails?.product_details?.product_name || '',
						amount: {
							value: getCurrency('price'),
							currency_code: getCurrency('currency'),
						},
					},
				],
			})
			.then((orderId) => {
				return orderId;
			});
	};

	// stripe logic is being handled on the backend
	// const stripeSuccess = () => {};

	// ===================================================================================
	//              PAYMENT CONFIG ENDS HERE
	// ===================================================================================

	const handleSelect = (currency) => {
		setActiveCurrency(currency);
	};

	// Set currency based on user's location
	useEffect(() => {
		if (countryDetails?.currency && countries?.length > 0) {
			//TODO: get the currency list and find the country with this country code
			let country = countries.find(
				({country_code, currency}) =>
					country_code === countryDetails.countryCode &&
					currency === countryDetails.currency
			);
			if (country) {
				handleSelect(country);
			}
		} else if (checkOutDetails.length) {
			// we need to check for the default currency here
			setActiveCurrency(baseCurrencyObbject);
		}
		return () => {};
	}, [countryDetails?.currency, countries?.length, checkOutDetails.length]);

	useEffect(() => {
		if (countries?.length > 0 && !!countryCode2) {
			formik.setFieldValue(
				'Country_code',
				countryCode2 || countries[0].name
			);
		}
	}, [countries?.length, countryCode2]);

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
		if (!couponData.customer_email) return;
		e.preventDefault();
		try {
			setIsCouponLoading(true);
			await applyCoupon(
				couponData,
				(res) => {
					setCouponDetails(res);
					setCouponSuccess(true);
					setIsCouponLoading(false);
				},
				() => {
					setIsCouponLoading(false);
				}
			);
		} catch (err) {
			setCouponSuccess(false);
			setIsCouponLoading(false);
			console.error(err);
		}
	};

	useEffect(() => {
		setHostState(window.location.host);
	}, []);

	/**
	 * @param countryDetails
	 * @returns JSX.Element
	 */
	const generatePlaceholder = ({flag, currency, name, currencyObj}) => {
		return (
			<div className="flex items-center gap-2">
				<div
					style={{
						borderRadius: '50%',
						height: '25px',
						width: '25px',
						display: 'inline-block',
						overflow: 'hidden',
					}}
				>
					<Image
						alt="flag"
						src={flag}
						style={{borderRadius: '50%'}}
						width={'100%'}
						height={'100%'}
					/>
				</div>{' '}
				{currency} <div className={`${styles.dot}`}></div>{' '}
				{currencyObj[currency]?.name}{' '}
				<div className={`${styles.dot}`}> </div>
				{name}
			</div>
		);
	};

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
					' white relative py-8 px-10 shadow items-center'
				}
			>
				<div
					className={`white relative flex items-center text-center ${styles.navContainer}`}
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

						<h2 className="font-bold mb-0 text-lg lg:text-2xl">
							Checkout
						</h2>
						<Image
							src={LogoImg}
							alt="logo"
							width={140}
							height={35}
						/>
					</div>
					<div className={styles.lgContent}>
						<Image
							src={LogoImg}
							alt="logo"
							width={140}
							height={35}
						/>
						<h2 className=" font-bold mb-0 text-lg lg:text-2xl">
							Checkout
						</h2>
					</div>
				</div>
			</nav>
			<ErrorBoundary resetErrorBoundary={() => router.back()}>
				<div className={`${styles.container}`}>
					<div className={styles.bodyWrapper}>
						<div className="flex py-6 items-center gap-12">
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
							<div className="w-full md:w-2/5 flex flex-col">
								<div
									className={`bg-white shadow rounded-lg w-full mb-7 p-10 lg:p-5 lg:px-7 ${styles.productDetailsContainer}`}
								>
									<h4 className={styles.productDetails}>
										Product Details
									</h4>
									<div className={`flex gap-3`}>
										<div
											className={`${styles.productImageContainer}`}
										>
											<Image
												width={120}
												height={120}
												src={
													storeDetails.product_images
														.filter(
															(image) =>
																image.file_type ===
																1
														)[0]
														?.filename?.split(
															','
														)[0]
												}
												// src={QuestionIcon}
												alt="product Image"
											/>
										</div>
										<div>
											<h5 className={styles.productTitle}>
												{
													storeDetails
														?.product_details
														?.product_name
												}
											</h5>
											<p className={styles.productPrice}>
												<RenderIf
													condition={
														storeDetails?.product_price_type?.toLowerCase() !==
														'make it free'
													}
												>
													{`${storeDetails?.default_currency?.currency}${storeDetails?.default_price}`}
												</RenderIf>
											</p>
											<p className={styles.name}>
												{
													storeDetails?.kreator_full_name
												}
											</p>
										</div>
									</div>
								</div>
								<div
									style={{height: 'fit-content'}}
									className={`bg-white shadow rounded-lg w-full p-10 lg:p-5 lg:px-16 ${styles.cardBoxShadow}`}
								>
									<form>
										<div>
											<div className="text-black-100 font-bold text-lg mb-4">
												Personal Info
											</div>
											<p className="text-base-gray-200">
												Complete your purchase by
												filling in the following details
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

										<Row gutter={{xs: 0, sm: 0, md: 0}}>
											<Col
												// xs={12}
												// md={12}
												className={
													styles.phoneNumberLabel
												}
											>
												Phone number (Provide WhatsApp
												number if available)
											</Col>

											<div
												className={`${styles.phoneCode} phoneCode`}
											>
												<Col xs={9} md={10}>
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
														phoneNumberInput={true}
														errorMessage={
															errors.Country_code
														}
														placeholderSetterFn={
															setCountryCode
														}
														defaultValue={
															countryCode2 ||
															countries[0].name
														}
														loading={
															countriesLoading ||
															storecheckoutCurrencyLoading ||
															storeCheckoutCurrenciesLoading
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
												<div
													className={styles.phoneBox}
												>
													<Col>
														<PhoneNumberInput
															type="tel"
															// TODO: Make this change
															placeholder={
																placeholderNumber
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
							</div>

							<div
								className={`bg-white shadow rounded-lg w-full md:w-3/5 p-4 lg:p-8 ${styles.cardBoxShadow}`}
							>
								<form
									// validateOnChange
									onSubmit={formik.handleSubmit}
									autoComplete="off"
									className="w-full"
								>
									<RenderIf
										condition={
											pricingTypeDetails !==
											'Make it Free'
										}
									>
										<div className="pb-4">
											<div className="text-black-100">
												Select Currency
											</div>
											<p className="text-base-gray-200">
												Select your preferred currency
												and get price equivalent
											</p>
											<div>
												{/* TODO: Make this compulsory */}
												<Select
													className={`w-full mb-5 selectCurrencyDropdown`}
													placeholder={
														generatePlaceholder(
															countriesCurrency[0]
														) || 'Select Currency'
													}
													name="paymentCurrency"
													onChange={(e) => {
														const allCurrencies = [
															...countriesCurrency,
															...filterdWest,
															...filteredCentral,
														];
														const currency =
															allCurrencies.find(
																(cur) =>
																	cur.currency_id ===
																	e
															);
														if (currency) {
															handleSelect(
																currency
															);
														}
													}}
													defaultValue={
														activeCurrency.currency_id
													}
												>
													{[
														...countriesCurrency,
														...filterdWest,
														...filteredCentral,
													].map(
														(currencyObj, idx) => (
															<Option
																key={idx}
																value={
																	currencyObj.currency_id
																}
															>
																{generatePlaceholder(
																	currencyObj
																)}
															</Option>
														)
													)}
												</Select>
											</div>
										</div>
									</RenderIf>
									{/* start the pay as you want  */}
									{pricingTypeDetails ===
										'Pay What You Want' && (
										<div className="">
											<h2
												className={
													styles.desiredPayTitle
												}
											>
												Pay what you want
											</h2>
											<p
												className={
													styles.desiredPayText
												}
											>
												For this product, you can pay
												any price above the minimum
												amount.
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
															Please read
															carefully <br />
															Your desired amount
															is too low. The
															minimum amount for
															this product is{' '}
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
									{pricingTypeDetails !== 'Make it Free' && (
										<div className="pb-6">
											<div className="text-black-100">
												Payment Method
											</div>
											<p className="text-base-gray-200">
												Select your preferred payment
												method
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
													.map(
														({
															type,
															icon,
															value,
														}) => (
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
																		src={
																			ActiveTick
																		}
																		alt="active"
																		width="16"
																		height="16"
																	/>
																)}
															</div>
														)
													)}
												{/* active currency */}
												{/* Render onl when currency is USD, GPB, CAD*/}
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
															].includes(
																'CAD'
															)) &&
														storeDetails?.kyc_status?.kyc_status?.toLowerCase() ===
															'approved' &&
														storeDetails?.user_plan?.toLowerCase() ===
															'business'
													}
												>
													{formik.values.firstName &&
													formik.values.lastName &&
													formik.values.email &&
													formik.values.phoneNo ? (
														<div>
															<PayPalButtons
																style={{
																	layout: 'horizontal',
																	label: 'pay',
																}}
																disabled={
																	!formik
																		.values
																		.firstName ||
																	!formik
																		.values
																		.lastName ||
																	!formik
																		.values
																		.email ||
																	!formik
																		.values
																		.phoneNo
																}
																className={`flex justify-around items-center ml-14 md:ml-1`}
																createOrder={(
																	data,
																	actions
																) =>
																	paypalHandler(
																		data,
																		actions
																	)
																}
																onApprove={async (
																	data,
																	actions
																) => {
																	const order =
																		await actions.order.capture();

																	paypalSuccess(
																		data,
																		actions,
																		order
																	);
																}}
																onCancel={() => {}}
																onError={() => {}}
															/>
														</div>
													) : (
														<Tooltip
															title={
																(!formik.values
																	.firstName ||
																	!formik
																		.values
																		.lastName ||
																	!formik
																		.values
																		.email ||
																	!formik
																		.values
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
																		!formik
																			.values
																			.firstName ||
																		!formik
																			.values
																			.lastName ||
																		!formik
																			.values
																			.email ||
																		!formik
																			.values
																			.phoneNo
																	}
																	className={`flex justify-around items-center ml-14 md:ml-1`}
																	createOrder={() => {}}
																	onApprove={async () => {}}
																	onCancel={() => {}}
																	onError={() => {}}
																/>
															</div>
														</Tooltip>
													)}
												</RenderIf>
											</div>
										</div>
									)}
									{/**This is reserved for Premium users who have activated tier 2 payment options. Uncomment the code block below to and implement the functionality */}

									{/**Apply coupon feature is yet to be implemented */}
									{pricingTypeDetails !== 'Make it Free' &&
										!couponSuccess && (
											<>
												<RenderIf
													condition={!showCoupon}
												>
													<p
														className={`font-[16px]`}
													>
														Have a Coupon Code?{' '}
														<span
															className={`underline font-bold cursor-pointer`}
															style={{
																color: '#0072EF',
															}}
															onClick={() =>
																setShowCoupon(
																	true
																)
															}
														>
															Click here to Add
														</span>{' '}
													</p>
												</RenderIf>
												<RenderIf
													condition={showCoupon}
												>
													<div className="w-full flex gap-2 items-start pr-4 lg:hidden">
														<div className="w-3/5 xs:w-3/4 md:w-4/5">
															<Input
																placeholder="Coupon Code"
																name="couponCode"
																onChange={(e) =>
																	setCouponCode(
																		e.target
																			.value
																	)
																}
															/>
														</div>
														<div className="w-30 xs:w-1/4 md:w-1/5 pb-2 flex items-center gap-2">
															<Button
																text={
																	'Apply Coupon'
																}
																className={
																	styles.couponBtn
																}
																onClick={
																	handleApplyCoupon
																}
																disabled={
																	isCouponLoading
																}
															/>
															<span className="inline-block cursor-pointer">
																<Image
																	src={
																		CloseButton
																	}
																	alt="cancel icon"
																	height={30}
																	width={30}
																	onClick={() =>
																		setShowCoupon(
																			false
																		)
																	}
																/>
															</span>
														</div>
													</div>
													<div className="w-full hidden lg:flex gap-4 items-start">
														<div className="w-4/5">
															<Input
																placeholder=" Enter Coupon Code"
																name="couponCode"
																onChange={(e) =>
																	setCouponCode(
																		e.target
																			.value
																	)
																}
															/>
														</div>
														<div className="w-1/5 pb-2 flex items-center gap-2">
															<Button
																text={
																	'Apply Coupon'
																}
																className={
																	styles.couponBtn
																}
																onClick={
																	handleApplyCoupon
																}
																disabled={
																	isCouponLoading
																}
															/>
															<span className="inline-block cursor-pointer">
																<Image
																	src={
																		CloseButton
																	}
																	alt="cancel icon"
																	onClick={() =>
																		setShowCoupon(
																			false
																		)
																	}
																	height={30}
																	width={30}
																/>
															</span>
														</div>
													</div>
												</RenderIf>
											</>
										)}

									{pricingTypeDetails !== 'Make it Free' &&
										couponSuccess && (
											<div className="w-full md:w-2/4 flex gap-2 items-center my-6 rounded-lg border-2 p-2 ml-16 justify-center">
												<p className="text-lg my-auto">
													Coupon successfully Applied
												</p>
												<div>
													<AiFillCheckCircle className="text-2xl text-base-green-200" />
												</div>
											</div>
										)}

									{pricingTypeDetails !== 'Make it Free' && (
										<div
											className={`p-6 w-full shadow rounded-md bg-white flex flex-col ${styles.boxShadow}`}
										>
											<div className="flex justify-between">
												<p>SubTotal</p>
												<div className="flex gap-4">
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
																fontSize:
																	'15px',
																color: '#8C8C8C',
																textDecoration:
																	'line-through',
																marginRight:
																	'7px',
															}}
														>
															{getCurrency(
																'original'
															)}
														</span>
														{getCurrency(
															'currency'
														)}{' '}
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
																src={
																	QuestionIcon
																}
																alt=""
															/>
														</Tooltip>
													</span>
												</p>

												<p>
													{getTaxDeduction(
														'getVal'
													) || 0}
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
											Get instant access to this product
											once your payment is successful!
										</p>
									) : (
										<>
											<p className="text-base-gray text-center py-6 text-xs md:text-sm">
												<span className="text-base text-gray-700">
													You are getting this product
													for free!
												</span>
												<br /> Get instantly access this
												product once your click the
												button
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
