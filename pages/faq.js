import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FAQHero, ArrowDown } from "../utils";
import { Layout, Input } from "../components";
import styles from "../public/css/Faq.module.scss";

const FAQ = () => {
	const router = useRouter();
	const [openArrow, setOpenArrow] = useState(false);

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

				<div className={styles.body}>
					<div className={styles.faq}>
						<h3>FAQs</h3>
						<Input
							type="text"
							placeholder="Search by keyword"
							className={styles.input}
						/>

						<div className={styles.groupQuestions}>
							<div className={styles.dropDown}>
								<div
									className={styles.headerArrow}
									onClick={() => setOpenArrow((item) => !item)}
								>
									<div
										className={`${!!openArrow ? styles.open : styles.arrow}`}
									>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<h6 className={styles.title}>For Product Creator</h6>
								</div>

								<div
									className={
										!openArrow ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<p className={styles.questions}>
										What is KreateSell and what do you do?
									</p>
									<p className={styles.questions}>
										Why should I use KreateSell?
									</p>
									<p className={styles.questions}>
										How much does it cost to use KreateSell?
									</p>
									<p className={styles.questions}>
										After Creating my account, what next?
									</p>
									<p className={styles.questions}>
										Can't find what you're looking for?
									</p>
									<p className={styles.questions}>
										How do I make money on KreateSell as a creator?
									</p>
									<p className={styles.questions}>
										How can my customers make payment?
									</p>
									<p className={styles.questions}>
										I'm afraid of piracy, are my products safe with KreateSell?
									</p>
									<p className={styles.questions}>
										How do I notify you in case of any product piracy?
									</p>
									<p className={styles.questions}>
										Can I create and sell products for free?
									</p>
									<p className={styles.questions}>
										What are the products KreateSell accepts
									</p>
								</div>
							</div>

							<div className={styles.dropDown}>
								<div
									className={styles.headerArrow}
									onClick={() => setOpenArrow((item) => !item)}
								>
									<div
										className={`${!!openArrow ? styles.open : styles.arrow}`}
									>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<h6 className={styles.title}>General</h6>
								</div>

								<div
									className={
										!openArrow ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<p className={styles.questions}>
										Can I sign up with my social media account?
									</p>
									<p className={styles.questions}>Is my login details safe?</p>
									<p className={styles.questions}>How secure is KreateSell</p>
								</div>
							</div>

							<div
								className={styles.dropDown}
								onClick={() => setOpenArrow((item) => !item)}
							>
								<div
									className={styles.headerArrow}
									onClick={() => setOpenArrow((item) => !item)}
								>
									<div
										className={`${!!openArrow ? styles.open : styles.arrow}`}
									>
										<Image src={ArrowDown} alt="arrow-down" />
									</div>
									<h6 className={styles.title}>Creator and Affiliate</h6>
								</div>

								<div
									className={
										!openArrow ? `${styles.questionsContainer}` : "hidden"
									}
								>
									<p className={styles.questions}>
										I don't have foreign payment account, can i still receive my
										payment?
									</p>
									<p className={styles.questions}>
										Why should I use KreateSell?
									</p>
									<p className={styles.questions}>
										How much does it cost to use KreateSell?
									</p>
									<p className={styles.questions}>
										After Creating my account, what next?
									</p>
									<p className={styles.questions}>
										Can't find what you're looking for?
									</p>
									<p className={styles.questions}>
										How do I make money on KreateSell as a creator?
									</p>
									<p className={styles.questions}>How do I create a product?</p>
									<p className={styles.questions}>
										How can my customers make payment?
									</p>
									<p className={styles.questions}>
										I'm afraid of piracy, are my products safe with KreateSell?
									</p>
									<p className={styles.questions}>
										How do I notify you in case of any product piracy?
									</p>
									<p className={styles.questions}>
										Can I create and sell products for free?
									</p>
									<p className={styles.questions}>
										What are the products KreateSell accepts
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.faqQuestionsCont}>
						<h1>CREATORS</h1>
						<div className={styles.answerCont}>
							<h5 className={styles.questionHead}>
								What is KreateSell and what do you do?
							</h5>
							<div className={styles.answer}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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
									</a>{" "}
									. Justice will be served right.
								</p>
							</div>
						</div>

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<h1>GENERAL</h1>
						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
							<h5 className={styles.questionHead}>Is my login details safe?</h5>
							<div className={styles.answer}>
								<p>
									Yes, KreateSell provides maximum security measures and
									controls for your login information. All passwords are
									encrypted which means, not visible to anyone.
								</p>
							</div>
						</div>

						<div className={styles.answerCont}>
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

						<h1>CREATORS & AFFILIATES</h1>
						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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
										target="blank"
										className={styles.link}
										onClick={() => router.push("/pricing")}
									>
										pricing page
									</span>
									.
								</p>
							</div>
						</div>

						<div className={styles.answerCont}>
							<h5 className={styles.questionHead}>
								After Creating my account, what next?
							</h5>
							<div className={styles.answer}>
								<p>
									If you have created your account on KreateSell, the next thing
									is to check your email inbox for Account verification email
									from KreateSell, open and verify with the link. After that,
									you're now a bonafide seller on the KreateSell platform. The
									next thing for you is to set up your store details for better
									conversion. Always remember to make your store intriguing and
									compelling to push buyers to buy your products without any
									objection.
								</p>
								<br />
								<p>
									With that being said, you can then navigate to the product
									creation section and create your products. Set an attractive
									and must-buy price. Include all the important information then
									publish your product to go live.
								</p>
								<br />
								<p>
									There are tons of options that can automate things for you and
									make life very easier for you.
								</p>
							</div>
						</div>

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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
									</a>{" "}
									. Justice will be served right.
								</p>
							</div>
						</div>

						<div className={styles.answerCont}>
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

						<div className={styles.answerCont}>
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
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default FAQ;
