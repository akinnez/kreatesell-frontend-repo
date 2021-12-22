import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FAQHero, ArrowDown } from "../utils";
import { Layout, Input } from "../components";
import { BackTop } from "antd";
import { Link } from "react-scroll";
import styles from "../public/css/Faq.module.scss";

const FAQ = () => {
	const router = useRouter();
	const [openArrow, setOpenArrow] = useState({
		kreator: false,
		affiliate: false,
		creator: false,
		buyer: false,
		general: false,
		payment: false,
	});

	const { kreator, affiliate, creator, buyer, general, payment } = openArrow;

	const backToTopStyle = {
		// backgroundColor: "#0072ef",
		// color: "#ffffff",
	};

	return (
		<Layout defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.hero}>
					<div className={styles.heroText}>
						<h3>How can we help you?</h3>
						<p>
							Email us at{" "}
							<a target="blank" href="mailto:hello@kreatesell.com">
								hello@kreatesell.com
							</a>{" "}
							if you don't find an answer here.
						</p>
					</div>
					<div className={styles.heroImage}>
						<Image src={FAQHero} width="366" height="200" />
					</div>
				</div>

				<div className={styles.backToTop}>
					<BackTop style={backToTopStyle} />
				</div>

				<div className={styles.body}>
					<div className={styles.faq}>
						<h3>FAQs</h3>
						<Input
							type="search"
							placeholder="Search by keyword"
							className={styles.input}
						/>

						<div className={styles.groupQuestions}>
							<div className={styles.dropDown}>
								<div
									className={styles.headerArrow}
									onClick={() =>
										setOpenArrow({
											...openArrow,
											kreator: !kreator,
										})
									}
								>
									<div className={`${!!kreator ? styles.open : styles.arrow}`}>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<Link
										to="for-kreator"
										spy={true}
										smooth={true}
										offset={-50}
										duration={500}
									>
										<h6 className={styles.title}>For Kreator</h6>
									</Link>
								</div>

								<div
									className={
										!kreator ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<Link
										to="What-is-KreateSell"
										spy={true}
										smooth={true}
										offset={-200}
										duration={500}
									>
										<p className={styles.questions}>
											What is KreateSell and what does it do?
										</p>
									</Link>
									<Link
										to="Why-should-I-use-KreateSell"
										spy={true}
										smooth={true}
										offset={-400}
										duration={500}
									>
										<p className={styles.questions}>
											Why should I use KreateSell?
										</p>
									</Link>
									<Link
										to="How-much-does-it-cost-to-use-KreateSell"
										spy={true}
										smooth={true}
										offset={-500}
										duration={500}
									>
										<p className={styles.questions}>
											How much does it cost to use KreateSell?
										</p>
									</Link>
									<Link
										to="After-Creating-my-account"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											After Creating my account, what next?
										</p>
									</Link>
									<Link
										to="Cant-find-what-you-re-looking-for"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Can't find what you're looking for?
										</p>
									</Link>

									<Link
										to="How-do-I-make-money-on-KreateSell"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How do I make money on KreateSell as a creator?
										</p>
									</Link>

									<Link
										to="How-can-my-customers-make-payment"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How can my customers make payment?
										</p>
									</Link>

									<Link
										to="afraid-of-piracy"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											I'm afraid of piracy, are my products safe with
											KreateSell?
										</p>
									</Link>

									<Link
										to="notify-in-case-of-any-product-piracy"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How do I notify you in case of any product piracy?
										</p>
									</Link>

									<Link
										to="Can-I-create-and-sell-products"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Can I create and sell products for free?
										</p>
									</Link>

									<Link
										to="What-products-KreateSell-accepts"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											What are the products KreateSell accepts
										</p>
									</Link>
								</div>
							</div>

							<div className={styles.dropDown}>
								<div
									className={styles.headerArrow}
									onClick={() =>
										setOpenArrow({
											...openArrow,
											affiliate: !affiliate,
										})
									}
								>
									<div
										className={`${!!affiliate ? styles.open : styles.arrow}`}
									>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<Link
										to="for-affiliate"
										spy={true}
										smooth={true}
										offset={-50}
										duration={500}
									>
										<h6 className={styles.title}>For Affiliate </h6>
									</Link>
								</div>

								<div
									className={
										!affiliate ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<Link
										to="What-is-the-KreateSell-Affiliate"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											What is the KreateSell Affiliate Program?
										</p>
									</Link>

									<Link
										to="How-to-become-an-affiliate"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How to become an affiliate
										</p>
									</Link>

									<Link
										to="How-to-make-money-as-an-affiliate"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How to make money as an affiliate?
										</p>
									</Link>

									<Link
										to="How-much-revenue-can-I-earn"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How much revenue can I earn as a KreateSell Affiliate?
										</p>
									</Link>

									<Link
										to="can-anyone-join-KreateSell Affiliate"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Can anyone join the KreateSell Affiliate Program?
										</p>
									</Link>

									<Link
										to="can-i-join"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Can I join if I’m participating in another affiliate
											program?
										</p>
									</Link>

									<Link
										to="Can-I-participate-from-any-Country"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Can I participate from any Country?
										</p>
									</Link>

									<Link
										to="When-do-I-get-paid"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>When do I get paid?</p>
									</Link>

									<Link
										to="form-of-payment"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											What form of payment will I receive?
										</p>
									</Link>

									<Link
										to="can-I-track-the-success"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How can I track the success of my promotion?
										</p>
									</Link>

									<Link
										to="Who-should-I-contact"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Who should I contact if I have questions?
										</p>
									</Link>

									<Link
										to="What-sort-of-tools-do-you-provide"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											What sort of tools do you provide to your affiliates?
										</p>
									</Link>

									<Link
										to="How-do-I-link-to-your-site"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How do I link to your site once I'm an affiliate?
										</p>
									</Link>

									<Link
										to="any-cost-to-become-an-affiliate"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Is there any cost to become an affiliate?
										</p>
									</Link>

									<Link
										to="Do-I-need-to-pay-tax"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>Do I need to pay tax?</p>
									</Link>
								</div>
							</div>

							<div className={styles.dropDown}>
								<div
									className={styles.headerArrow}
									onClick={() =>
										setOpenArrow({
											...openArrow,
											creator: !creator,
										})
									}
								>
									<div className={`${!!creator ? styles.open : styles.arrow}`}>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<Link
										to="for-creator-and-affiliate"
										spy={true}
										smooth={true}
										offset={-50}
										duration={500}
									>
										<h6 className={styles.title}>For Creator and Affiliate</h6>
									</Link>
								</div>

								<div
									className={
										!creator ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<Link
										to="foreign-payment-account"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											I don't have foreign payment account, can i still receive
											my payment?
										</p>
									</Link>

									<Link
										to="make-money-as-a-Creator"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How can I make money as a Creator?
										</p>
									</Link>
								</div>
							</div>

							<div className={styles.dropDown}>
								<div
									className={styles.headerArrow}
									onClick={() =>
										setOpenArrow({
											...openArrow,
											buyer: !buyer,
										})
									}
								>
									<div className={`${!!buyer ? styles.open : styles.arrow}`}>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<Link
										to="buyer"
										spy={true}
										smooth={true}
										offset={-50}
										duration={500}
									>
										<h6 className={styles.title}>For Buyer</h6>
									</Link>
								</div>

								<div
									className={!buyer ? `${styles.questionsContainer}` : "hidden"}
								>
									<Link
										to="can-I-get-a-refund"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											If the product bought is not genuine, can I get a refund?
										</p>
									</Link>

									<Link
										to="payment-for-a-membership-plan"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Am I Safe to make payment for a membership plan?
										</p>
									</Link>
								</div>
							</div>

							<div className={styles.dropDown}>
								<div
									className={styles.headerArrow}
									onClick={() =>
										setOpenArrow({
											...openArrow,
											general: !general,
										})
									}
								>
									<div className={`${!!general ? styles.open : styles.arrow}`}>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<Link
										to="general"
										spy={true}
										smooth={true}
										offset={-50}
										duration={500}
									>
										<h6 className={styles.title}>General</h6>
									</Link>
								</div>

								<div
									className={
										!general ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<Link
										to="sign-up-with-social-media-account"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Can I sign up with my social media account?
										</p>
									</Link>

									<Link
										to="Is-my-login-details-safe"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											Is my login details safe?
										</p>
									</Link>

									<Link
										to="How-secure-is-KreateSell"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>How secure is KreateSell</p>
									</Link>
								</div>
							</div>

							<div
								className={styles.dropDown}
								onClick={() =>
									setOpenArrow({
										...openArrow,
										payment: !payment,
									})
								}
							>
								<div
									className={styles.headerArrow}
									onClick={() => setOpenArrow((item) => !item)}
								>
									<div className={`${!!payment ? styles.open : styles.arrow}`}>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<Link
										to="payment"
										spy={true}
										smooth={true}
										offset={-50}
										duration={500}
									>
										<h6 className={styles.title}>For Payment</h6>
									</Link>
								</div>

								<div
									className={
										!payment ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<Link
										to="funds-to-be-deposited-into-my-account"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How long does it take for funds to be deposited into my
											account?
										</p>
									</Link>

									<Link
										to="customer-has-paid"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											How do I know if my customer has paid?
										</p>
									</Link>

									<Link
										to="question-isnt-answered-here"
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p className={styles.questions}>
											What if my question isn't answered here?
										</p>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.faqQuestionsCont}>
						<h1 id="for-kreator">KREATORS</h1>
						<div className={styles.answerCont}>
							<h5 className={styles.questionHead}>
								What is KreateSell and what does it do?
							</h5>
							<div className={styles.answer} id="What-is-KreateSell">
								<p>
									KreateSell is an ease-to-use, cross-border ecommerce platform
									that enables creators, entrepreneurs, and online sellers to
									upload their digital products for fastest and easiest sales
									and conversion without having to learn multiple complex sales
									funnel platforms and instantly get paid from anywhere in the
									world conveniently. See more about{" "}
									<span
										className={styles.link}
										onClick={() => router.push("/how-it-works")}
									>
										how it works
									</span>
								</p>
								<br />
								<p>
									Our mission is to help the content creators all around the
									globe to market their products. Moreso, get their contents to
									the potential prospects who might really be in need of the
									product.
								</p>
								<br />
								<p>
									The best thing in our mission is the ability to solve the
									foreign money collection issue. This isn't a barrier anymore
									because prospects can now pay in the currency that is
									supported in their country and the sellers (creators) can
									receive the money also in their own local currency.
								</p>
							</div>
						</div>
						<div className={styles.answerCont} id="Why-should-I-use-KreateSell">
							<h5 className={styles.questionHead}>
								Why should I use KreateSell?
							</h5>
							<div className={styles.answer}>
								<p>
									KreateSell enables creators to upload their contents and get
									massive sales in local and global markets without having to
									worry about payment barriers. Now that you know what
									KreateSell stands to solve the issue of currency between
									countries. It's now left to you to decide maybe to choose
									KreateSell or Not.
								</p>
							</div>
						</div>
						<div
							className={styles.answerCont}
							id="How-much-does-it-cost-to-use-KreateSell"
						>
							<h5 className={styles.questionHead}>
								How much does it cost to use KreateSell?
							</h5>
							<div className={styles.answer}>
								<p>
									KreateSell basic account is totally free to set up. If you
									need some other premium services and integrations that
									automate tasks for you then you have to upgrade to a premium
									account. Read more about that on the{" "}
									<span
										className={styles.link}
										onClick={() => router.push("/how-it-works")}
									>
										pricing page
									</span>
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="After-Creating-my-account">
							<h5 className={styles.questionHead}>
								After Creating my account, what next?
							</h5>
							<div className={styles.answer}>
								<p>
									If you have created your account on KreateSell, the next thing
									is to check your email inbox for Account verification email
									from KreateSell, open and verify with the link.
								</p>
								<br />
								<p>
									After that, you're now a bonafide seller on the KreateSell
									platform. The next thing for you is to set up your store
									details for better conversion. Always remember to make your
									store intriguing and compelling to push buyers to buy your
									products without any objection.
								</p>
								<br />
								<p>
									With that being said, you can then navigate to the product
									creation section and create your products. Set an attractive
									and must-buy price. Include all the important information then
									publish your product to go live. There are tons of options
									that can automate things for you and make life very easier for
									you.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="Cant-find-what-you-re-looking-for"
						>
							<h5 className={styles.questionHead}>
								Can't find what you're looking for?
							</h5>
							<div className={styles.answer}>
								<p>
									If you can't find an answer to the question you are having or
									you have any complaint to log to the support. That shouldn't
									be. We're sorry you are facing this. Kindly send your
									complaint or question to{" "}
									<a
										target="blank"
										href="mailto:support@kreatesell.com"
										className={styles.link}
									>
										support@kreatesell.com
									</a>{" "}
									for a quick response.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="How-do-I-make-money-on-KreateSell"
						>
							<h5 className={styles.questionHead}>
								How do I make money on KreateSell as a creator?
							</h5>
							<div className={styles.answer}>
								<p>
									To make money is very easy, all you just need to do is create
									a product. Setup Store. upload. then update your payment
									details and start making easy money into your account
									anywhere. anytime.
								</p>
							</div>
						</div>

						<div className={styles.answerCont}>
							<h5 className={styles.questionHead}>
								How do I create a product?
							</h5>
							<div className={styles.answer}>
								<p>Video guide on this coming soon.</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="How-can-my-customers-make-payment"
						>
							<h5 className={styles.questionHead}>
								How can my customers make payment?
							</h5>
							<div className={styles.answer}>
								<p>
									They can make payment in any of the currencies available in
									their country or anyone they prefer. They can make payment
									through flutterwave options or credit card.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="afraid-of-piracy">
							<h5 className={styles.questionHead}>
								I'm afraid of piracy, are my products safe with KreateSell?
							</h5>
							<div className={styles.answer}>
								<p>
									Your products are safe on our platform, You don't need to be
									scared of plagiarism because we don't give room to such on
									this platform.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="notify-in-case-of-any-product-piracy"
						>
							<h5 className={styles.questionHead}>
								How do I notify you in case of any product piracy?
							</h5>
							<div className={styles.answer}>
								<p>
									If you see anything wrong or someone pirated your products.
									We're here to serve you right. just send the proof of
									ownership of the product and the duplicate product details to
									our support for review.{" "}
									<a
										target="blank"
										href="mailto:copyright@kreatesell.com"
										className={styles.link}
									>
										copyright@kreatesell.com
									</a>
									. Justice will be served right.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="Can-I-create-and-sell-products"
						>
							<h5 className={styles.questionHead}>
								Can I create and sell products for free?
							</h5>
							<div className={styles.answer}>
								<p>
									Yes! You can create and sell your product for free without any
									charges placed on it.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="What-products-KreateSell-accepts"
						>
							<h5 className={styles.questionHead}>
								What are the products KreateSell accepts
							</h5>
							<div className={styles.answer}>
								<p>
									We accept ebooks, video courses, audio courses, webinar,
									Seminar, Coaching programme, Membership content on our
									platform.
								</p>
							</div>
						</div>

						<h1 id="for-affiliate">AFFILIATE </h1>
						<div
							className={styles.answerCont}
							id="What-is-the-KreateSell-Affiliate"
						>
							<h5 className={styles.questionHead}>
								What is the KreateSell Affiliate Program?
							</h5>
							<div className={styles.answer}>
								<p>
									Our affiliate marketing is a simple and cost-effective
									promotional system where you can post referral links of
									creators' products on social media or your personal websites
									to reach a massive market and bring in more sales, also earn
									commision per sales made from the visitors you send us through
									your affiliate link.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="How-to-become-an-affiliate">
							<h5 className={styles.questionHead}>
								How to become an affiliate
							</h5>
							<div className={styles.answer}>
								<p>
									To become an affiliate on this platform. Register account on
									this platform. Confirm the account. Login into the account and
									simply fill out the application form. You will be asked to
									read and agree to our terms and conditions before your
									application can be submitted. We will review your application
									and if accepted, you will receive an e-mail notification with
									your login information. Click on the affiliate button and
									start promoting. Yeah! you're now an affiliate promoter.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="How-to-make-money-as-an-affiliate"
						>
							<h5 className={styles.questionHead}>
								How to make money as an affiliate?
							</h5>
							<div className={styles.answer}>
								<p>
									To make money as an affiliate on this platform, You have to go
									to the marketplace, browse through the available products,
									select the products you like to promote and request permission
									from the course creator. Once approved, start promoting on any
									channel you love to use. Add your payment option and start
									getting paid for the sales you make.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="How-much-revenue-can-I-earn">
							<h5 className={styles.questionHead}>
								How much revenue can I earn as a KreateSell Affiliate?
							</h5>
							<div className={styles.answer}>
								<p>
									Your commissions will be a base of the fee preset or alloted
									by the product owner. So, you will earn the specified
									percentage on the total purchase made by a buyer directly on
									kreateSell.com who came to us through your affiliate link.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="can-anyone-join-KreateSell Affiliate"
						>
							<h5 className={styles.questionHead}>
								Can anyone join the KreateSell Affiliate Program?
							</h5>
							<div className={styles.answer}>
								<p>
									Not everyone will be eligible to become an affiliate. Before
									applying, please ensure your qualifications meet our minimum
									requirements by reading our Terms & Conditions document.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="can-i-join">
							<h5 className={styles.questionHead}>
								Can I join if I’m participating in another affiliate program?
							</h5>
							<div className={styles.answer}>
								<p>
									There is no restriction attached when participating in our
									affiliate program. You are 100% free to continue to
									participate with other affiliate programs.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="Can-I-participate-from-any-Country"
						>
							<h5 className={styles.questionHead}>
								Can I participate from any Country?
							</h5>
							<div className={styles.answer}>
								<p>
									KreateSell Affiliate Program is a worldwide program open to
									all affiliates who meet our acceptance requirements and have
									payment gateway to accept your commissions.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="When-do-I-get-paid">
							<h5 className={styles.questionHead}>When do I get paid?</h5>
							<div className={styles.answer}>
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

						<div className={styles.answerCont} id="form-of-payment">
							<h5 className={styles.questionHead}>
								What form of payment will I receive?
							</h5>
							<div className={styles.answer}>
								<p>
									All affiliate commissions are paid via local bank details
									supplied and it requires a certain threshold to withdraw.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="can-I-track-the-success">
							<h5 className={styles.questionHead}>
								How can I track the success of my promotion?
							</h5>
							<div className={styles.answer}>
								<p>
									You can track the success of your promotion through the
									user-friendly Affiliate dashboard which you land on after a
									successful login action.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="Who-should-I-contact">
							<h5 className={styles.questionHead}>
								Who should I contact if I have questions?
							</h5>
							<div className={styles.answer}>
								<p>
									Please send your concerns or questions to Our Support on email
									through{" "}
									<a
										target="blank"
										href="mailto:support@kreateSell.com"
										className={styles.link}
									>
										support@kreateSell.com
									</a>
									.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="What-sort-of-tools-do-you-provide"
						>
							<h5 className={styles.questionHead}>
								What sort of tools do you provide to your affiliates?
							</h5>
							<div className={styles.answer}>
								<p>
									We provide affiliate promoters with text links, guides &
									suggestions on how to best sell our services.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="How-do-I-link-to-your-site">
							<h5 className={styles.questionHead}>
								How do I link to your site once I'm an affiliate?
							</h5>
							<div className={styles.answer}>
								<p>
									After you have signed up, verified and accepted the platform,
									you'll be able to sign-in and see how to link to us. It's very
									simple.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="any-cost-to-become-an-affiliate"
						>
							<h5 className={styles.questionHead}>
								Is there any cost to become an affiliate?
							</h5>
							<div className={styles.answer}>
								<p>No, it's absolutely free to sign-up and promote.</p>
							</div>
						</div>

						<div className={styles.answerCont} id="Do-I-need-to-pay-tax">
							<h5 className={styles.questionHead}>Do I need to pay tax?</h5>
							<div className={styles.answer}>
								<p>
									You'll need to reach out to your accountant if you don’t know
									if and how to announce the earnings you receive from
									KreateSell either as an entity or as an organization.
									KreateSell doesn't outline any kind of tax related guidelines,
									conference or services.
								</p>
							</div>
						</div>

						<h1 id="for-creator-and-affiliate">KREATORS & AFFILIATES</h1>
						<div className={styles.answerCont} id="foreign-payment-account">
							<h5 className={styles.questionHead}>
								I don't have foreign payment account, can i still receive my
								payment?
							</h5>
							<div className={styles.answer}>
								<p>
									Yes, You can receive your payment in local currency as long as
									you are using our platform to sell your products.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="make-money-as-a-Creator">
							<h5 className={styles.questionHead}>
								How can I make money as a Creator?
							</h5>
							<div className={styles.answer}>
								<p>
									It's very simple I say. All you just need to do is compile the
									knowledge you have into an ebook, video course, membership
									etc., upload on KreateSell and start making easy money into
									your local bank account.
								</p>
							</div>
						</div>

						<h1 id="buyer">BUYER</h1>
						<div className={styles.answerCont} id="can-I-get-a-refund">
							<h5 className={styles.questionHead}>
								If the product bought is not genuine, can I get a refund?
							</h5>
							<div className={styles.answer}>
								<p>
									We are not building a platform that allows discrimination and
									scam. We are building a free and fair platform for both
									buyers, sellers and affiliates. Please kindly forward the
									product link and all the details of the payment attached with
									the confirmation of your payment (receipt) to our support:{" "}
									<a
										target="blank"
										href="mailto:payment@KreateSell.com"
										className={styles.link}
									>
										Payment@KreateSell.com
									</a>{" "}
									<strong>before 24 hours</strong>.
								</p>
							</div>
						</div>

						<div
							className={styles.answerCont}
							id="payment-for-a-membership-plan"
						>
							<h5 className={styles.questionHead}>
								Am I Safe to make payment for a membership plan?
							</h5>
							<div className={styles.answer}>
								<p>
									Yes, you're safe to make payment for anything. Our platform is
									safe for anybody.
								</p>
							</div>
						</div>

						<h1 id="general">GENERAL</h1>
						<div
							className={styles.answerCont}
							id="sign-up-with-social-media-account"
						>
							<h5 className={styles.questionHead}>
								Can I sign up with my social media account?
							</h5>
							<div className={styles.answer}>
								<p>
									Yes, You can sign up on KreateSell with your social media
									account. Just ensure to select it on the signup page and
									proceed.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="Is-my-login-details-safe">
							<h5 className={styles.questionHead}>Is my login details safe?</h5>
							<div className={styles.answer}>
								<p>
									Yes, KreateSell provides maximum security measures and
									controls for your login information. All passwords are
									encrypted which means, not visible to anyone.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="How-secure-is-KreateSell">
							<h5 className={styles.questionHead}>How secure is KreateSell</h5>
							<div className={styles.answer}>
								<p>
									Our platform is secure. We take all necessary measures to
									ensure that information is secured as possible by maintaining
									physical, electronic, and procedural security to prevent
									unauthorized access of confidential credentials. We don't take
									your credit card details on our platform. All the payments are
									made and secured on verified and popularly accepted
									Flutterwave.
								</p>
							</div>
						</div>

						<h1 id="payment">PAYMENT</h1>
						<div
							className={styles.answerCont}
							id="funds-to-be-deposited-into-my-account"
						>
							<h5 className={styles.questionHead}>
								How long does it take for funds to be deposited into my account?
							</h5>
							<div className={styles.answer}>
								<p>
									Funds are basically deposited into your local account within
									48hours or two business days.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="customer-has-paid">
							<h5 className={styles.questionHead}>
								How do I know if my customer has paid?
							</h5>
							<div className={styles.answer}>
								<p>
									KreateSell gives you notification for every transaction
									related to your account via email. The KreateSell Account
									Manager also updates you with an easy-to-read summation of all
									transactions and their status. Furthermore, you can view a
									payment history for each of your customers on your KreateSell
									dashboard.
								</p>
							</div>
						</div>

						<div className={styles.answerCont} id="question-isnt-answered-here">
							<h5 className={styles.questionHead}>
								What if my question isn't answered here?
							</h5>
							<div className={styles.answer}>
								<p>
									If you went through all the frequently ask questions and your
									concern or question is not answered then you simply need to
									reach out to us on{" "}
									<a
										target="blank"
										href="mailto:info@kreatsell.com"
										className={styles.link}
									>
										info@kreatsell.com
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default FAQ;
