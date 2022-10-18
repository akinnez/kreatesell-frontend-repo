import {useState, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';
import {Layout, PricingCard, Select, Button} from '../components';
import styles from '../public/css/Pricing.module.scss';
import {Faq, Animate} from '../utils';
import Image from 'next/image';

import {useGetUpgradePlansPrices} from 'services/swrQueryHooks/UpgradePlansQuery';
import useCurrency from 'hooks/useCurrency';
import useConvertRates from 'hooks/useConvertRates';
import useFetchUtilities from 'hooks/useFetchUtilities';
import Spinner from 'components/Spinner';

const Pricing = () => {
	const router = useRouter();
	const {data: upgradePlanPrices, error: upgradePlanErrors} =
		useGetUpgradePlansPrices();
	const {countriesCurrency, loading, filteredCentral, filterdWest} =
		useCurrency();
	const {store} = useSelector((state) => state.store);
	const {convertedCurrency} = useSelector((state) => state.currencyConverter);

	// console.log
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
	const handleBtnClick = (plan) => {
		// redirect to signup page, while passing a value to history state
		// sign up user and login immediately and then go to payment page
		setSelectedPlan(plan);

		router.push(
			{
				pathname: '/signup',
				query: {
					fromPricing: true,
				},
			},
			'/signup'
		);
		// return;
	};

	const [activeBtn, setActiveBtn] = useState({
		annually: true,
		monthly: false,
	});
	const {annually, monthly} = activeBtn;
	const [businessPrice, setBusinessPrice] = useState(
		getUpgradePrice('monthly')
	);
	const [priceLabel, setPriceLabel] = useState('Billed Monthly');
	const [subPriceType, setSubPriceType] = useState();

	const [selectedPlan, setSelectedPlan] = useState('');
	const [countryOptions, setCountryOptions] = useState([]);
	const [subscriptionMode, setSubscriptionMode] = useState(null);
	const [selectedCurrency, setSelectedCurrency] = useState({});

	const {handleCurrencyConversion, getCurrency} = useConvertRates(
		'NGN',
		selectedCurrency?.currency
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
			setBusinessPrice(getUpgradePrice('monthly'));
		}
	}, [upgradePlanPrices]);

	useEffect(() => {
		monthly
			? setBusinessPrice(getUpgradePrice('monthly'))
			: setBusinessPrice(getUpgradePrice('annually'));
		monthly
			? setPriceLabel('Billed Monthly')
			: setPriceLabel('Billed Annually');
		monthly
			? setSubPriceType('')
			: setSubPriceType(
					`${
						getUpgradePrice('monthly') * 12 -
						getUpgradePrice('annually') * 12
					}`
			  );
	}, [monthly]);

	useEffect(() => {
		if (upgradePlanPrices) {
			setBusinessPrice(getUpgradePrice());
		}
	}, [upgradePlanPrices]);

	// useEffect to default to a currency
	useEffect(() => {
		if (countryOptions.length > 0) {
			setSelectedCurrency(countryOptions[0]);
		}
	}, [countryOptions.length]);

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
		handleCurrencyConversion(selectedCurrency?.currency);
	}, [selectedCurrency]);

	// change
	useMemo(() => {
		if (countriesCurrency?.length > 0) {
			const cur = [
				// { value: 161, label: 'XOF' },
				// { value: 162, label: 'XAF' },
			];
			let currency = countriesCurrency
				.filter((ctr) => !['XAF', 'XOF'].includes(ctr.currency))
				.map((ctr) => ({
					...ctr,
					value: ctr.name,
					label: ctr.currency,
				}));
			setCountryOptions([...currency, ...cur]);
		}
	}, [countriesCurrency?.length]);

	useFetchUtilities();

	if ((!upgradePlanErrors && !upgradePlanPrices) || !selectedCurrency)
		return (
			<>
				<Spinner />{' '}
			</>
		);

	return (
		<Layout defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.body}>
					<div className={styles.header}>
						<h2>Cost-friendly and Transparent Pricing</h2>
						<p>No hidden fees that may give you surprises.</p>
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
									onChange={(e) => setSelectedCurrency(e)}
								/>
							</div>
						</div>
					</div>

					<div className={styles.priceCards}>
						<div className={styles.pricingCont}>
							<div className={styles.free}>
								<PricingCard
									title="basic"
									price="0"
									btnText="Start for free"
									subTitle="All of the features you need to start selling your contents"
									priceType="100% Free "
									btnOnClick={() => {
										router.push('/login');
										handleBtnClick('basic');
									}}
									currentPlan={selectedPlan === 'basic'}
								/>
							</div>

							<div className={`${styles.free}`}>
								<PricingCard
									title="business"
									subTitle="Get the combination of core tools, custom options, and automated events for professional digital product Kreators looking to massively grow their businesses."
									price={
										Object.keys(convertedCurrency).length >
										0
											? businessPrice *
											  convertedCurrency?.buy_rate
											: businessPrice
									}
									btnText="Select this plan"
									priceType={priceLabel}
									subPriceType={
										Object.keys(convertedCurrency).length >
										0
											? subPriceType *
											  convertedCurrency?.buy_rate
											: subPriceType
									}
									btnOnClick={() =>
										handleBtnClick('business')
									}
									currentPlan={selectedPlan === 'business'}
									selectedCurrency={selectedCurrency}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.midSection}>
					<h3>Want to Reach out?</h3>
					<p>
						Email us at{' '}
						<a
							rel="noopener noreferrer"
							target="blank"
							href="mailto:info@KreateSell.com"
						>
							info@KreateSell.com
						</a>{' '}
						if your questions or concerns <br /> are not answered
						here.
					</p>
					<div className={styles.buttonCont}>
						<Button className={styles.btn} text="Contact Now" />
					</div>
				</div>

				<div className={styles.faqContainer}>
					<div
						className={styles.faqHeader}
						// {...Animate("zoom-in-right", 500, "ease-in")}
					>
						<h3 className={styles.title}>
							Frequently <br /> Asked <br /> Questions
						</h3>
						<h3 className={styles.mobileFaqTitle}>
							Frequently Asked <br />
							Questions
						</h3>
						<div className={styles.faqImage}>
							<Image
								src={Faq}
								width={332}
								height={234}
								alt="faq"
							/>
						</div>
					</div>

					<div className={styles.contentWrapper}>
						<div className={styles.content}>
							<h5
								className={styles.question}
								// {...Animate("zoom-in", 500, "ease-in")}
							>
								How long will the basic plan remain free?
							</h5>
							<div
								className={styles.answer}
								// {...Animate("fade-up", 600, "ease")}
							>
								<p>
									The basic plan is free for as long as you
									remain on the plan. Although, upgrading to
									the paid business plan gives you access to
									more advanced features.
								</p>
							</div>
						</div>

						<div className={styles.content}>
							<h5
								className={styles.question}
								{...Animate('zoom-in', 700, 'ease-in')}
							>
								What does the business plan include?
							</h5>
							<div
								className={styles.answer}
								// {...Animate("fade-up", 800, "ease")}
							>
								<p>
									When you subscribe to the business plan, in
									addition to the features on the basic plan,
									you get:
								</p>
								<ol>
									<li>
										access to beautiful templates that can
										assure you of high conversion of your
										page visitors into buyers
									</li>
									<li>
										build an attractive sales page that
										holds your visitors’ attention and
										converts them to buyers using the drag
										and drop sales page builder
									</li>
									<li>
										access to three follow up emails sent on
										your behalf to buyers who did not
										complete the buying process integration
										of full email service provider
									</li>
									<li>
										integration of webinar platform accept
										instalmental payment create membership
										courses with recurring payment
									</li>
									<li>integrate Zapier</li>
									<li>
										access to use PayPal and Stripe as a
										verified Kreator
									</li>
									<li>
										allow Webinar replays online streaming
									</li>
									<li>
										You can activate pop up prompts to sell
										to visitors on your sales page
									</li>
									<li>
										access to social proof to help your
										visitors make the buying decision
										immediately
									</li>
									<li>use a personalised domain</li>
									<li>
										set pre-order in anticipation of the
										launch of your digital product set
										discount coupon for product offers
									</li>
									<li>
										remove default watermark on templates
										and customise the watermark
									</li>
									<li>access up to 15Gb storage space</li>
									<li>
										access advanced reports on your account
										activities
									</li>
								</ol>
								<p>
									You also get access to top notch security,
									round-the-clock supervision and a control
									center to manage your KreateSell store.
									<br />
									You get access to our support by email or
									live chat on the platform. Our support teams
									are available from Monday to Friday, 24/5,
									in English. Your KreateSell store is
									upgraded upon request to benefit from these
									new features at your convenience.
								</p>
							</div>
						</div>

						<div className={styles.content}>
							<h5
								className={styles.question}
								// {...Animate("zoom-in", 500, "ease-in")}
							>
								How long does it take for funds to be deposited
								into my account?
							</h5>
							<div
								className={styles.answer}
								// {...Animate("fade-up", 600, "ease")}
							>
								<p>
									Settlements are made between 24 hours to 10
									days, depending on your currency and
									country.
								</p>
							</div>
						</div>
						<div className={styles.content}>
							<h5
								className={styles.question}
								// {...Animate("zoom-in", 500, "ease-in")}
							>
								How can I make money as a Kreator?
							</h5>
							<div
								className={styles.answer}
								// {...Animate("zoom-in", 600, "ease-in")}
							>
								<p>
									It&#39;s very simple I say. All you just
									need to do is compile the knowledge you have
									into an ebook, audio course, online course,
									video course, membership etc., upload on
									KreateSell and start making easy money into
									your local bank account.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Pricing;
