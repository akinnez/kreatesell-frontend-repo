import {useState, useEffect, useMemo} from 'react';
import Image from 'next/image';
import Logo from 'components/authlayout/logo';
import {
	ActiveTick,
	ArrowLeft,
	CheckoutPlaceholder,
	RightArrow,
	Crypto,
	Paypal,
	Stripe,
	CloudDownload,
	isAnEmpytyObject,
	showToast,
	CheckIconGreen,
} from 'utils';
import styles from '../public/css/checkout.module.scss';
import {Input, Button} from 'components';
import {DialogOverlay, DialogContent} from '@reach/dialog';
import {ConsumerSalesCheckoutSchema} from 'validation';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {usePaystackPayment} from 'react-paystack';
import {useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import {SendPaymentCheckoutDetails} from 'redux/actions';
import crypto from 'crypto';
import LogoImg from '../public/images/logo.svg';
import useFetchUtilities from 'hooks/useFetchUtilities';
import useCurrency from 'hooks/useCurrency';
import Loader from 'components/loader';

const Checkout = () => {
	const [modal, setModal] = useState(false);
	const [activeCard, setActiveCard] = useState('NGN');
	const {countriesCurrency, filterdWest, filteredCentral, loading} =
		useCurrency();

	//Payment methods for GBP and USD are ["Card","Stripe","Paypal","Crypto"]
	const [paymentMethod, setPaymentMethod] = useState('Card');
	const [email, setEmail] = useState('');
	const randomId = `kreate-sell-${crypto.randomBytes(16).toString('hex')}`;

	const {checkoutDetails} = useSelector((state) => state.checkout);

	// const countriesCurrency = useMemo(()=> countries?.filter(country=> country.currency_id !== null), [countries])

	// const filterdWest = useMemo(()=> {
	//   const cn = ['Benin Republic', 'Burkina Faso', 'Togo', 'Ghana', 'Mali', 'Senegal', 'Ivory Coast']
	//   return countries.filter(c => cn.includes(c.name))
	// }, [countries])

	// const filteredCentral = useMemo(()=> {
	//   const cn = ['Chad', 'Cameroon', 'Gabon']
	//   return countries.filter(c => cn.includes(c.name))
	// }, [countries])

	const checkout = checkoutDetails?.check_out_details?.filter(
		(item) => item?.currency_name === activeCard
	);

	const currency_name = checkout?.[0]?.currency_name;
	const price = checkout?.[0]?.price;

	const router = useRouter();
	const sendPaymentCheckoutDetails = SendPaymentCheckoutDetails();
	const openModal = () => setModal(true);
	const closeModal = () => setModal(false);

	// const paymentStatusList = {
	//   success: "s",
	//   failed: "f",
	//   // abandoned: "a"
	// };

	// const onPaystackSuccess = (reference) => {
	//   const status = paymentStatusList[reference?.status];

	//   openModal();
	//   sendPaymentCheckoutDetails(
	//     paymentDetails({ reference: reference?.reference, status })
	//   );
	// };

	// const onClose = () => {};

	const handleSubmit = () => {
		/** Currencies using PayStack are listed here */
		if (['GHS', 'NGN'].includes(activeCard)) {
			return initializePayment(onPaystackSuccess, onClose);
		}

		/** Currencies using FlutterWave are listed here. When other payment options for USD and GBP are implemented, remember to consider it here also */
		if (['KES', 'ZAR', 'UGX', 'GBP', 'USD'].includes(activeCard)) {
			handleFlutterPayment({
				callback: async (response) => {
					await sendPaymentCheckoutDetails(
						paymentDetails({
							reference: response?.tx_ref,
							status: response?.status,
						})
					);
					closePaymentModal();
					openModal();
				},
				onClose: () => {},
			});
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

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ConsumerSalesCheckoutSchema,
		validateOnChange: false,
	});

	const {errors, setFieldValue, values} = formik;

	// const paymentDetails = ({ reference = "", status = "" }) => {
	//   const statusValue = paymentStatusList[status];
	//   const value = {
	//     fullname: `${values?.lastName} ${values?.firstName}`,
	//     datetime: new Date().toISOString(),
	//     email_address: values?.email,
	//     mobile_number: values?.phoneNo,
	//     reference_id: reference,
	//     total: price,
	//     status: statusValue,
	//     card_type: "xxxx",
	//     last_four: "",
	//     currency: currency_name,
	//     purchase_details: [
	//       {
	//         product_id: checkoutDetails?.product_details?.id,
	//         quantity: 1,
	//         amount: price,
	//       },
	//     ],
	//   };
	//   return value;
	// };

	// const payStackConfig = {
	//   reference: randomId,
	//   email,
	//   amount: price * 100,
	//   publicKey:
	//     activeCard === "GHS"
	//       ? process.env.NEXT_PUBLIC_PAYSTACK_GHANA_PUBLIC_KEY
	//       : process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
	//   firstName: values.firstName,
	//   lastname: values.lastName,
	//   phone: values.phoneNo,
	//   currency: activeCard,
	//   channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
	// };

	// const initializePayment = usePaystackPayment(payStackConfig);

	// const flutterConfig = {
	//   public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
	//   tx_ref: randomId,
	//   amount: price,
	//   currency: activeCard,
	//   // payment_options: "card,mobilemoney,ussd", //mobile_money_ghana
	//   payment_options:
	//     activeCard === "GHS" ? "mobile_money_ghana" : "card,mobilemoney,ussd",
	//   customer: {
	//     email: values?.email,
	//     phonenumber: values?.phoneNo,
	//     name: `${values?.lastName} ${values?.firstName}`,
	//   },
	//   type: activeCard === "GBP" ? "debit_uk_account" : "",
	//   customizations: {
	//     title: checkoutDetails?.product_details?.product_name,
	//     description: checkoutDetails?.product_details?.product_description,
	//     logo: "https://res.cloudinary.com/salvoagency/image/upload/v1636216109/kreatesell/mailimages/KreateLogo_sirrou.png",
	//   },
	// };

	// const handleFlutterPayment = useFlutterwave(flutterConfig);

	// useEffect(() => {
	//   setFieldValue("currency", activeCard);
	// }, [activeCard]);

	// useEffect(() => {
	//   setEmail(values.email);
	// }, [values]);

	// useEffect(() => {
	//   if (isAnEmpytyObject(checkoutDetails)) {
	//     showToast("No item in cart, kindly add item to purchase", "info");
	//     // return router.push("/");
	//   }
	// }, []);

	// useEffect(() => {
	//   if (!currency_name || !price)
	//     showToast(
	//       "Values doesn't exist for selected option, select another currency ",
	//       "info"
	//     );
	// }, [currency_name, price]);

	useFetchUtilities();

	if (loading) return <Loader />;

	return (
		<>
			<nav
				className={
					styles.nav +
					' white relative flex py-8 px-10 flex shadow items-center text-center'
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
							/>

							<Input
								name="lastName"
								placeholder="Enter your Name"
								label="Last Name"
								height="small"
								onChange={formik.handleChange}
								errorMessage={errors.lastName}
							/>

							<Input
								name="email"
								placeholder="Enter your Email"
								label="Email Address"
								height="small"
								onChange={formik.handleChange}
								errorMessage={errors.email}
							/>

							<Input
								name="phoneNo"
								placeholder="Enter your Phone number "
								label="Phone number"
								height="small"
								inputMode="numeric"
								onChange={formik.handleChange}
								errorMessage={errors.phoneNo}
							/>
						</form>
					</div>

					<div
						className={`bg-white shadow rounded-lg w-full md:w-3/5 p-4 lg:p-8`}
					>
						<form
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
										(country, index) => (
											<div
												key={index}
												className={
													activeCard ===
													country.currency
														? styles.activeCard
														: styles.card
												}
												onClick={() =>
													setActiveCard(
														country.currency
													)
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
														src={country.flag}
														alt="flag"
														layout="fill"
													/>
												</div>
												<div className="">
													{country.currency}
												</div>
												{activeCard ===
													country.currency && (
													<div className="pl-1 pt-1">
														<Image
															src={ActiveTick}
															alt="active"
															width="20"
															height="20"
														/>
													</div>
												)}
											</div>
										)
									)}
								</div>
							</div>
							<div className="py-7">
								<h2>West African CFA Franc BCEAO</h2>
								<div className="grid gap-4 grid-cols-4 ">
									{filterdWest.map((country, index) => (
										<div
											key={index}
											className={
												activeCard === country.currency
													? styles.activeCard
													: styles.card
											}
											onClick={() =>
												setActiveCard(country.currency)
											}
										>
											<div
												className={
													styles.checFlag + ' mr-2'
												}
												style={{borderRadius: '50%'}}
											>
												<Image
													src={country.flag}
													alt="flag"
													layout="fill"
												/>
											</div>
											<div className="">
												{country.name}
											</div>
											{activeCard ===
												country.currency && (
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
									))}
								</div>
							</div>

							<div className="py-7">
								<h2>Central African CFA Franc BEAC</h2>
								<div className="grid gap-4 grid-cols-4 ">
									{filteredCentral.map((country, index) => (
										<div
											key={index}
											className={
												activeCard === country.currency
													? styles.activeCard
													: styles.card
											}
											onClick={() =>
												setActiveCard(country.currency)
											}
										>
											<div
												className={
													styles.checFlag + ' mr-2'
												}
												style={{borderRadius: '50%'}}
											>
												<Image
													src={country.flag}
													alt="flag"
													layout="fill"
												/>
											</div>
											<div className="">
												{country.name}
											</div>
											{activeCard ===
												country.currency && (
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
									))}
								</div>
							</div>

							<div className="divider"></div>

							{/**This is reserved for Premium users who have activated tier 2 payment options. Uncomment the code block below to and implement the functionality */}
							{['GBP', 'USD'].includes(activeCard) && (
								<div className="pb-6">
									<div className="text-black-100">
										Payment Method
									</div>
									<p className="text-base-gray-200">
										Select your preferred payment method
									</p>

									<div className="grid gap-4 grid-cols-3">
										<div
											className={
												paymentMethod === 'Stripe'
													? styles.activePayment
													: styles.card
											}
											onClick={() =>
												setPaymentMethod('Stripe')
											}
										>
											<Image
												src={Stripe}
												alt="pay with stripe"
											/>
											{paymentMethod === 'Stripe' && (
												<Image
													src={CheckIconGreen}
													alt=""
												/>
											)}
										</div>

										<div
											className={
												paymentMethod === 'Paypal'
													? styles.activePayment
													: styles.card
											}
											onClick={() =>
												setPaymentMethod('Paypal')
											}
										>
											<Image
												src={Paypal}
												alt="pay with stripe"
											/>
											{paymentMethod === 'Paypal' && (
												<Image
													src={CheckIconGreen}
													alt=""
												/>
											)}
										</div>

										<div
											className={
												paymentMethod === 'Crypto'
													? styles.activePayment
													: styles.card
											}
											onClick={() =>
												setPaymentMethod('Crypto')
											}
										>
											<Image
												src={Crypto}
												alt="pay with stripe"
											/>
											{paymentMethod === 'Crypto' && (
												<Image
													src={CheckIconGreen}
													alt=""
												/>
											)}
										</div>
									</div>
								</div>
							)}

							{/**Apply coupon feature is yet to be implemented */}

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

							<div
								className={`p-6 w-full lg:w-5/6 mx-auto shadow rounded-md bg-white flex flex-col ${styles.boxShadow}`}
							>
								<div className="flex justify-between">
									<p>SubTotal</p>
									<div className="flex gap-4">
										{checkoutDetails?.product_details
											?.is_strike_original_price && (
											<s className="text-base-gray-200">
												{currency_name} 10000
											</s>
										)}
										<p>
											{/* {currency_name} {price ?? checkoutDetails?.default_price} */}
											NGN 890
										</p>
									</div>
								</div>

								{checkoutDetails?.product_details
									?.coupon_settings && (
									<div className="flex justify-between">
										<p>Coupon</p>
										<p>NGN 200</p>
									</div>
								)}

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
										{currency_name}{' '}
										{new Intl.NumberFormat().format(
											price ??
												checkoutDetails?.default_price
										)}
									</p>
								</div>
							</div>

							<p className="text-base-gray text-center py-6 text-xs md:text-sm">
								Get instant access to this product once your
								payment is successful!
							</p>

							<div className=" w-full lg:w-5/6 mx-auto">
								<Button
									text={`Pay Now`}
									bgColor="blue"
									className={styles.btnCont}
									icon={<RightArrow />}
								/>
							</div>
						</form>
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
