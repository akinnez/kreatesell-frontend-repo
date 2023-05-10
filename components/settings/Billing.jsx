import {useState, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';

import {Dialog, DialogOverlay, DialogContent} from '@reach/dialog';

import useCurrency from 'hooks/useCurrency';
import useConvertRates from 'hooks/useConvertRates';
import useLocation from 'hooks/useLocation';

import {PricingCard, Button, UpgradeAccountForm, Select} from 'components';

import {PaymentUnsubscribe, SendPaymentCheckoutDetails} from 'redux/actions';
import {useGetUpgradePlansPrices} from 'services/swrQueryHooks/UpgradePlansQuery';

import styles from './Settings.module.scss';
import Spinner from 'components/Spinner';

const Billing = () => {
	const [modal, setModal] = useState(false);
	const Router = useRouter();
	const sendPaymentCheckoutDetails = SendPaymentCheckoutDetails();

	const {store} = useSelector((state) => state.store);
	const {convertedCurrency, loading: currencyConverterLoading} = useSelector(
		(state) => state.currencyConverter
	);
	const {countryDetails, countryDetailsLoading} = useLocation();

	const {
		data: upgradePlanPrices,
		error: upgradePlanErrors,
	} = useGetUpgradePlansPrices();
	const paymentUnsubscribe = PaymentUnsubscribe();
	const {
		countriesCurrency,
		loading,
		filteredCentral,
		filterdWest,
	} = useCurrency();
	// return either monthly or annual upgrade price
	const getUpgradePrice = (type = 'monthly') => {
		if (type === 'monthly') {
			return upgradePlanPrices?.filter(
				(price) => price.configuration_value === 'Business'
			)[0].monthly_value;
		} else {
			return upgradePlanPrices?.filter(
				(price) => price.configuration_value === 'Business'
			)[0].annually_value;
		}
	};
	const [activeBtn, setActiveBtn] = useState({
		annually: true,
		monthly: false,
	});
	const {annually, monthly} = activeBtn;
	const [businessPrice, setBusinessPrice] = useState(
		getUpgradePrice('annually')
	);
	const [priceLabel, setPriceLabel] = useState('Billed Monthly');
	const [subPriceType, setSubPriceType] = useState();

	const [selectedPlan, setSelectedPlan] = useState('');
	const [countryOptions, setCountryOptions] = useState([]);
	const [subscriptionMode, setSubscriptionMode] = useState(null);
	const [selectedCurrency, setSelectedCurrency] = useState('');

	const {handleCurrencyConversion, getCurrency} = useConvertRates(
		// store?.bank_details?.currency_name, //TODO: Adjust this to be dynamic
		'NGN',
		selectedCurrency
	);

	useEffect(() => {
		if (upgradePlanPrices) {
			setSubPriceType(
				getUpgradePrice('monthly') * 12 -
					getUpgradePrice('annually') * 12
			);
		}
	}, [upgradePlanPrices]);

	useEffect(() => {
		if (upgradePlanPrices) {
			setBusinessPrice(getUpgradePrice('annually'));
		}
	}, [upgradePlanPrices]);

	useEffect(() => {
		if (monthly) {
			setBusinessPrice(getUpgradePrice('monthly'));
			setPriceLabel('Billed Monthly');
			setSubPriceType('');
		} else {
			setBusinessPrice(getUpgradePrice('annually'));
			setPriceLabel('Billed Annually');
			setSubPriceType(
				`${
					getUpgradePrice('monthly') * 12 -
					getUpgradePrice('annually') * 12
				}`
			);
		}
	}, [monthly]);

	// useEffect to default to a currency
	useEffect(() => {
		if (countryDetails?.currency) {
			setSelectedCurrency(countryDetails?.currency);
		} else if (countryOptions.length > 0 && !modal) {
			setSelectedCurrency(countryOptions[0]?.currency);
		}
	}, [countryOptions.length, countryDetails?.currency]);

	//   useEffect to calculate price
	useEffect(() => {
		if (annually) {
			setSubscriptionMode({
				mode: 'annually',
				price: getUpgradePrice('annually') * 12,
			});
		} else if (monthly) {
			setSubscriptionMode({
				mode: 'monthly',
				price: getUpgradePrice('monthly'),
			});
		}
	}, [annually, monthly, upgradePlanPrices]);

	// useEffect to check if current plan
	useEffect(() => {
		if (store?.user?.user_plan) {
			setSelectedPlan(store?.user?.user_plan);
		}
	}, [store?.user?.user_plan]);

	// to convert a currency based on when selected currency changes
	useEffect(() => {
		handleCurrencyConversion();
	}, [selectedCurrency]);

	// change
	useMemo(() => {
		if (countriesCurrency?.length > 0) {
			let currency = countriesCurrency
				.filter((ctr) => !['XAF', 'XOF'].includes(ctr.currency))
				.map((ctr) => ({
					...ctr,
					value: ctr.currency,
					label: ctr.currency,
				}));
			setCountryOptions([...currency]);
		}
	}, [countriesCurrency?.length]);

	const {user} = useSelector((state) => state.auth);

	// this is the payment details for abandon transations
	const paymentDetails = (status = 'a') => {
		const value = {
			fullname: user?.full_name,
			email_address: user?.email,
			mobile_number: user?.mobile,
			datetime: new Date().toISOString(),
			// total: convertedPrice,
			total: 0,
			reference_id: '',
			purchase_details: [],
			status: status,
			card_type: '',
			last_four: '',
			currency: selectedCurrency,
			payment_type: 'subscription',
			is_affiliate: user?.is_affiliate,
			affiliate_product_link: '',
			user_identifier: user?.id,
			duration: 'monthly',
			TransactionFee: 0,
		};
		return value;
	};

	const openModal = () => setModal(true);
	const closeModal = () => {
		setModal(false);
		sendPaymentCheckoutDetails(
			paymentDetails(),
			() => {},
			() => {},
			false
		);
	};

	if ((!upgradePlanErrors && !upgradePlanPrices) || !selectedCurrency)
		return (
			<>
				<Spinner />{' '}
			</>
		);

	return (
		<>
			<div>
				<div className="md:text-center pt-4 pb-4">
					<h3 className="text-black-100 font-bold text-xl">
						Upgrade Your Account
					</h3>
					<p className="text-base-gray-200">
						Upgrade your account to a premium account to enjoy more
						benefits.
					</p>
				</div>

				<div className={styles.tabContainer}>
					<div className={styles.tabSelect}>
						<div className={styles.tab}>
							<button
								onClick={() =>
									setActiveBtn({
										annually: true,
										monthly: false,
									})
								}
								className={`${styles.btn1} ${
									annually && styles.activeBtn
								}`}
							>
								Annually - Save 17%
							</button>
							<button
								onClick={() =>
									setActiveBtn({
										annually: false,
										monthly: true,
									})
								}
								className={`${styles.btn2} ${
									monthly && styles.activeBtn
								}`}
							>
								Monthly
							</button>
						</div>
						<div className={styles.select}>
							<Select
								name="country"
								options={countryOptions}
								arrowIconColor="#0072EF"
								borderColor="#40A9FF"
								cb={(e) => setSelectedCurrency(e)}
								defaultValue={
									selectedCurrency ||
									countryOptions?.[0]?.value
								}
								loading={countryDetailsLoading}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-center my-6">
					<div className="md:pr-4">
						<PricingCard
							title="basic"
							price="0"
							btnText=""
							subTitle="All of the features you need to start selling your contents"
							priceType="100% Free"
							currentPlan={selectedPlan === 'Basic'}
							selectedCurrency={selectedCurrency}
						/>
					</div>

					<div className="pt-4 md:pt-0 md:pl-4">
						<PricingCard
							title="business"
							subTitle="The combination of core tools, custom options, and automated events for professional course creators looking for the growing of their businesses."
							price={
								Object.keys(convertedCurrency).length > 0
									? businessPrice *
									  convertedCurrency?.buy_rate
									: businessPrice
							}
							btnText="Select This Plan"
							priceType={priceLabel}
							subPriceType={
								Object.keys(convertedCurrency).length > 0
									? subPriceType * convertedCurrency?.buy_rate
									: subPriceType
							}
							btnOnClick={openModal}
							currentPlan={selectedPlan === 'Business'}
							selectedCurrency={
								convertedCurrency?.to_currency_name ||
								selectedCurrency
							}
							loading={currencyConverterLoading}
						/>
					</div>
				</div>

				{store?.is_plan_auto_renewed && (
					<div className={styles.cancelSubscription}>
						To disable any further automatic autorenewal attempts,
						please click{' '}
						<span
							onClick={() =>
								paymentUnsubscribe(() => Router.reload())
							}
						>
							&nbsp; Cancel Subscription Autorenewal
						</span>
					</div>
				)}

				<DialogOverlay
					isOpen={modal}
					onDismiss={closeModal}
					className="pt-12 "
				>
					<DialogContent className={styles.modal} aria-label="modal">
						<UpgradeAccountForm
							{...{
								subscriptionMode,
								selectedCurrency,
								countriesCurrency,
								loading,
								filteredCentral,
								filterdWest,
								setModal,
								setSelectedPlan,
								convertedCurrency,
								monthly,
							}}
						/>
					</DialogContent>
				</DialogOverlay>
			</div>
		</>
	);
};

export default Billing;
