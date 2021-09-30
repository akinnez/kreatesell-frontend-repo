import { useState, useEffect } from "react";
import { Layout, PricingCard, Select, Button } from "../components";
import styles from "../public/css/Pricing.module.scss";
import { Faq } from "../utils";
import Image from "next/image";

const Pricing = () => {
	const [activeBtn, setActiveBtn] = useState({
		annually: true,
		monthly: false,
	});
	const { annually, monthly } = activeBtn;

	const [businessPrice, setBusinessPrice] = useState("4,999");
	const [priceLabel, setPriceLabel] = useState("Billed Monthly");
	const [subPriceType, setSubPriceType] = useState("NGN 9989");

	useEffect(() => {
		monthly ? setBusinessPrice("4,999") : setBusinessPrice("4,167");
		monthly
			? setPriceLabel("Billed Monthly")
			: setPriceLabel("Billed Annually");
		monthly ? setSubPriceType("") : setSubPriceType("NGN 9989");
	}, [monthly]);

	const countryOptions = [
		{ value: "Nigeria", label: "NGN" },
		{ value: "USA", label: "USD" },
		{ value: "Spain", label: "GBP" },
		{ value: "Spain", label: "KES" },
		{ value: "Spain", label: "ZAR" },
		{ value: "Spain", label: "TZX" },
		{ value: "Spain", label: "UGX" },
	];

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
										setActiveBtn({ annually: true, monthly: false })
									}
									className={`${styles.btn1} ${annually && styles.activeBtn}`}
								>
									Annually - Save 17%
								</button>
								<button
									onClick={() =>
										setActiveBtn({ annually: false, monthly: true })
									}
									className={`${styles.btn2} ${monthly && styles.activeBtn}`}
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
									// onChange={(e) => setSelect(e.target.value)}
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
								/>
							</div>

							<div className={`${styles.free}`}>
								<PricingCard
									title="business"
									subTitle="The combination of core tools, custom options, and automated events for professional course creators looking for the growing of their businesses."
									price={businessPrice}
									btnText="Start for free"
									priceType={priceLabel}
									subPriceType={subPriceType}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.midSection}>
					<h3>Want to Reach out?</h3>
					<p>
						Email us at{" "}
						<a
							rel="noopener noreferrer"
							target="blank"
							href="mailto:info@KreateSell.com"
						>
							info@KreateSell.com
						</a>{" "}
						if your questions or concerns <br /> are not answered here.
					</p>
					<div className={styles.buttonCont}>
						<Button className={styles.btn} text="Contact Now" />
					</div>
				</div>

				<div className={styles.faqContainer}>
					<div className={styles.faqHeader}>
						<h3 className={styles.title}>
							Frequently <br /> Asked <br /> Questions
						</h3>
						<h3 className={styles.mobileFaqTitle}>
							Frequently Asked <br />
							Questions
						</h3>
						<div className={styles.faqImage}>
							<Image src={Faq} width={332} height={234} />
						</div>
					</div>

					<div className={styles.contentWrapper}>
						<div className={styles.content}>
							<h5 className={styles.question}>
								How long will the free offer remain free?
							</h5>
							<div className={styles.answer}>
								<p>
									The free offer is forever, for unlimited users, as long as you
									do not request for extra integrations.
								</p>
							</div>
						</div>

						<div className={styles.content}>
							<h5 className={styles.question}>
								What does the subscription include?
							</h5>
							<div className={styles.answer}>
								<p>
									You get access to our automation panel, self customized store,
									email integration, top notch security, round-the-clock
									supervision and a control center to manage your KreateSell
									store. Your KreateSell store is upgraded upon request to
									benefit from new features at your convenience.
								</p>
								<br />
								<p>
									You get access to our support by email or live chat in
									application. Our support teams are available from Monday to
									Friday, 24/5, in English.
								</p>
							</div>
						</div>

						<div className={styles.content}>
							<h5 className={styles.question}>
								How long does it take for funds to be deposited into my account?
							</h5>
							<div className={styles.answer}>
								<p>
									Funds are basically deposited into your local account within
									48hours or two business days.
								</p>
							</div>
						</div>
						<div className={styles.content}>
							<h5 className={styles.question}>
								Am I Safe to make payment for a membership plan?
							</h5>
							<div className={styles.answer}>
								<p>
									Yes, you're safe to make payment for anything. Our platform is
									safe for anybody.
								</p>
								<br />
								<p>
									Affiliate commissions are paid instantly into your KreateSell
									wallet. The total commission will be available for withdrawal
									into your local account after 48 hours. If, during the payout
									period before a commission is paid out, the originating
									purchase is refunded back to the buyer, revoked, or gets
									removed in any way, we reserve the right to reverse the
									affiliate commission on that same purchase.
								</p>
							</div>
						</div>

						<div className={styles.content}>
							<h5 className={styles.question}>
								How can I make money as a Creator?
							</h5>
							<div className={styles.answer}>
								<p>
									It's very simple I say. All you just need to do is compile the
									knowledge you have into an ebook, audio course, online course,
									video course, membership etc., upload on KreateSell and start
									making easy money into your local bank account.
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
