import { useState } from "react";
import {
	InputButton,
	Layout,
	Button,
	Modal,
	Input,
	FormError,
} from "../components";
import styles from "../public/css/Home.module.scss";
import {
	RightArrow,
	LandingPageHero,
	AirBnBLogo,
	MicrosoftLogo,
	AddProduct,
	CreateStore,
	Publish,
	AutomationIcon,
	LeftSpiral,
	RightSpiral,
	PayoutMethod,
	InstantPayout,
	PrimaryNews,
	SecondaryNews,
	PrimaryNewsFooterImg,
	videoThumbnail,
	ElipseImage,
	MobileElipse,
	PlayIcon,
	isAnEmpytyObject,
} from "../utils";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { SubscribeEmailSchema } from "../validation";
import { useFormik } from "formik";
import { GuestSubscription } from "../redux/actions";
import { useSelector } from "react-redux";

export default function Home() {
	const router = useRouter();

	const [modalVisible, setVisible] = useState(false);
	const [email, setEmail] = useState("");

	const settings = {
		dots: true,
		infinite: true,
		speed: 3000,
		slidesToShow: 3,
		slidesToScroll: 1,
		adaptiveHeight: true,
		autoplay: true,
		arrows: false,
		pauseOnHover: false,
		responsive: [
			{
				breakpoint: 780,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Layout subFooter={false} defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.body}>
					<div className={styles.header}>
						<h1>
							Kreate. Upload. And Sell <br /> your{" "}
							<span className={styles.digital}>Digital Product</span> <br />
							Online under Minutes. For Free
						</h1>
						<p className={styles.subHeader}>
							Upload your Ebooks, Online Courses, Video Courses, Subscription
							plans, <br /> and Memberships in an online all-in-one platform for
							free and accept payment from anywhere in the world.
						</p>
						<p className={styles.mobileSubHeader}>
							Upload your Ebooks, Online Courses, Video Courses, Subscription
							plans, and Memberships in an online all-in-one platform for free
							and accept payment from anywhere in the world.
						</p>

						<div className={styles.inputContainer}>
							<InputButton
								name="email"
								placeholder="Enter your email..."
								buttonText="Get Started Free"
								buttonIcon={<RightArrow />}
								onChange={(e) => setEmail(e.target.value)}
								onSubmit={(e) => {
									e.preventDefault();
									router.push({
										pathname: "/signup",
										query: { email },
									});
								}}
							/>
						</div>

						<div className={styles.benefits}>
							<span className={styles.benefitSpan}>Signup for free</span>
							<span className={styles.benefitSpan}>• Easy setup</span>
							<span className={styles.benefitSpan}>• Fast payout</span>
						</div>
					</div>

					<div
						className={styles.heroImage}
						onClick={() => setVisible(!modalVisible)}
					>
						<Image src={LandingPageHero} alt="kreatesell hero" />
					</div>

					<div className={styles.featured}>
						<h5 className={styles.title}>As featured in</h5>
						<div className={styles.featuredImages}>
							<div className={styles.imageStyle}>
								<Image src={AirBnBLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={MicrosoftLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={AirBnBLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={MicrosoftLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={AirBnBLogo} />
							</div>
							<div className={styles.imageStyle}>
								<Image src={MicrosoftLogo} />
							</div>
						</div>

						<div className={styles.mobileFeaturedImages}>
							<div className={styles.firstRow}>
								<div
									className={`${styles.mobileFeaturedStyle} ${styles.firstChild}`}
								>
									<Image src={AirBnBLogo} />
								</div>
								<div className={styles.mobileFeaturedStyle}>
									<Image src={AirBnBLogo} />
								</div>
								<div className={styles.mobileFeaturedStyle}>
									<Image src={AirBnBLogo} />
								</div>
								<div className={styles.mobileFeaturedStyle}>
									<Image src={AirBnBLogo} />
								</div>
							</div>

							<div className={styles.secondRow}>
								<div
									className={`${styles.mobileFeaturedStyle} ${styles.firstChild}`}
								>
									<Image src={AirBnBLogo} />
								</div>
								<div className={styles.mobileFeaturedStyle}>
									<Image src={AirBnBLogo} />
								</div>
								<div className={styles.mobileFeaturedStyle}>
									<Image src={AirBnBLogo} />
								</div>
								<div className={styles.mobileFeaturedStyle}>
									<Image src={AirBnBLogo} />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.howItWorks}>
					<div className={styles.howItWorkstitleCont}>
						<h3 className={styles.howItWorksTitle}>How it works</h3>
						<p className={styles.howItWorksSubTitle}>
							Amazing all-in-one tools that bring a winning customer experience
						</p>
					</div>

					<div className={styles.howItWorksImgCont}>
						<div className={styles.howItWorksImgSingle}>
							<Image src={CreateStore} width="194" height="150" />
							<h5 className={styles.howItWorksImgTitle}>Kreate your Store</h5>
							<p className={styles.howItWorksImgSubTitle}>
								Kreate an account to get started.
							</p>
						</div>

						<div className={styles.howItWorksImgSingle}>
							<Image src={AddProduct} width="194" height="150" />
							<h5 className={styles.howItWorksImgTitle}>Add Product</h5>
							<p className={styles.howItWorksImgSubTitle}>
								Add products and setup your store.
							</p>
						</div>

						<div className={styles.howItWorksImgSingle}>
							<Image src={Publish} width="194" height="150" />
							<h5 className={styles.howItWorksImgTitle}>Publish</h5>
							<p className={styles.howItWorksImgSubTitle}>
								Now publish to make your store live!
							</p>
						</div>
					</div>

					<div className={styles.howItWorksBtnCont}>
						<Button
							text="More details"
							bgColor="blue"
							className={styles.howItWorksBtn}
							onClick={() => router.push("/how-it-works")}
						/>
					</div>
				</div>

				<div className={styles.featuresSection}>
					<div className={styles.subHero}>
						<h3>More than an ecommerce platfrom</h3>
						<p>
							Amazing all-in-one tools that bring a winning customer experience
						</p>
					</div>

					<div className={styles.automation}>
						<div className={styles.image}>
							<Image src={AutomationIcon} height="420" width="417" />
						</div>
						<div className={styles.automationText}>
							<h3 className={styles.automationTitle}>
								Enjoy Free, Beautiful, <br /> Unlimited Templates
							</h3>
							<h3 className={styles.mobileAutomationTitle}>
								Enjoy Free, Beautiful, Unlimited Templates
							</h3>
							<p className={styles.automationSubTitle}>
								With the free templates, you can kreate a stunning <br />{" "}
								individual product look from the varieties of pre-set <br />{" "}
								templates. Make your product looks and layout <br /> stand out
								and appealing. Design your store to be <br /> device-friendly
								and attractive.
							</p>
							<p className={styles.mobileAutomationSubTitle}>
								With the free templates, you can kreate a stunning individual
								product look from the varieties of pre-set templates. Make your
								product looks and layout stand out and appealing. Design your
								store to be device-friendly and attractive.
							</p>

							<div className={styles.linkText}>
								Learn more{" "}
								<span>
									<RightArrow color="#0072ef" />
								</span>
							</div>
						</div>
					</div>

					<div className={styles.spiral}>
						<Image src={RightSpiral} height="150" width="500" />
					</div>

					<div className={`${styles.automation} ${styles.automationAlte}`}>
						<div className={styles.automationText}>
							<h3 className={styles.automationTitle}>
								Foreign payments <br /> barriers solved
							</h3>
							<h3 className={styles.mobileAutomationTitle}>
								Foreign payments barriers solved
							</h3>
							<div className={styles.automationSubTitle}>
								<p>1. Set Local Payment</p>
								<p>2. Payment made in buyers' local currency</p>
								<p>
									3. Get your payment instantly in your local bank <br />{" "}
									hassle-free.
								</p>
							</div>
							<div className={styles.mobileAutomationSubTitle}>
								<p>1. Set Local Payment</p>
								<p>2. Payment made in buyers' local currency</p>
								<p>
									3. Get your payment instantly in your local bank hassle-free.
								</p>
							</div>

							<div className={styles.linkText}>
								Learn more{" "}
								<span>
									<RightArrow color="#0072ef" />
								</span>
							</div>
						</div>
						<div className={styles.image}>
							<Image src={PayoutMethod} height="513" width="635" />
						</div>
					</div>

					<div className={styles.spiral}>
						<Image
							src={LeftSpiral}
							height="150"
							width="500"
							className={styles.img}
						/>
					</div>

					<div className={styles.automation}>
						<div className={styles.image}>
							<Image src={InstantPayout} height="420" width="417" />
						</div>
						<div className={styles.automationText}>
							<h3 className={styles.automationTitle}>Automation</h3>
							<h3 className={styles.mobileAutomationTitle}>Automation</h3>
							<p className={styles.automationSubTitle}>
								All the sales processes are being handled for you <br /> so you
								can focus on your most important work.
							</p>
							<p className={styles.mobileAutomationSubTitle}>
								All the sales processes are being handled for you so you can
								focus on your most important work.
							</p>

							<div className={styles.linkText}>
								Learn more{" "}
								<span>
									<RightArrow color="#0072ef" />
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.midSection}>
					<div className={styles.midSectionText}>
						<div className={styles.midSectionTitle}>
							Easier, faster, and safer <br /> way to sell your Digital <br />
							Content Online
						</div>
						<div className={styles.midSectionMobileTitle}>
							Easier, faster, and safer way to sell your Digital Content Online
						</div>

						<p className={styles.midSectionSubTitle}>
							Kreate an account for free and sell your digital <br /> products
							online from home or anywhere.
						</p>
						<p className={styles.midSectionMobileSubTitle}>
							Kreate an account for free and sell your digital products online
							from home or anywhere.
						</p>
						<div className={styles.midSectionInputBtn}>
							<Button
								text="Get Started Free"
								icon={<RightArrow color="#0072ef" />}
								className={styles.btn}
							/>
						</div>
					</div>
					<div className={styles.midSectionImage}>
						<Image src={ElipseImage} />
					</div>
					<div className={styles.mobileMidSectionImage}>
						<Image src={MobileElipse} />
					</div>
				</div>

				<div className={styles.newsAndEvents}>
					<div className={styles.newsAndEventsHeader}>
						<h3 className={styles.newsAndEventTitle}>
							News, events and insights for you
						</h3>
						<div className={styles.newsAndEventSubTitle}>
							<p>See more</p>
							<span className="pb-1">
								<RightArrow color="#0072EF" />
							</span>
						</div>
					</div>

					<div className={styles.newsAndEventsCardCont}>
						<div className={styles.firstRow}>
							<div className={styles.primaryNews}>
								<div className={styles.primaryNewsImage}>
									<Image src={PrimaryNews} width="352" />
								</div>
								<div className={styles.primaryNewsCont}>
									<div className={styles.primaryTitle}>
										Google I / O 2020 <br /> news update
									</div>
									<div className={styles.primaryContent}>
										Out of concern for the health and safety of our developers,
										employees, and local communities — and in line with recent
										...
									</div>

									<div className={styles.primaryFooterCont}>
										<div className={styles.primaryFooterImage}>
											<Image src={PrimaryNewsFooterImg} />
										</div>
										<div className={styles.primaryFooterPosition}>
											<div className={styles.primaryName}>Sundar pichai</div>
											<div className={styles.primaryPosition}>
												CEO at Salvo Agency
											</div>
										</div>
									</div>
								</div>
							</div>
							<NewsCard />
						</div>

						<div className={styles.secondRow}>
							<NewsCard />
							<NewsCard />
							<NewsCard />
						</div>

						<div className={styles.mobileNews}>
							<div className={styles.primaryNews}>
								<div className={styles.primaryNewsImage}>
									<Image src={PrimaryNews} width="352" />
								</div>
								<div className={styles.primaryNewsCont}>
									<div className={styles.primaryTitle}>
										Google I / O 2020 <br /> news update
									</div>
									<div className={styles.primaryContent}>
										Out of concern for the health and safety of our developers,
										employees, and local communities — and in line with recent
										...
									</div>

									<div className={styles.primaryFooterCont}>
										<div className={styles.primaryFooterImage}>
											<Image src={PrimaryNewsFooterImg} width="32" />
										</div>
										<div className={styles.primaryFooterPosition}>
											<div className={styles.primaryName}>Sundar pichai</div>
											<div className={styles.primaryPosition}>
												CEO at Salvo Agency
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={styles.mobileSecondaryNews}>
								<div className={styles.firstChild}>
									<NewsCard />
								</div>
								<NewsCard />
							</div>
							<div className={styles.mobileSecondaryNews}>
								<div className={styles.firstChild}>
									<NewsCard />
								</div>
								<NewsCard />
							</div>
							<div className={styles.newsAndEventSeeMore}>
								<p>See more</p>
								<RightArrow color="#0072EF" />
							</div>
						</div>
					</div>
				</div>

				<div className={styles.testimonial}>
					<div className={styles.testimonialContainer}>
						<div className={styles.testimonialCont}>
							<h3 className={styles.testimonialTitle}>
								Don’t be told, Trying is believing
							</h3>
							<p className={styles.testimonialSubTitle}>
								See what amazing people are saying about the uniqueness and
								effectiveness <br /> of KreateSell.
							</p>

							<div className={styles.videoContainer}>
								<TestimonialVideoCard />
								<TestimonialVideoCard />
								<TestimonialVideoCard />
							</div>

							<div className={styles.mobileVideoContainer}>
								<Slider {...settings}>
									<div className={styles.cardSetting}>
										<MobileTestimonialVideoCard />
									</div>
									<div className={styles.cardSetting}>
										<MobileTestimonialVideoCard />
									</div>
									<div className={styles.cardSetting}>
										<MobileTestimonialVideoCard />
									</div>
									<div className={styles.cardSetting}>
										<MobileTestimonialVideoCard />
									</div>
									<div className={styles.cardSetting}>
										<MobileTestimonialVideoCard />
									</div>
								</Slider>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.subFooter}>
					<h3 className={styles.subFooterTitle}>
						<span>Hiya</span>, Are you ready to start making <br /> money from
						Selling your contents?
					</h3>
					<h3 className={styles.subMobileFooterTitle}>
						<span>Hiya</span>, Are you ready to start making money from Selling
						your contents?
					</h3>
					<div className={styles.footerInput}>
						<InputButton
							name="email"
							placeholder="Enter your email..."
							buttonText="Get Started Free"
							buttonIcon={<RightArrow />}
							onChange={(e) => setEmail(e.target.value)}
							onSubmit={(e) => {
								e.preventDefault();
								router.push({
									pathname: "/signup",
									query: { email },
								});
							}}
						/>
					</div>
					<div className={styles.benefits}>
						<span>Signup for free</span>
						<span>• Easy setup</span>
						<span>• Fast payout</span>
					</div>
				</div>

				<Modal
					onClose={() => setVisible(!modalVisible)}
					visible={modalVisible}
					cancelPropagation={true}
					containerStyle={styles.modalContainer}
					closeButton={true}
					closeBtnAction={() => setVisible(!modalVisible)}
				>
					<OnboardingModal />
				</Modal>
			</div>
		</Layout>
	);
}

const NewsCard = () => {
	return (
		<div className={styles.newsCard}>
			<div className={styles.newsImage}>
				<Image src={SecondaryNews} width="352" />
			</div>
			<div className={styles.newsTextCont}>
				<div className={styles.newsTitle}>
					Minimal workspace for inspirations
				</div>
				<div className={styles.newsAuthor}>Anthony Masional</div>
			</div>
		</div>
	);
};

const TestimonialVideoCard = () => {
	return (
		<div className={styles.singleVideoContainer}>
			<div className={styles.videoImage}>
				<Image src={videoThumbnail} alt="testimonial video" />
			</div>
			<div className={styles.videoAuthor}>Review by Michelle Hyatt</div>
			<div className={styles.videoExcerpt}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus, sit
				imperdiet risus, venenatis at.
			</div>
		</div>
	);
};

const MobileTestimonialVideoCard = () => {
	return (
		<div className={styles.singleMobileVideoContainer}>
			<div className={styles.mobileVideo}>
				<Image
					src={videoThumbnail}
					alt="testimonial video"
					width="350"
					height="196"
				/>
			</div>
			<div className={styles.mobileAuthor}>Review by Michelle Hyatt</div>
			<div className={styles.mobileExcerpt}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus, sit
				imperdiet risus, venenatis at.
			</div>
		</div>
	);
};

const OnboardingModal = () => {
	const { loading } = useSelector((state) => state.utils);

	const guestSubscription = GuestSubscription();
	const initialValues = {
		customer_email: "",
		customer_name: "",
	};

	const handleSubmit = (data) => {
		guestSubscription(data, () => {
			window.location.href = "https://t.me/kreatesell";
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: SubscribeEmailSchema,
		validateOnChange: false,
	});

	const { errors } = formik;

	return (
		<form
			className={styles.OnboardingModal}
			onSubmit={formik.handleSubmit}
			autoComplete="off"
		>
			<h5 className={styles.modalTitle}>
				Do you want to see the amazing things KreateSell can do for you? Watch
				KreateSell in action
			</h5>

			{!isAnEmpytyObject(errors) && <FormError errors={errors} />}

			<div className={styles.inputCont}>
				<Input
					name="customer_name"
					placeholder="Enter your Name "
					label="Name"
					onChange={formik.handleChange}
				/>
			</div>

			<div className={styles.inputCont}>
				<Input
					name="customer_email"
					placeholder="Enter your Email "
					label="Email"
					onChange={formik.handleChange}
				/>
			</div>

			<p className={styles.context}>
				You'll get helpful resources on how to become and make huge money as a
				creator.
			</p>

			<Button
				leftIcon={<PlayIcon />}
				text="Watch Demo"
				bgColor="blue"
				className={styles.btnCont}
				loading={loading}
			/>
		</form>
	);
};
