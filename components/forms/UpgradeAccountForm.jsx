import {useState, useEffect} from 'react';
import Image from 'next/image';
// import Script from 'next/script'

import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js';
import {useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import {usePaystackPayment} from 'react-paystack';
// import CoinbaseCommerceButton from 'react-coinbase-commerce';

import crypto from 'crypto';

import {SendPaymentCheckoutDetails} from 'redux/actions';
import {Button} from 'components/button/Button';
import {
	ActiveTick,
	ActiveStripe,
	AdvancedBitcoin,
	AdvancedPaypal,
	splitFullName,
	FlutterwaveLogo,
	transactionFees,
	RenderIf,
} from 'utils';
import {RightArrow} from 'utils/icons/RightArrow';
import useConvertRates from 'hooks/useConvertRates';
import Loader from '../loader';
import styles from '../../public/css/UpgradeAccountForm.module.scss';
import CurrencyCard from 'components/settings/CurrencyCard';
import {useSelector} from 'react-redux';
import {Input} from 'components';
import axios from 'axios';
import {countryPayments} from '../../utils/paymentOptions';

export const UpgradeAccountForm = ({
	subscriptionMode: {mode, price},
	selectedCurrency,
	countriesCurrency,
	loading,
	filteredCentral,
	filterdWest,
	setModal,
	setSelectedPlan,
	convertedCurrency,
	monthly,
}) => {
	// for paypal
	// get the state for the sdk script and the dispatch method
	const [{options}, dispatch] = usePayPalScriptReducer();

	// TODO: handle currency change for crypto currency

	// const makePlanUpgrade = MakePlanUpgrade();
	const {user} = useSelector((state) => state.auth);
	const {store} = useSelector((state) => state.store);

	const [activeCurrency, setActiveCurrency] = useState('');
	const [convertedPrice, setConvertedPrice] = useState(price);

	// converted price + transaction fees
	const [totalPrice, setTotalPrice] = useState();

	// for when crypto is selected
	const [currency, setCurrency] = useState('');

	const {handleCurrencyConversion} = useConvertRates(
		'NGN',
		activeCurrency?.currency || selectedCurrency
	);

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const sendPaymentCheckoutDetails = SendPaymentCheckoutDetails();

	// ====================================================================================
	//              PAYMENT CONFIG STARTS HERE
	// ===================================================================================
	const randomId = `kreate-sell-${crypto.randomBytes(16).toString('hex')}`;
	const paymentStatusList = {
		success: 's',
		failed: 'f',
		// abandoned: "a"
	};
	const paymentDetails = ({reference = '', status = ''}) => {
		const statusValue = paymentStatusList[status];
		const value = {
			fullname: user?.full_name,
			email_address: user?.email,
			mobile_number: user?.mobile,
			datetime: new Date().toISOString(),
			// total: convertedPrice,
			total: totalPrice,
			reference_id: reference,
			purchase_details: [],
			status: statusValue,
			card_type: '',
			last_four: '',
			currency: activeCurrency?.currency,
			payment_type: 'subscription',
			is_affiliate: user?.is_affiliate,
			affiliate_product_link: '',
			user_identifier: user?.id,
			duration: monthly ? 'monthly' : 'yearly',
		};
		return value;
	};

	// Flutterwave configurations
	const flutterConfig = {
		public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
		tx_ref: randomId,
		// amount: convertedPrice,
		amount: totalPrice,
		currency: `${activeCurrency?.currency}`,
		payment_options: 'card, mobilemoney, ussd, mobile_money_ghana',
		customer: {
			email: user?.email,
			phonenumber: user?.mobile,
			name: splitFullName(user?.full_name),
		},
		type: '',
		customizations: {
			title: 'KreateSell Title',
			description: 'KreateSell description',
			logo: 'https://res.cloudinary.com/salvoagency/image/upload/v1636216109/kreatesell/mailimages/KreateLogo_sirrou.png',
		},
	};

	const handleFlutterPayment = useFlutterwave(flutterConfig);

	// Flutterwave configurations end here

	// paystack config
	const payStackConfig = {
		reference: randomId,
		email: user?.email,
		// amount: convertedPrice * 100,
		amount: totalPrice * 100,
		publicKey:
			activeCurrency?.currency === 'GHS'
				? process.env.NEXT_PUBLIC_PAYSTACK_GHANA_PUBLIC_KEY
				: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
		firstName: splitFullName(user?.full_name, 'arr')?.[0],
		lastname: splitFullName(user?.full_name, 'arr')?.[1],
		phone: user?.mobile,
		currency: `${activeCurrency?.currency}`,
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
		// console.log(reference)
		const status = paymentStatusList[reference?.status];
		sendPaymentCheckoutDetails(
			paymentDetails({reference: reference?.reference, status}),
			(res) => {
				console.log('res is', res);
				setSelectedPlan('Business');
				//
			}
		);
	};

	const onPaystackClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed');
	};

	const initializePaystackPayment = usePaystackPayment(payStackConfig);
	// paystack config ends here

	// paypal success
	const paypalSuccess = (data, actions) => {
		// sendPaymentCheckoutDetails(
		// 	paymentDetails({reference: reference?.reference, status: status}),
		// 	() =>
		// 		router.push(
		// 			`/checkout/success/${storeDetails?.store_dto?.store_name}/${router?.query?.id}`
		// 		)
		// );
	};

	const stripeSuccess = () => {};

	// ===================================================================================
	//              PAYMENT CONFIG ENDS HERE
	// ===================================================================================
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
		setTotalPrice((feePercentage / 100) * convertedPrice + convertedPrice);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if selected is crypto
		if (selectedPaymentMethod === 'crypto') {
			// console.log('crypto');
			try {
				const data = await axios.post(
					'https://kreatesell.io/api/v1/kreatesell/payment/coinbase-charge',
					{
						name: splitFullName(user?.full_name, 'arr')?.[0],
						description: 'Account upgrade payment',
						pricing_type: 'fixed_price',
						local_price: {
							amount: totalPrice,
							currency: 'USDT',
						},
						metadata: {
							customer_id: user?.id,
							customer_name: splitFullName(
								user?.full_name,
								'arr'
							)?.[0],
						},
					}
				);
				window.open(data.data.data.hosted_url, '_blank');
			} catch (e) {
				console.error(e);
			}
		}

		if (selectedPaymentMethod === 'stripe') {
			try {
				const data = await axios.post(
					'https://kreatesell.io/api/v1/kreatesell/payment/stripe/create-checkout-session',
					{
						unit_amount: Number(totalPrice).toFixed() * 100,
						currency: activeCurrency?.currency,
						quantity: 1,
						success_url: `${location.origin}/account/kreator/settings?activeTab=billing&upgradeStatus=successful`,
						cancel_url: `${location.origin}/account/kreator/settings?activeTab=billing?status=fail`,
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
			setModal(false);
			handleFlutterPayment({
				callback: async (response) => {
					// console.log('response ', response)
					setSelectedPlan('Business');
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
	};

	// set currency on mount
	useEffect(() => {
		if (countriesCurrency && !selectedCurrency.value) {
			let currency = countriesCurrency.find(
				(cur) => cur?.currency === selectedCurrency
			);
			setActiveCurrency(currency || countriesCurrency[0]);
			setSelectedPaymentMethod(countryPayments['NGN'].value);
		} else if (selectedCurrency.value) {
			setActiveCurrency(selectedCurrency);
		}
	}, [countriesCurrency]);

	useEffect(() => {
		if (activeCurrency?.currency || activeCurrency?.currency_name) {
			setSelectedPaymentMethod(
				countryPayments[
					activeCurrency?.currency || activeCurrency.currency_name
				][0].value
			);
		}
		handleCurrencyConversion();
	}, [activeCurrency?.currency, activeCurrency?.currency_name]);

	useEffect(() => {
		if (selectedPaymentMethod === 'crypto') {
			setCurrency('USD');
			handleCurrencyConversion('USD');
		} else {
			setCurrency('');
		}
	}, [selectedPaymentMethod]);
	useEffect(() => {
		if (!currency) {
			handleCurrencyConversion();
		}
	}, [currency]);

	// console.log('selectedPaymentMethod', selectedPaymentMethod);
	// console.log('currency', currency);
	// console.log('convertedCurrency', convertedCurrency);

	// useEffect to convert currency
	useEffect(() => {
		if (Object.keys(convertedCurrency).length > 0) {
			setConvertedPrice(price * convertedCurrency?.buy_rate);
		}
	}, [convertedCurrency]);

	// calculate price + fees
	useEffect(() => {
		if (convertedPrice) {
			calculatePriceWithFees();
		}
	}, [convertedPrice]);

	// console.log('active', activeCurrency.currency);
	const handleSelect = (currency) => {
		setActiveCurrency(currency);
	};

	const handlePaymentMethod = (method) => {
		setSelectedPaymentMethod(method);
	};

	if (loading) return <Loader />;

	return (
		<>
			<div className="px-0 md:px-5">
				<div className="text-center mb-4">
					<h3 className="text-black-100 font-bold text-xl">
						Upgrade Your Account
					</h3>
					<h4 className="text-black-100 pt-2">BUSINESS</h4>
					<div className="divider"></div>

					<div className="text-base-green-200 font-bold text-2xl">
						<sup className="font-normal text-xs text-black-100">
							{currency ||
								activeCurrency?.currency ||
								selectedCurrency.currency}
							<RenderIf condition={!!currency}>T</RenderIf>
						</sup>{' '}
						{Number(convertedPrice).toFixed(2)}
						{monthly && (
							<sub className="font-normal text-xs text-black-100">
								/ Month
							</sub>
						)}
					</div>
				</div>

				<form className="px-2 md:px-2 pt-4" onSubmit={handleSubmit}>
					<div className="text-primary-blue font-medium text-lg">
						Payment Details
					</div>
					<div className="divider"></div>

					<div>
						<div>Select Currency</div>
						<p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
							Select your preferred currency and get price
							equivalent
						</p>
					</div>
					<div className="grid gap-4 grid-cols-3 md:grid-cols-6 pt-3">
						{countriesCurrency?.map(
							({currency, currency_id, flag}, i) =>
								!['XOF', 'XAF'].includes(currency) && (
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

					<div className="py-7">
						<h2>West African CFA Franc BCEAO(XOF)</h2>
						<div className="grid gap-2 grid-cols-4 ">
							{filterdWest.map(
								({id, currency, flag, name}, index) => (
									<div
										key={index}
										className={
											activeCurrency?.id === id
												? styles.activeCard
												: styles.card
										}
										// onClick={() => setActiveCurrency(country)}
										onClick={() =>
											handleSelect({id, currency})
										}
									>
										<div
											className={
												styles.checFlag + ' mr-2'
											}
											style={{borderRadius: '50%'}}
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
						<div className="grid gap-1 grid-cols-4 ">
							{filteredCentral.map(
								({id, currency, name, flag}, index) => (
									<div
										key={index}
										className={
											activeCurrency?.id === id
												? styles.activeCard
												: styles.card
										}
										// onClick={() => setActiveCurrency(country)}
										onClick={() =>
											handleSelect({id, currency})
										}
									>
										<div
											className={
												styles.checFlag + ' mr-2'
											}
											style={{borderRadius: '50%'}}
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

					<>
						<div className="pt-6">
							<div className="text-black-100">Payment Method</div>
							<p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
								Select your preferred payment method
							</p>
						</div>
						<div className="grid gap-4 grid-cols-3 pt-3">
							{countryPayments[
								activeCurrency?.currency ||
									activeCurrency?.currency_name
							]
								?.filter(({value}) => {
									{
										/* if kyc is approved and userplan is business */
									}
									if (
										store?.kyc_status?.kyc_status?.toLowerCase() ===
											'approved' &&
										store?.user?.user_plan?.toLowerCase() ===
											'business' &&
										value !== 'paypal'
									) {
										console.log(`store?.kyc_status?.kyc_status?.toLowerCase() ===
											'approved' &&
										store?.user?.user_plan?.toLowerCase() ===
											'business' &&
										value !== 'paypal'`);
										return true;
									}
									{
										/* if kyc is not approved and userplan is not business */
									}
									{
										/* if (
										store?.kyc_status?.kyc_status?.toLowerCase() !==
											'approved' &&
										store?.user?.user_plan?.toLowerCase() !==
											'business'
									) {
										return false;
									} */
									}
									if (
										store?.user?.user_plan?.toLowerCase() !==
										'business'
									) {
										let currency =
											activeCurrency?.currency ||
											activeCurrency?.currency_name;
										if (
											![
												'crypto',
												'stripe',
												'paypal',
											].includes(value)
										) {
											return true;
											{
												/* return false; */
											}
										}
									}
									if (
										store?.kyc_status?.kyc_status?.toLowerCase() !==
										'approved'
									) {
										let currency =
											activeCurrency?.currency ||
											activeCurrency?.currency_name;
										if (
											![
												'crypto',
												'stripe',
												'paypal',
											].includes(value)
										) {
											{
												/* return false; */
											}
											return true;
										}
									} else {
										return true;
									}
								})
								.map(({type, icon, value}) => (
									<div
										key={value}
										onClick={() =>
											handlePaymentMethod(value)
										}
										className={`${
											selectedPaymentMethod === value
												? 'activeCard'
												: 'card'
										} p-2 flex justify-around items-center`}
									>
										<Image src={icon} alt={type} />
										{true &&
											selectedPaymentMethod === value && (
												<Image
													src={ActiveTick}
													alt="active"
													width="16"
													height="16"
												/>
											)}
									</div>
								))}
							<RenderIf
								condition={
									store?.kyc_status?.is_kyc_verified &&
									store?.kyc_status?.kyc_status?.toLowerCase() ===
										'approved' &&
									store?.user?.user_plan?.toLowerCase() ===
										'business' &&
									['USD', 'GBP', 'CAD'].includes(
										activeCurrency?.currency ||
											activeCurrency?.currency_name
									)
								}
							>
								<PayPalButtons
									style={{
										layout: 'horizontal',
										label: 'pay',
									}}
									className={`flex justify-around items-center`}
									createOrder={async (data, actions) => {
										return actions.order.create({
											purchase_units: [
												{
													description:
														'customDescription',
													amount: {
														// value: Number(
														// 	convertedPrice
														// ).toFixed(2),
														value: Number(
															totalPrice
														).toFixed(2),
														currency:
															activeCurrency?.currency ||
															selectedCurrency.currency,
													},
												},
											],
										});
									}}
									onApprove={(data, actions) => {
										// TODO: handle payment success
										console.log('data is', data);
										console.log('actions is', actions);
										alert(
											'You have successfully completed the transaction'
										);
									}}
								/>
							</RenderIf>
						</div>
					</>

					<div className="w-full flex gap-2 items-center pr-4 lg:hidden">
						<div className="w-3/5 xs:w-3/4 md:w-4/5">
							<Input
								placeholder="Coupon Code"
								name="couponCode"
								// onChange={formik.handleChange}
							/>
						</div>
						<div className="w-30 xs:w-1/4 md:w-1/5 pb-2">
							<Button
								text="Apply Coupon"
								className={styles.couponBtn}
							/>
						</div>
					</div>

					<div className="w-full lg:w-6/6 mt-5 mx-auto hidden lg:flex gap-4 items-center">
						<div className="w-4/5">
							<Input
								placeholder=" Enter Coupon Code"
								name="couponCode"
								// onChange={formik.handleChange}
							/>
						</div>
						<div className="w-1/5 mb-5">
							<Button
								text="Apply Coupon"
								className={styles.couponBtn}
							/>
						</div>
					</div>

					<div className="priceMenu my-6 py-3 px-8">
						<div className="flex justify-between pt-2">
							<p>SubTotal</p>
							<p>
								{currency ||
									activeCurrency?.currency ||
									selectedCurrency.currency}
								<RenderIf condition={!!currency}>T</RenderIf>{' '}
								{Number(convertedPrice).toFixed(2)}
							</p>
						</div>
						<div className="divider"> </div>
						<div className="flex justify-between">
							<p>Total with Fees</p>
							<p className="text-primary-blue font-medium">
								{currency ||
									activeCurrency?.currency ||
									selectedCurrency.currency}
								<RenderIf condition={!!currency}>T</RenderIf>{' '}
								{/* {Number(convertedPrice).toFixed(2)} */}
								{Number(totalPrice).toFixed(2)}
							</p>
						</div>
					</div>

					<div className="w-full">
						{
							<Button
								text={`Pay ${
									currency ||
									activeCurrency?.currency ||
									selectedCurrency.currency
									// } ${Number(convertedPrice).toFixed(2)}`}
								}${!!currency ? 'T' : ''} ${Number(
									totalPrice
								).toFixed(2)}`}
								bgColor="blue"
								style={{width: '100%'}}
								icon={<RightArrow />}
							/>
						}
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
