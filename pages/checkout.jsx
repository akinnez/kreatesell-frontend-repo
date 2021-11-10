import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "components/authlayout/logo";
import {
	ActiveTick,
	ArrowLeft,
	CheckoutPlaceholder,
	RightArrow,
	Crypto,
	Paypal,
	Stripe,
	CloudDownload,
} from "utils";
import styles from "../public/css/checkout.module.scss";
import { Input, Button } from "components";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import { ConsumerSalesCheckoutSchema } from "validation";
import { useFormik } from "formik";

const Checkout = () => {
	const [modal, setModal] = useState(true);
	const [activeCard, setActiveCard] = useState("NGN");
	const [paymentMethod, setPaymentMethod] = useState("Stripe");

	const openModal = () => setModal(true);
	const closeModal = () => setModal(false);

	const handleSubmit = () => {};

	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		phoneNo: "",
		currency: "NGN",
		couponCode: "",
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ConsumerSalesCheckoutSchema,
		validateOnChange: false,
	});

	const { errors, setFieldValue } = formik;

	useEffect(() => {
		setFieldValue("currency", activeCard);
	}, [activeCard]);

	return (
		<>
			<nav className="bg-secondary-blue-100 text-center py-1">
				<Logo />
			</nav>

			<div className={`px-4 md:px-6 lg:px-12 pb-12 ${styles.container}`}>
				<div className="flex py-6 items-center">
					<div className="flex">
						<div>
							<Image src={ArrowLeft} alt="go back" />{" "}
						</div>
						<span className="pl-2 font-semibold text-primary-blue">BACK</span>
					</div>

					<div className="mx-auto text-primary-blue font-bold text-lg lg:text-2xl">
						Checkout
					</div>
				</div>

				<div className="flex flex-col md:flex-row gap-6 w-full">
					<div className="bg-secondary-blue-200 rounded-lg w-full md:w-1/2 p-4 lg:p-8">
						<div>
							<Image
								src={CheckoutPlaceholder}
								className="rounded-lg"
								width="600"
							/>
						</div>

						<div className="flex justify-between items-center pt-4">
							<h3 className="text-primary-blue font-semibold text-lg">
								Man’s Search For Meaning
							</h3>
							<h3 className="text-base-green-100 font-semibold text-lg">
								NGN 5,000
							</h3>
						</div>

						<h6 className="text-black-100">by Viktor Franklyn</h6>

						<div className="pt-4">
							<p className="text-base-gray-200 ">
								This book is about dolor sit amet, consectetur adipiscing elit.
								Egestas duis diam adipiscing aenean. Ultrices tortor eget
								integer volutpat posuere mauris vel com. Faucibus ultrices
								elementum, cursus scelerisque mattis morbi quam.
							</p>
							<p className="text-base-gray-200 ">
								This book is about dolor sit amet, consectetur adipiscing elit.
								Egestas duis diam adipiscing aenean. Ultrices tortor eget
								integer volutpat posuere mauris vel com. Faucibus ultrices
								elementum, cursus scelerisque mattis morbi quam.
							</p>
							<p className="text-base-gray-200 ">
								This book is about dolor sit amet, consectetur adipiscing elit.
								Egestas duis diam adipiscing aenean. Ultrices tortor eget
								integer volutpat posuere mauris vel com. Faucibus ultrices
								elementum, cursus scelerisque mattis morbi quam.
							</p>
						</div>
					</div>

					<div
						className={`bg-white rounded-lg w-full md:w-1/2 p-4 lg:p-8 ${styles.boxShadow}`}
					>
						<form
							onSubmit={formik.handleSubmit}
							autoComplete="off"
							className="w-full"
						>
							<h3 className="text-primary-blue font-semibold text-lg">
								Payment Details
							</h3>

							<div>
								<div className="text-black-100">Personal Info</div>
								<p className="text-base-gray-200">
									Complete your purchase by filling in the following details
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

							<div className="divider"></div>

							<div className="pb-4">
								<div className="text-black-100">Select Currency</div>
								<p className="text-base-gray-200">
									Select your preferred currency and get price equivalent
								</p>

								<div className="grid gap-4 grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
									<div
										className={
											activeCard === "NGN" ? styles.activeCard : styles.card
										}
										onClick={() => setActiveCard("NGN")}
									>
										<div className="">NGN</div>
										{activeCard === "NGN" && (
											<div className="pl-4 pt-1">
												<Image
													src={ActiveTick}
													alt="active"
													width="16"
													height="16"
												/>
											</div>
										)}
									</div>

									<div
										className={
											activeCard === "USD" ? styles.activeCard : styles.card
										}
										onClick={() => setActiveCard("USD")}
									>
										<div>USD</div>
										{activeCard === "USD" && (
											<div className="pl-4 pt-1">
												<Image
													src={ActiveTick}
													alt="active"
													width="16"
													height="16"
												/>
											</div>
										)}
									</div>

									<div
										className={
											activeCard === "GBP" ? styles.activeCard : styles.card
										}
										onClick={() => setActiveCard("GBP")}
									>
										<div>GBP</div>
										{activeCard === "GBP" && (
											<div className="pl-4 pt-1">
												<Image
													src={ActiveTick}
													alt="active"
													width="16"
													height="16"
												/>
											</div>
										)}
									</div>

									<div
										className={
											activeCard === "KES" ? styles.activeCard : styles.card
										}
										onClick={() => setActiveCard("KES")}
									>
										<div>KES</div>
										{activeCard === "KES" && (
											<div className="pl-4 pt-1">
												<Image
													src={ActiveTick}
													alt="active"
													width="16"
													height="16"
												/>
											</div>
										)}
									</div>

									<div
										className={
											activeCard === "ZAR" ? styles.activeCard : styles.card
										}
										onClick={() => setActiveCard("ZAR")}
									>
										<div>ZAR</div>
										{activeCard === "ZAR" && (
											<div className="pl-4 pt-1">
												<Image
													src={ActiveTick}
													alt="active"
													width="16"
													height="16"
												/>
											</div>
										)}
									</div>

									<div
										className={
											activeCard === "GHS" ? styles.activeCard : styles.card
										}
										onClick={() => setActiveCard("GHS")}
									>
										<div>GHS</div>
										{activeCard === "GHS" && (
											<div className="pl-4 pt-1">
												<Image
													src={ActiveTick}
													alt="active"
													width="16"
													height="16"
												/>
											</div>
										)}
									</div>
								</div>
							</div>

							{["GBP", "USD"].includes(activeCard) && (
								<div className="pb-6">
									<div className="text-black-100">Payment Method</div>
									<p className="text-base-gray-200">
										Select your preferred payment method
									</p>

									<div className="grid gap-4 grid-cols-3">
										<div
											className={
												paymentMethod === "Stripe"
													? styles.activePayment
													: styles.card
											}
											onClick={() => setPaymentMethod("Stripe")}
										>
											<Image src={Stripe} alt="pay with stripe" />
										</div>

										<div
											className={
												paymentMethod === "Paypal"
													? styles.activePayment
													: styles.card
											}
											onClick={() => setPaymentMethod("Paypal")}
										>
											<Image src={Paypal} alt="pay with stripe" />
										</div>

										<div
											className={
												paymentMethod === "Crypto"
													? styles.activePayment
													: styles.card
											}
											onClick={() => setPaymentMethod("Crypto")}
										>
											<Image src={Crypto} alt="pay with stripe" />
										</div>
									</div>
								</div>
							)}

							<div className="w-full flex gap-4 items-center">
								<div className="w-3/4 md:w-8/12 lg:w-10/12">
									<Input
										placeholder="Coupon Code"
										name="couponCode"
										onChange={formik.handleChange}
									/>
								</div>
								<div className="w-1/4 md:w-4/12 lg:w-1/6 pb-2">
									<Button text="Apply Coupon" className={styles.couponBtn} />
								</div>
							</div>

							<div className={`p-6 bg-white flex flex-col ${styles.boxShadow}`}>
								<div className="flex justify-between">
									<p>SubTotal</p>
									<div className="flex gap-4">
										<s className="text-base-gray-200">NGN 10000</s>
										<p>NGN 5000</p>
									</div>
								</div>

								<div className="flex justify-between">
									<p>Coupon</p>
									<p>NGN 200</p>
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
									<p className="text-primary-blue font-medium">NGN 4,800</p>
								</div>
							</div>

							<p className="text-base-gray text-center py-6 text-xs md:text-sm">
								Instant Access to This Product After A Successful Purchase is
								Confirmed!
							</p>

							<div className="">
								<Button
									text="Pay NGN 4,800"
									bgColor="blue"
									className={styles.btnCont}
									icon={<RightArrow />}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>

			<DialogOverlay isOpen={modal} onDismiss={closeModal} className="pt-12 ">
				<DialogContent className={styles.modal} aria-label="modal">
					<SuccessfulCheckoutModal />
				</DialogContent>
			</DialogOverlay>
		</>
	);
};

const SuccessfulCheckoutModal = () => {
	return (
		<div className="p-0 md:p-6 lg:p-12 text-center">
			<Image src={ActiveTick} width="45" height="45" />
			<h3 className="text-black-100 font-bold text-lg">
				Thank you for your purchase!
			</h3>
			<p className="text-base-gray-200 text-xs">
				Your purchase was successful and a receipt will be sent to your mail.
			</p>

			<div className="text-left py-4">
				<p className="text-base-gray">Purchase Summary</p>
				<div className="flex justify-between">
					<div className="text-primary-blue font-medium text-base">
						Man’s Search For Meaning
					</div>
					<div className="text-base-green-100 font-medium text-base">
						NGN 5,000
					</div>
				</div>
				<p className="text-xs text-base-gray">by Viktor Franklyn</p>
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
